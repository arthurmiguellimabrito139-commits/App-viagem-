import { db } from "./db.js";

db.query(
    "UPDATE passageiros SET precisa_trocar_senha = true WHERE senha IS NOT NULL",
    (err, result) => {
        if (err) {
            console.error("Erro ao atualizar passageiros:", err);
            process.exit(1);
        }
        console.log(`${result.affectedRows} passageiro(s) marcado(s) como 'precisa trocar senha'.`);
        process.exit(0);
    }
);