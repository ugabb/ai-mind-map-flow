"use client";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { SignUpFormValues } from "../(auth)/sign-up/page";
import { LoginFormValues } from "../(auth)/login/page";

interface AuthContextProps {
  currentUser: User | null;
  login: (data: LoginFormValues) => Promise<void>;
  signUp: (data: SignUpFormValues) => Promise<void>;
  logout: () => void;
  loading: boolean;
  error: string | null;
}

interface User {
  name: string;
  email: string;
  token: string;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("ai.mind.map.token");
    if (token) {
      setCurrentUser({ ...JSON.parse(atob(token.split(".")[1])), token });
    }
  }, []);

  const login = async (data: LoginFormValues) => {
    setLoading(true);
    setError(null);
    try {
      const { status, data: reqData } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/authenticate`,
        data
      );
      if (status === 200) {
        toast.success("Login successful!");
        localStorage.setItem("ai.mind.map.token", reqData.token);
        setCurrentUser({ ...reqData.user, token: reqData.token });
        router.push("/mind-map");
      }
    } catch (err) {
      toast.error("Invalid credentials");
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (data: SignUpFormValues) => {
    setLoading(true);
    setError(null);
    const formData = {
      name: data.name,
      email: data.email,
      password: data.password,
      ...(data.profilePicture && { profilePicture: data.profilePicture }),
    };
    try {
      const { status, data: reqData } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user`,
        formData
      );
      if (status === 201) {
        toast.success("Sign-up successful!");
        localStorage.setItem("ai.mind.map.token", reqData.token);
        setCurrentUser({ ...reqData.user, token: reqData.token });
        router.push("/login");
      }
    } catch (err) {
      toast.error("Sign-up failed");
      setError("Sign-up failed");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("ai.mind.map.token");
    setCurrentUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, login, signUp, logout, loading, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};
