import express from "express";
import { getPassageiro, addPassageiro, updatePassageiro, deletePassageiro, trocarSenhaPassageiro } from "../controller/Passageiro.js";
import { apenasAdmin, verificarToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/", verificarToken, getPassageiro);
router.post("/", verificarToken, apenasAdmin, addPassageiro);
router.put("/senha", verificarToken, trocarSenhaPassageiro);
router.put("/:id", verificarToken, apenasAdmin, updatePassageiro);
router.delete("/:id", verificarToken, apenasAdmin, deletePassageiro);

export default router;