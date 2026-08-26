import express from "express";
import { getPassageiro, addPassageiro, updatePassageiro, deletePassageiro } from "../controller/Passageiro.js";

const router = express.Router();

  router.get("/", getPassageiro);
  router.post("/", addPassageiro);
+ router.put("/:id", updatePassageiro);
  router.delete("/:id", deletePassageiro);

export default router;