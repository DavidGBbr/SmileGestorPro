"use client";
import { createContext, ReactNode, useEffect, useState } from "react";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import Router from "next/router";
import { api } from "../services/apiClient";
import { toast } from "react-toastify";

interface AuthContextData {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<boolean>;
  signUp: (credentials: SignUpProps) => Promise<boolean>;
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
  const [loading, setLoading] = useState(false);
  const isAuthenticated = !!user;

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { "@clinic.token": token } = parseCookies();

        if (token) {
          const response = await api.get("/me");
          const { id, name, address, email, subscriptions } =
            response.data.user;
          setUser({ id, name, address, email, subscriptions });
        }
      } catch (error) {
        signOut();
      }
    };

    checkUser();
  }, []);

  async function signIn({ email, password }: SignInProps) {
    setLoading(true);

    return new Promise<boolean>(async (resolve, reject) => {
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
        toast.success("Logado com sucesso!");
        window.location.href = "/dashboard";
        resolve(true);
      } catch (error) {
        toast.error("Erro ao acessar!");
        console.log("Erro ao fazer login: ", error);
        reject(false);
      } finally {
        setLoading(false);
      }
    });
  }

  async function signUp({ name, email, password }: SignUpProps) {
    setLoading(true);

    return new Promise<boolean>(async (resolve, reject) => {
      try {
        const response = await api.post("/users", {
          name,
          email,
          password,
        });

        toast.success("Usuário cadastrado!");
        window.location.href = "/login";
        resolve(true);
      } catch (error) {
        toast.error("Erro ao cadastrar!");
        console.error(error);
        reject(false);
      } finally {
        setLoading(false);
      }
    });
  }

  async function logoutUser() {
    try {
      destroyCookie(null, "@clinic.token", { path: "/" });
      window.location.href = "/";
      setUser(null);
    } catch (error) {
      toast.error("Erro ao sair!");
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
