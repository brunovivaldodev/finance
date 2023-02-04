import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import "./styles.css";
import { api } from "../../lib/axios";
import * as z from "zod";

const signInFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  confirmPassword: z.string(),
});

type signInFormInput = z.infer<typeof signInFormSchema>;

export function SignIn() {
  const [passwordError, setPasswordError] = useState(false);
  const [userExistsError, setUserExists] = useState(false);

  const { register, handleSubmit, reset } = useForm<signInFormInput>({
    resolver: zodResolver(signInFormSchema),
  });

  async function handleSubmitSignIn(data: signInFormInput) {
    const { email, name, password, confirmPassword } = data;
    setPasswordError(false);
    setUserExists(false);

    if (password !== confirmPassword) {
      setPasswordError(true);
      return;
    }

    const response = await api.post("users", {
      name,
      email,
      password,
    });

    if (response.data.message === "Users already Existis") {
      setUserExists(true);
    }

    reset();
  }

  return (
    <div className="sign-in-wrapper">
      <form
        className="form-sign-in"
        onSubmit={handleSubmit(handleSubmitSignIn)}
      >
        <label className="form-label-email" htmlFor="nome">
          Nome
        </label>
        <input
          className="form-data-sign-in"
          type={"text"}
          required
          {...register("name")}
        />
        <label className="form-data-sign-in" htmlFor="email">
          Email
        </label>
        <input
          className="form-data-sign-in"
          type={"email"}
          required
          {...register("email")}
        />
        <label className="form-label-password" htmlFor="password">
          Password
        </label>
        <input
          className="form-data-sign-in"
          type={"password"}
          required
          {...register("password")}
        />
        <label className="form-label-password" htmlFor="password">
          Confirmar Password
        </label>
        <input
          className="form-data-sign-in"
          type={"password"}
          required
          {...register("confirmPassword")}
        />

        {passwordError && (
          <p className="error-password">
            Por favor, confirma correctamente a sua password
          </p>
        )}

        {userExistsError && <p className="error-password">Usuário Já Existe</p>}
        <section className="form-submit-sign-in">
          <button className="form-submit-button" type="submit">
            Criar Conta
          </button>
          <Link to={"/login"}>Login</Link>
        </section>
      </form>
    </div>
  );
}
