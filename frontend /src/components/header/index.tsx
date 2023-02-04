import React from "react";
import { FiDollarSign } from "react-icons/fi";
import "./styles.css";
export function Header() {
  return (
    <header className="sign-in-header">
      <h1>
        Isptec Finance <FiDollarSign color="#49AA26" />
      </h1>
    </header>
  );
}
