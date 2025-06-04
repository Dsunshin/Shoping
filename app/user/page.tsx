'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'

interface User {
  id: number
  username: string
  email: string
  createdAt: string
}

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true) // 登录/注册切换
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ 
    username: '', 
    email: '', 
    password: '' 
  })
  const [error, setError] = useState('')

  // 检查本地是否有登录状态
  useEffect(() => {
    const user = localStorage.getItem('currentUser')
    if (user) {
      setCurrentUser(JSON.parse(user))
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register'
      const response = await axios.post(endpoint, form)
      
      // 登录/注册成功处理
      const userData = response.data.user
      setCurrentUser(userData)
      localStorage.setItem('currentUser', JSON.stringify(userData))
      localStorage.setItem('authToken', response.data.token)
      
      // 重置表单
      if (isLogin) {
        setForm({ username: '', email: '', password: '' })
      }
    } catch (err: any) {
      setError(err.response?.data?.message || '操作失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('currentUser')
    localStorage.removeItem('authToken')
    setCurrentUser(null)
    setForm({ username: '', email: '', password: '' })
  }

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto py-8 flex justify-center">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    )
  }

  if (currentUser) {
    return (
      <div className="max-w-2xl mx-auto py-8 space-y-6">
        <h1 className="text-2xl font-bold">欢迎回来, {currentUser.username}!</h1>
        
        <div className="card bg-base-200 shadow-xl p-6">
          <div className="space-y-4">
            <p><span className="font-semibold">用户名:</span> {currentUser.username}</p>
            <p><span className="font-semibold">邮箱:</span> {currentUser.email}</p>
            <p><span className="font-semibold">注册日期:</span> {currentUser.createdAt?.slice(0, 10)}</p>
            
            <button 
              onClick={handleLogout}
              className="btn btn-error w-full"
            >
              退出登录
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto py-8 space-y-6">
      <h1 className="text-2xl font-bold">{isLogin ? '用户登录' : '用户注册'}</h1>
      
      <div className="card bg-base-200 shadow-xl p-6">
        <div className="tabs tabs-boxed mb-6">
          <button
            className={`tab flex-1 ${isLogin ? 'tab-active' : ''}`}
            onClick={() => setIsLogin(true)}
          >
            登录
          </button>
          <button
            className={`tab flex-1 ${!isLogin ? 'tab-active' : ''}`}
            onClick={() => setIsLogin(false)}
          >
            注册
          </button>
        </div>

        {error && (
          <div className="alert alert-error mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="form-control">
              <label className="label">
                <span className="label-text">用户名</span>
              </label>
              <input
                name="username"
                type="text"
                placeholder="请输入用户名"
                className="input input-bordered"
                value={form.username}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="form-control">
            <label className="label">
              <span className="label-text">邮箱</span>
            </label>
            <input
              name="email"
              type="email"
              placeholder="请输入邮箱"
              className="input input-bordered"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">密码</span>
            </label>
            <input
              name="password"
              type="password"
              placeholder="请输入密码"
              className="input input-bordered"
              value={form.password}
              onChange={handleChange}
              required
              minLength={6}
            />
          </div>

          <button type="submit" className="btn btn-primary w-full mt-4">
            {isLogin ? '登录' : '注册'}
          </button>
        </form>

        <div className="text-center mt-4">
          <button
            className="link link-primary"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? '没有账号？立即注册' : '已有账号？立即登录'}
          </button>
        </div>
      </div>
    </div>
  )
}