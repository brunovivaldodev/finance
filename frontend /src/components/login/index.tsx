import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../../lib/axios";

import * as z from "zod";

import "./styles.css";

const loginInFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type loginFormInput = z.infer<typeof loginInFormSchema>;
export function Login() {
  const [loginError, setLoginError] = useState(false);

  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm<loginFormInput>({
    resolver: zodResolver(loginInFormSchema),
  });

  async function handleSubmitLogin(data: loginFormInput) {
    const { email, password } = data;
    setLoginError(false);
    const response = await api.post("users/authenticate", {
      email,
      password,
    });

    if (response.data.message === "Email ou Password Inválido") {
      setLoginError(true);
      return;
    }

    localStorage.setItem("user", JSON.stringify(response.data));

    reset();

    navigate("/home");
  }
  return (
    <div className="login-wrapper">
      <form className="form-login" onSubmit={handleSubmit(handleSubmitLogin)}>
        <label className="form-label-email" htmlFor="nome">
          Email
        </label>
        <input
          className="form-data-login"
          type={"text"}
          {...register("email")}
        />
        <label
          className="form-label-password"
          htmlFor="password"
          {...register("password")}
        >
          Password
        </label>
        <input
          className="form-data-login"
          type={"password"}
          {...register("password")}
        />
        {loginError && (
          <p className="error-password">Email ou Password Inválido</p>
        )}
        <section className="form-submit-login">
          <button className="form-submit-button" type="submit">
            Login
          </button>
          <Link to={"/criar-conta"}>Criar Conta</Link>
        </section>
      </form>
    </div>
  );
}
