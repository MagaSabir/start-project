import exrpess from 'express';
export const app = exrpess();
app.use(exrpess.json())

app.get('/', (req, res) => {
    res.status(200).json({version: '1.0'})
})