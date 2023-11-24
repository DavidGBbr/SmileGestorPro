"use client";
import { createContext, ReactNode, useState } from "react";
import { destroyCookie, setCookie } from "nookies";
import Router from "next/router";
import { api } from "../services/apiClient";

interface AuthContextData {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signUp: (credentials: SignUpProps) => Promise<void>;
  logoutUser: () => Promise<void>;
}

interface UserProps {
  id: string;
  name: string;
  email: string;
  address: string;
  subscriptions?: SubscriptionProps | null;
}

interface SubscriptionProps {
  id: string;
  status: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface SignInProps {
  email: string;
  password: string;
}

interface SignUpProps {
  name: string;
  email: string;
  password: string;
}

export const AuthContext = createContext({} as AuthContextData);

export const signOut = () => {
  console.log("Error logout");
  try {
    destroyCookie(null, "@clinic.token", { path: "/" });
    Router.push("/login");
  } catch (error) {
    console.log("Error ao sair");
  }
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>();
  const isAuthenticated = !!user;

  async function signIn({ email, password }: SignInProps) {
    try {
      const response = await api.post("/session", {
        email,
        password,
      });

      const { id, name, address, token, subscriptions } = response.data;

      setCookie(undefined, "@clinic.token", token, {
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });

      setUser({
        id,
        name,
        email,
        address,
        subscriptions,
      });

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      window.location.href = "/dashboard";
    } catch (error) {
      console.log("Erro ao fazer login: ", error);
    }
  }

  async function signUp({ name, email, password }: SignUpProps) {
    try {
      const response = await api.post("/users", {
        name,
        email,
        password,
      });

      window.location.href = "/login";
    } catch (error) {
      console.log(error);
    }
  }

  async function logoutUser() {
    try {
      destroyCookie(null, "@clinic.token", { path: "/" });
      window.location.href = "/";
      setUser(null);
    } catch (error) {
      console.log("Erro ao fazer logout: ", error);
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signIn, signUp, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
