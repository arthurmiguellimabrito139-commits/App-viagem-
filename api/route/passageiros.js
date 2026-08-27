import express from "express";
import { getPassageiro, addPassageiro, updatePassageiro, deletePassageiro } from "../controller/Passageiro.js";
import { apenasAdmin } from "../middleware/auth.js"; // Importa o bloqueio

const router = express.Router();

// GET: Todos podem ler (Passageiros e Admins)
router.get("/", getPassageiro); 

// POST, PUT, DELETE: Apenas Admins podem criar, alterar ou deletar
router.post("/", apenasAdmin, addPassageiro);
router.put("/:id", apenasAdmin, updatePassageiro);
router.delete("/:id", apenasAdmin, deletePassageiro);

export default router;