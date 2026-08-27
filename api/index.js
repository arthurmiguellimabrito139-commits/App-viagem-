import express from "express"
import cors from "cors"
import produotoRoute from './route/passageiros.js'
import { fazerLogin } from './controller/Auth.js';
const app = express()

app.use(express.json());

app.use(express.urlencoded({extended: true}))

app.use(cors())

app.use('/passageiros', produotoRoute)
app.post('/login', fazerLogin);
app.listen(3001)