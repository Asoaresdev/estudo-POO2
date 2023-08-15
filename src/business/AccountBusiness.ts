import { AccountDatabase } from "../database/AccountDatabase"
import { CreateAccountInputDTO, CreateAccountOutputDTO } from "../dtos/createAccountDto"
import { EditAccountInputDTO, EditAccountOutputDTO } from "../dtos/editAccountDto"
import { BadRequestError } from "../errors/BadRequestError"
import { NotFoundError } from "../errors/NotFoundError"
import { Account } from "../models/Account"
import { AccountDB } from "../types"

export class AccountBusiness {
    public getAccounts = async () => {
        const accountDatabase = new AccountDatabase()
        const accountsDB: AccountDB[] = await accountDatabase.findAccounts()

        const accounts = accountsDB.map((accountDB) => new Account(
            accountDB.id,
            accountDB.balance,
            accountDB.owner_id,
            accountDB.created_at
        ))

        const output: any = accounts
        return output

    }

    public getBalance = async (input: any) => {
        const { id } = input

        const accountDatabase = new AccountDatabase()
        const accountDB = await accountDatabase.findAccountById(id)

        if (!accountDB) {
            throw new NotFoundError("'id' não encontrado")
        }

        const account = new Account(
            accountDB.id,
            accountDB.balance,
            accountDB.owner_id,
            accountDB.created_at
        )

        const output = {
            balance: account.getBalance()
        }

        return output
    }

    public createAccount = async (input: CreateAccountInputDTO):Promise<CreateAccountOutputDTO> => {
        const { id, ownerId } = input

        const accountDatabase = new AccountDatabase()
        const accountDBExists = await accountDatabase.findAccountById(id)

        if (accountDBExists) {
            throw new BadRequestError("'id' já existe")
        }

        const newAccount = new Account(
            id,
            0,
            ownerId,
            new Date().toISOString()
        )

        const newAccountDB: AccountDB = {
            id: newAccount.getId(),
            balance: newAccount.getBalance(),
            owner_id: newAccount.getOwnerId(),
            created_at: newAccount.getCreatedAt()
        }

        await accountDatabase.insertAccount(newAccountDB)
        const output: CreateAccountOutputDTO = {
            message: "Conta criada com sucesso",
            account: {
                id: newAccount.getId(),
                balance: newAccount.getBalance(),
                ownerId: newAccount.getOwnerId(),
                createdAt: newAccount.getCreatedAt()
            }
        }
        return output
    }

    public editAcccount = async (input: EditAccountInputDTO): Promise<EditAccountOutputDTO> => {
        const { id, value } = input

        if (typeof value !== "number") {
            throw new BadRequestError("'value' deve ser number")
        }

        const accountDatabase = new AccountDatabase()
        const accountDB = await accountDatabase.findAccountById(id)

        if (!accountDB) {
            throw new NotFoundError("'id' não encontrado")
        }

        const account = new Account(
            accountDB.id,
            accountDB.balance,
            accountDB.owner_id,
            accountDB.created_at
        )

        const newBalance = account.getBalance() + value
        account.setBalance(newBalance)

        await accountDatabase.updateBalanceById(id, newBalance)

        const output: EditAccountOutputDTO = {
            message: "saldo alterado com sucesso",
            account: {
                id: accountDB.id,
                balance: newBalance,
                ownerId: accountDB.owner_id,
                createdAt: accountDB.created_at
            }
        }

        return output
    }
}