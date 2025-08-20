"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import SignInForm from "./components/sign-in-form";
import SignUpForm from "./components/sign-up-form";
import Header from "@/components/common/header/header";

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div>
  <Header/>
  
    <div className=" h-[calc(100vh-73px)] flex items-center justify-center p-4  bg-[#f5f5f5] relative overflow-hidden">
     
      <div className="w-full max-w-md px-5 -mt-14 relative z-10  ">
      
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white rounded-3xl mb-4 shadow-lg shadow-pink-200/50">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-light text-slate-800 mb-1 tracking-wide">
            {isLogin ? "Bem-Vindo de Volta" : "Junte-se a Nós"}
          </h1>
          <p className="text-slate-500 text-sm font-light">
            {isLogin ? "Tainara moda gringa" : "Crie uma conta"}
          </p>
        </div>

       
        <div className="bg-white/70 backdrop-blur-3xl rounded-3xl space-y-6 border border-slate-200 p-6 shadow-2xl shadow-pink-200/20 ">
          {isLogin ? <SignInForm /> : <SignUpForm />}

          <button className="w-full border border-pink-200/60 text-slate-600 py-3 px-4 rounded-2xl font-light hover:bg-pink-50/50 hover:border-rose-300 transition-all duration-300 flex items-center justify-center gap-3 group shadow-sm text-sm">
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
            </svg>
            <span className="font-light">Continue com Google</span>
          </button>

          
          <div className="mt-6 text-center">
            <span className="text-slate-500 text-sm font-light">
              {isLogin ? "Não tem uma conta?" : "Ja tem uma conta?"}
            </span>
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-rose-600 hover:text-rose-700 text-sm font-medium transition-colors"
              >
              {isLogin ? "Cadastrar" : "Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
              </div>
  );
}
