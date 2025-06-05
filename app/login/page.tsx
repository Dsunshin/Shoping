// 'use client'

// import { useState } from 'react'
// import axios from 'axios'

// export default function LoginPage() {
//   const [form, setForm] = useState({ email: '', password: '' })
//   const [error, setError] = useState('')
//   const [loading, setLoading] = useState(false)

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value })
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setError('')
//     setLoading(true)
//     if (!form.email || !form.password) {
//       setError('请输入邮箱和密码')
//       setLoading(false)
//       return
//     }
//     try {
//       const res = await axios.post('/api/proxy/login', form)
//       setLoading(false)
//       // alert('登录成功')
//       window.location.href = '/Dashboard'
//     } catch (err: any) {
//       setLoading(false)
//       if (err.response && err.response.data && err.response.data.error) {
//         setError(err.response.data.error)
//       } else {
//         setError('登录失败，请稍后重试')
//       }
//     }
//   }

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen">
//       <form onSubmit={handleSubmit} className="card bg-base-200 shadow-xl p-8 w-full max-w-sm space-y-4">
//         <h1 className="text-2xl font-bold mb-4">登录</h1>
//         <div className="form-control">
//           <input
//             name="email"
//             type="email"
//             placeholder="邮箱"
//             className="input input-bordered"
//             value={form.email}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-control">
//           <input
//             name="password"
//             type="password"
//             placeholder="密码"
//             className="input input-bordered"
//             value={form.password}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <button type="submit" className={`btn btn-primary ${loading ? 'btn-disabled' : ''}`}>
//           {loading ? '登录中...' : '登录'}
//         </button>
//         {error && <div className="text-error">{error}</div>}
//       </form>
//     </div>
//   )
// }