// src/app/actions/signup.tsx
import { httpPost } from '@/services/api/http';

interface SignupData {
  name: string;
  email: string;
  password: string;
}

export async function signup(data: SignupData): Promise<any> {

  const API_URL = '/register';

  const user =  await httpPost(API_URL, {
    name: data.name,
    email: data.email,
    password: data.password,
  });

  if(!user){
    return {
        message: 'Ocorreu um erro ao criar o usuário.'
    }
  }

  return {
    message: 'Usuário criado com sucesso.'
  }
}
