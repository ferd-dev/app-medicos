const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

const app = express();

app.use(cors({
    origin: 'http://127.0.0.1:5500'
}));

const port = 3000;

app.get('/', (req, res) => {
    res.send('Hola desde el backend');
});

routerApi(app);

app.listen(port, () => {
    console.log(`Servidor corriendo en: http://localhost:${port}`);
});
