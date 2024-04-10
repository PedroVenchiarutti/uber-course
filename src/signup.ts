import crypto from "crypto";
import pgp from "pg-promise";
import { validateCpf } from "./validateCpf";


interface IAccount {
  accountId?: string;
  name: string;
  email: string;
  cpf: string;
  carPlate: string;
  isPassenger: boolean;
  isDriver: boolean;
}

const connection = pgp()("postgres://postgres:123456@localhost:5432/cccat16");

async function checkUserAlreadyExists(email: string) {
  const isValidEmail = email.match(/^(.+)@(.+)$/)
  if (!isValidEmail) throw new Error("Invalid email");
  const user = await connection.query(
    "select * from account where email = $1",
    [email]
  );

  if (user.length > 0) throw new Error("User already exists");
}

export async function signup({
  name,
  email,
  cpf,
  carPlate,
  isPassenger,
  isDriver,
}: IAccount) {
  try {
    await checkUserAlreadyExists(email);
    const id = crypto.randomUUID();
    const isValidName = name.match(/[a-zA-Z] [a-zA-Z]+/);
    const cartPlateMatched = carPlate.match(/[A-Z]{3}[0-9]{4}/);
    if (!isValidName) throw new Error("Invalid name");
    if (!validateCpf(cpf)) throw new Error("Invalid CPF");
    if (isDriver && cartPlateMatched)
      throw new Error("Invalid car plate or driver status");

    if (!isDriver) {
      const createUserNotDrive = await connection.query(
        "insert into account (account_id, name, email, cpf, car_plate, is_passenger, is_driver) values ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
        [id, name, email, cpf, carPlate, !!isPassenger, !isDriver]
      );
      return createUserNotDrive;
    }

    const createNewUserDrive = await connection.query(
      "insert into account (account_id, name, email, cpf, car_plate, is_passenger, is_driver) values ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [id, name, email, cpf, carPlate, !!isPassenger, isDriver]
    );
    return createNewUserDrive;
  } catch (error) {
    console.log(error);
    throw new Error("Error creating account");
  }
}

export async function getUsers() {
  try {
    const users = await connection.query("select * from account");
    return users;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting users");
  }
}