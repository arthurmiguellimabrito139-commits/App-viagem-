import {db} from '../db.js'

export const getProdutos = (_, res ) => {
    const q = 'select * from produtos'

    db.query(q, (err, data) => {
        if (err) {
            return res.json(err)
        }
        return res.status(200).json(data)
    })
}