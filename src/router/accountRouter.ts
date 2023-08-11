import express from "express";
import { AccountController } from "../controller/AccountController";

export const accountRouter = express.Router()

const accountCrontoller = new AccountController

accountRouter.get("/", accountCrontoller.getAccounts)
accountRouter.post("/new-account", accountCrontoller.postAccount)
accountRouter.put("/:id/balance", accountCrontoller.editAccount)
accountRouter.get("/:id/balance", accountCrontoller.getBalance)