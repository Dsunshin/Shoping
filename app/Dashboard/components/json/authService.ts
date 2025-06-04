// authService.ts
export interface User {
  id: number;
  email: string;
  name: string;
  token: string;
}

export const loginUser = async (email: string, password: string): Promise<User> => {
  const response = await fetch('/api/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      action: 'login',
      email,
      password,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || '登录失败');
  }

  return response.json();
};

export const registerUser = async (email: string, password: string, name: string): Promise<User> => {
  const response = await fetch('/api/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      action: 'register',
      email,
      password,
      name,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || '注册失败');
  }

  return response.json();
};