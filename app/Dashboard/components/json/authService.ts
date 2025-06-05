// authService.ts
export interface User {
  id: number;
  email: string;
  name: string;
  password:string;
  token: string;
}
// 确保 authService.ts 返回的数据格式一致



export const loginUser = async (email: string, password: string, name:string,id:number): Promise<User> => {
  const response = await fetch('/api/proxy/json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      action: 'login',
      id,
     name,
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
  const response = await fetch('/api/proxy/json', {
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