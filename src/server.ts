import express, { Router, Request, Response } from "express"
import cors from 'cors'
const app = express()
const port = 3333
const router = Router()
app.use(express.json())
app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
}))
app.use(router)

router.post('/auth', (req: Request, res: Response) => {
    console.log(req.body)
    return res.json({ token: '123456', name: 'Talles Amaral', username: 'talles.amaral', id: 'adfasdfa-asdfadsf' })
})

router.post('/session', (req: Request, res: Response) => {
    const authToken = req.headers.authorization
    
    if (!authToken) {
        return res.status(401).end()
    }

    const [, token] = authToken.split(' ')

    if(token !== "123456") {
        return res.status(401).json({ ok: false })
    }

    return res.json({ ok: true })
})

app.listen(port, () => {
    console.log(`🔥 Server is running on http://localhost:${port}`)
})