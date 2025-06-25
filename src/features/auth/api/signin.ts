import { httpPost } from "@/services/api/http";
import Cookies from "js-cookie";
import { MessageResponse } from "@/services/api/types";

interface SigninData {
  email: string;
  password: string;
}

export async function signin(data: SigninData): Promise<MessageResponse> {
  try {
    const API_URL = "/clients/web/login";

    const response: any = await httpPost(API_URL, {
      email: data.email,
      password: data.password,
    });

    const accessToken = response.access_token;

    if (!accessToken) {
      return {
        message: "Token não encontrado no retorno.",
      };
    }

    Cookies.set("access_token", accessToken, {
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      httpOnly: false,
      expires: 1,
    });

    return {
      message: "Login realizado com sucesso.",
    };
  } catch (error) {
    throw new Error("Falha ao realizar login");
  }
}
