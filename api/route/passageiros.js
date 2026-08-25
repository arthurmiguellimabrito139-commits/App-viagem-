import express from "express";
import { getPassageiro, addPassageiro } from "../controller/Passageiro.js";

const router = express.Router();

router.get("/", getPassageiro);
router.post("/", addPassageiro);

export default router;