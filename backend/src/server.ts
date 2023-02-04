import "reflect-metadata";
import "express-async-errors";
import "./database";
import { Routes } from "./shared/http";

import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import AppError from "./app-error";

const app = express();

app.use(cors());

app.use(express.json());
app.use(Routes);

app.use(
  (err: Error, resquest: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal Error Server -${err.stack}`,
    });
  }
);

app.listen(3004, () => {
  console.log("Server Running at port 3004");
});
