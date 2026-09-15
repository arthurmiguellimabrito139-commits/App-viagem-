import bcrypt from "bcrypt";
import { db } from "./db.js";

const migrarSenhas = () => {
    // Busca todos os administradores
    db.query("SELECT cpf, senha FROM administradores", async (err, admins) => {
        if (err) {
            console.error("Erro ao buscar administradores:", err);
            return;
        }

        for (const admin of admins) {
            // Pula quem já tem hash (hash do bcrypt sempre começa com $2)
            if (admin.senha.startsWith("$2")) {
                console.log(`CPF ${admin.cpf} já está com hash. Pulando.`);
                continue;
            }

            const hash = await bcrypt.hash(admin.senha, 10);

            await new Promise((resolve, reject) => {
                db.query(
                    "UPDATE administradores SET senha = ? WHERE cpf = ?",
                    [hash, admin.cpf],
                    (err) => {
                        if (err) return reject(err);
                        console.log(`CPF ${admin.cpf} migrado com sucesso.`);
                        resolve();
                    }
                );
            });
        }

        console.log("Migração concluída.");
        process.exit(0);
    });
};

migrarSenhas();