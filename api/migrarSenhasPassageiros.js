import bcrypt from "bcrypt";
import { db } from "./db.js";

const migrarSenhasPassageiros = () => {
    db.query("SELECT CPF FROM passageiros", async (err, passageiros) => {
        if (err) {
            console.error("Erro ao buscar passageiros:", err);
            return;
        }

        for (const p of passageiros) {
            const ultimosDigitos = p.CPF.slice(-4);
            const hash = await bcrypt.hash(ultimosDigitos, 10);

            await new Promise((resolve, reject) => {
                db.query(
                    "UPDATE passageiros SET senha = ? WHERE CPF = ?",
                    [hash, p.CPF],
                    (err) => {
                        if (err) return reject(err);
                        console.log(`CPF ${p.CPF} migrado.`);
                        resolve();
                    }
                );
            });
        }

        console.log("Migração de passageiros concluída.");
        process.exit(0);
    });
};

migrarSenhasPassageiros();