import express, { Request, Response } from 'express'
import cors from 'cors'
import { AccountDB, UserDB } from './types'
import { User } from './models/User'
import { Account } from './models/Account'
import { UserDatabase } from './database/UserDatabase'
import { AccountDatabase } from './database/AccountDatabase'
import { UserController } from './controller/UserController'
import { AccountController } from './controller/AccountController'
import { userRouter } from './router/userRouter'
import { accountRouter } from './router/accountRouter'

const app = express()

app.use(cors())
app.use(express.json())

app.listen(3003, () => {
    console.log(`Servidor rodando na porta ${3003}`)
})


app.get("/", async (req: Request, res: Response) => {
    try {
        res.status(200).send({ message: "Bem vindo(a) a API desenvolvida para fins educacionais. Pratica de POO e arquitetura de 3 camadas" })
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

app.use("/users", userRouter)
app.use("/accounts", accountRouter)

// const userController = new UserController()
// const accountCrontoller = new AccountController()

// app.get("/users", userController.getUsers)


// app.post("/users", userController.postUser)


// app.get("/accounts", accountCrontoller.getAccounts)


// app.get("/accounts/:id/balance", accountCrontoller.getBalance)


// app.post("/accounts", accountCrontoller.postAccount)


// app.put("/accounts/:id/balance",accountCrontoller.editAccount)
