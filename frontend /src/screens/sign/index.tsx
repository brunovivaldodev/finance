import React from "react";
import "./styles.css";
import { Header } from "../../components/header";
import { Outlet, Route, Routes } from "react-router-dom";
import { Login } from "../../components/login";
import { SignIn } from "../../components/sign-in";
export function SignInApp() {
  return (
    <Routes>
      <Route path="/" element={<Sign />}>
        <Route index element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="criar-conta" element={<SignIn />} />
      </Route>
    </Routes>
  );
}

export function Sign() {
  return (
    <main>
      <section className="section-header">
        <Header />
      </section>
      <Outlet />
    </main>
  );
}
