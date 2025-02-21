const express = require('express');
const cors = require('cors');

const app = express()

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("API FUNCIONANDO")
})

app.post("/girar-dado", (req, res) => {
    const tipoDado = req.body.tipo_dado;
    const tiposValidos = ['D2', 'D4', 'D6', 'D8', 'D10', 'D12', 'D20', 'D100'];

    if (!tiposValidos.includes(tipoDado)) {
        return res.status(400).json({ erro: "Tipo de dado inválido." });
    }

    let numeroFaces = parseInt( tipoDado.slice(1, tipoDado.length) )
    const resultado = Math.floor(Math.random() * numeroFaces) + 1;

    console.log("POST: /girar-dado")
    console.log({ resultado: resultado }, "\n")
    res.json({ resultado: resultado });
})

app.listen(3000, () => {
    console.log("Servidor iniciado: http://localhost:3000/")
})