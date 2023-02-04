import React, { useContext, useState } from "react";
import "./styles.css";
import { FiChevronDown, FiDollarSign } from "react-icons/fi";
import Modal from "react-modal";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { TransactionContext } from "../../contexts/transactionsContext";
import { useNavigate } from "react-router-dom";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#F0F2F5",
    height: "300px",
  },
};

Modal.setAppElement("#root");

const categoryFormSchema = z.object({
  name: z.string(),
});

type categoryFormInput = z.infer<typeof categoryFormSchema>;

const Menu = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [categoryError, setCategoryError] = useState(false);

  const navigate = useNavigate();

  const { createCategory } = useContext(TransactionContext);

  const { register, handleSubmit } = useForm<categoryFormInput>({
    resolver: zodResolver(categoryFormSchema),
  });

  async function handleSubmitCategory(data: categoryFormInput) {
    const response = await createCategory(data);

    if (response.data.message === "Category Already Exists") {
      setCategoryError(true);
      return;
    }
  }

  function getName() {
    let user = localStorage.getItem("user");

    if (user) {
      let userToken = JSON.parse(user);
      return userToken.name;
    }
  }

  function logout() {
    localStorage.removeItem("user");

    navigate("/");
  }

  function toggle() {
    setIsOpened((wasOpened) => !wasOpened);
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div className="aside">
      <div className="photo"></div>
      <span className="user-name">{getName()}</span>
      <ul onClick={toggle}>
        <FiChevronDown />
        {isOpened && (
          <span className="span">
            <li onClick={openModal}>Criar Categoria</li>
            <li onClick={logout}>Logout</li>
          </span>
        )}
      </ul>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <h2 className="form-title">Registar Categoria</h2>
        <form className="form" onSubmit={handleSubmit(handleSubmitCategory)}>
          <label htmlFor="data">Nome</label>
          <input className="form-data" type={"text"} {...register("name")} />

          {categoryError && (
            <p className="error-password">Categoria Já Existe</p>
          )}
          <section className="form-submit-category">
            <button className="form-submit-cancel" onClick={closeModal}>
              Cancelar
            </button>
            <button className="form-submit-button" type="submit">
              Salvar
            </button>
          </section>
        </form>
      </Modal>
    </div>
  );
};

export function HeaderHome() {
  return (
    <>
      <header>
        <h1 className="title">
          Isptec Finance <FiDollarSign color="#49AA26" />
        </h1>
      </header>
      <Menu />
    </>
  );
}
