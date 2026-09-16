import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import produotoRoute from './route/passageiros.js'
import { fazerLogin } from './controller/Auth.js';

dotenv.config();

const app = express()

app.use(express.json());

app.use(express.urlencoded({extended: true}))

const allowedOrigins = [
    process.env.FRONT_URL,
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://192.168.100.116:3000"
].filter(Boolean);
app.use(cors({
    origin: (origin, callback) => {
        const ehVercelPreview = origin && /\.vercel\.app$/.test(origin);

        if (!origin || allowedOrigins.includes(origin) || ehVercelPreview) {
            return callback(null, true);
        }

        return callback(new Error("Origem não permitida pelo CORS."));
    }
}))

app.use('/passageiros', produotoRoute)
app.post('/login', fazerLogin);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
