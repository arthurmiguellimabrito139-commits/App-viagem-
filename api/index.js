import express from "express"
import cors from "cors"
import produotoRoute from './route/passageiros.js'

const app = express()

app.use(express.json());

app.use(express.urlencoded({extended: true}))

app.use(cors())

app.use('/' , produotoRoute)

app.listen(3001)