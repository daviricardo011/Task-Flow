import { Router } from "express";
import { UserModel } from "../models/UserModel";

const router = Router();

router.post("/", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res
      .status(400)
      .json({ message: "Todos os campos são obrigatórios" });

  try {
    const newUser = await UserModel.create({ name, email, password });
    return res.status(201).json({ ...newUser });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao cadastrar usuário" });
  }
});
router.get("/", async (req, res) => {
  try {
    const data = await UserModel.findAll();
    return res.status(200).json({ data });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao consultar usuários" });
  }
});
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const foundUser = await UserModel.findById(Number(id));
    return res.status(200).json({ ...foundUser });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao consultar usuário" });
  }
});
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    await UserModel.update(Number(id), { name, email });
    return res.status(204).send();
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao editar usuário" });
  }
});
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await UserModel.delete(Number(id));
    return res.status(204).send();
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao excluir usuário" });
  }
});

export default router;
