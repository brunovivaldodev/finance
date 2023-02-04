import React, { useContext, useEffect } from "react";
import { Route, Routes, Link, Outlet } from "react-router-dom";
import "./styles.css";
import Modal from "react-modal";
import { FiPlusCircle } from "react-icons/fi";
import { HeaderHome } from "../../components/header-home";
import { Summary } from "../../components/summary";
import { Table } from "../../components/table";
import { BarChart } from "../../components/bar-chart";
import { LineChart } from "../../components/line-chart";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { TransactionContext } from "../../contexts/transactionsContext";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#F0F2F5",
    height: "500px",
  },
};

Modal.setAppElement("#root");

export default function HomeApp() {
  return (
    <Routes>
      <Route path="/home" element={<Home />}>
        <Route index element={<Table />} />
        <Route path="bar-chart" element={<BarChart />} />
        <Route path="line-chart" element={<LineChart />} />
      </Route>
    </Routes>
  );
}

const transactionFormSchema = z.object({
  date: z.string(),
  description: z.string(),
  type: z.enum(["INCOME", "OUTCOME"]),
  value: z.number(),
  category_id: z.string(),
});

type transactionFormInput = z.infer<typeof transactionFormSchema>;

export function Home() {
  const {
    createTransaction,
    categories,
    getTransactionsHandler,
    getCategories,
  } = useContext(TransactionContext);
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const { register, handleSubmit, reset } = useForm<transactionFormInput>({
    resolver: zodResolver(transactionFormSchema),
  });

  async function handleSubmitTransaction(data: transactionFormInput) {
    closeModal();
    reset();
    await createTransaction(data);
  }

  useEffect(() => {
    getTransactionsHandler();
    getCategories();
  }, []);

  return (
    <main>
      <section className="section-header">
        <HeaderHome />
        <Summary />
      </section>

      <section>
        <nav>
          <Link to={""}>Lista</Link>
          <Link to={"bar-chart"}>Gráfico De Barra</Link>
          <Link to={"line-chart"}>Gráfico Poligonal</Link>

          <div>
            <FiPlusCircle onClick={openModal} size={32} color="#49AA26" />
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              style={customStyles}
            >
              <h2 className="form-title">Nova Transação</h2>
              <form
                className="form"
                onSubmit={handleSubmit(handleSubmitTransaction)}
              >
                <label htmlFor="data">Data</label>
                <input
                  className="form-data"
                  type={"date"}
                  {...register("date")}
                />
                <label htmlFor="type">Tipo</label>
                <select className="form-data" id="type" {...register("type")}>
                  <option value="INCOME">Entrada</option>
                  <option value="OUTCOME">Saída</option>
                </select>
                <label htmlFor="category_id">Categoria</label>
                <select className="form-data" {...register("category_id")}>
                  {categories.map((category) => {
                    return (
                      <option value={`${category.id}`}>{category.name}</option>
                    );
                  })}
                </select>
                <label htmlFor="valor">Valor</label>
                <input
                  className="form-data"
                  type={"number"}
                  {...register("value", { valueAsNumber: true })}
                />
                <label htmlFor="descricao">Descrição</label>
                <input
                  className="form-data"
                  type={"text"}
                  {...register("description")}
                />
                <section className="form-submit">
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
        </nav>
      </section>
      <Outlet />
    </main>
  );
}
