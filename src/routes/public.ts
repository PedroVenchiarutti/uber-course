import { Router } from "express";
import { getUsers, signup } from "../signup";

const router = Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.post("/signup", async (req, res) => {
  try {
  const { name, email, cpf, carPlate, isPassenger, isDriver } = req.body;


  const account = await signup({
    name,
    email,
    cpf,
    carPlate,
    isPassenger,
    isDriver,
  });

  res.json(account);
} catch (error) {
  console.log(error);
  res.status(400).json({ error: error });
}
})

router.get("/users", async (req, res) => {
  try {
   const users = await getUsers();

    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
})


export { router };