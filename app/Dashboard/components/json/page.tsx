'use client'

import { useState, useEffect } from 'react';
import { loginUser, registerUser } from './authService';

type User = {
  id: number;
  email: string;
  name: string;
};

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true); // 切换登录/注册
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // 检查本地存储中是否有用户信息
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        // 登录逻辑
        const userData = await loginUser(email, password);
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
      } else {
        // 注册逻辑
        const userData = await registerUser(email, password, name);
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        setIsLogin(true); // 注册成功后自动切换到登录界面
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '发生未知错误');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setEmail('');
    setPassword('');
    setName('');
  };

  if (loading) {
    return <div className="loading loading-spinner loading-lg"></div>;
  }

  if (user) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">欢迎回来, {user.name}!</h1>
        
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">用户信息</h2>
            <p>邮箱: {user.email}</p>
            <p>用户名: {user.name}</p>
            
            <div className="card-actions justify-end">
              <button onClick={handleLogout} className="btn btn-error">
                退出登录
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{isLogin ? '用户登录' : '用户注册'}</h1>

      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <div className="tabs">
            <button
              className={`tab tab-lifted ${isLogin ? 'tab-active' : ''}`}
              onClick={() => setIsLogin(true)}
            >
              登录
            </button>
            <button
              className={`tab tab-lifted ${!isLogin ? 'tab-active' : ''}`}
              onClick={() => setIsLogin(false)}
            >
              注册
            </button>
          </div>

          {error && (
            <div className="alert alert-error">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">邮箱</span>
              </label>
              <input
                type="email"
                placeholder="请输入邮箱"
                className="input input-bordered"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">密码</span>
              </label>
              <input
                type="password"
                placeholder="请输入密码"
                className="input input-bordered"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>

            {!isLogin && (
              <div className="form-control">
                <label className="label">
                  <span className="label-text">用户名</span>
                </label>
                <input
                  type="text"
                  placeholder="请输入用户名"
                  className="input input-bordered"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}

            <button type="submit" className="btn btn-primary w-full">
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
    </div>
  );
};

export default AuthPage;