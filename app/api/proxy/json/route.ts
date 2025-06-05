import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'

// 定义JSON文件的存储路径
const USERS_FILE_PATH = path.join(process.cwd(), 'data/users')

// 用户类型定义
interface User {
  id: number
  email: string
  name: string
  password: string
  token:string
}



// 确保数据目录存在
async function ensureDirectory() {
  const dir = path.dirname(USERS_FILE_PATH)
  try {
    await fs.access(dir)
  } catch {
    await fs.mkdir(dir, { recursive: true })
  }
}

// 读取用户数据
async function readUsers(): Promise<User[]> {
  await ensureDirectory()
  try {
    const data = await fs.readFile(USERS_FILE_PATH, 'utf-8')
    return JSON.parse(data)
  } catch {
    return []
  }
}

// 写入用户数据
async function writeUsers(users: User[]) {
  await fs.writeFile(USERS_FILE_PATH, JSON.stringify(users, null, 2))
}

// 生成JWT令牌
function generateToken(user: User): string {
  const secret = process.env.JWT_SECRET || 'your-secret-key'
  return jwt.sign(
    { id: user.id, email: user.email },
    secret,
    { expiresIn: '1h' }
  )
}

// 用户注册
export const POST = async (request: NextRequest) => {
  try {
    const { action, email, password, name } = await request.json()

    if (!action || (action !== 'login' && action !== 'register')) {
      return NextResponse.json(
        { error: '无效的操作类型' },
        { status: 400 }
      )
    }

    const users = await readUsers()

    if (action === 'login') {
      // 登录逻辑
      if (!email || !password) {
        return NextResponse.json(
          { error: '邮箱和密码不能为空' },
          { status: 400 }
        )
      }

      const user = users.find(u => u.email === email)
      if (!user) {
        return NextResponse.json(
          { error: '用户不存在' },
          { status: 401 }
        )
      }

      const isPasswordValid = await bcrypt.compare(password, user.password)
      if (!isPasswordValid) {
        return NextResponse.json(
          { error: '密码错误' },
          { status: 401 }
        )
      }

      const token = generateToken(user)
      return NextResponse.json({
        user: {
          id: user.id,
          email: user.email,
          name: user.name
        },
        token
      })

    } else if (action === 'register') {
      // 注册逻辑
      if (!email || !password || !name) {
        return NextResponse.json(
          { error: '邮箱、密码和用户名不能为空' },
          { status: 400 }
        )
      }

      if (users.some(u => u.email === email)) {
        return NextResponse.json(
          { error: '邮箱已被注册' },
          { status: 400 }
        )
      }

      const hashedPassword = await bcrypt.hash(password, 10)
      const newUser: User = {
        id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
        email,
        name,
        password: hashedPassword,
        token: ''
      }

      await writeUsers([...users, newUser])
      const token = generateToken(newUser)

      return NextResponse.json({
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name
        },
        token
      })
    }

  } catch (error) {
    console.error('认证错误:', error)
    return NextResponse.json(
      { error: '认证失败' },
      { status: 500 }
    )
  }
}

// 获取用户列表（仅用于开发测试）
export const GET = async () => {
  try {
    const users = await readUsers()
    // 过滤掉密码信息
    const sanitizedUsers = users.map(user => ({
      id: user.id,
      email: user.email,
      name: user.name
    }))
    return NextResponse.json(sanitizedUsers)
  } catch (error) {
    return NextResponse.json(
      { error: '读取用户数据失败' },
      { status: 500 }
    )
  }
}