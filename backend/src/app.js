const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes/index')
const app = express();
app.disable('x-powered-by')
app.name = 'api-boletas-CBA';
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cookieParser())

app.use(
    cors({
        origin: [
            'http://localhost:5173'
        ],
        credentials: true
    })
)

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', 'true')
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    )
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT')
    const now = new Date()
    res.header('Server-Time', now)
    next()
})

app.use('/api', router)

app.use((err, req, res, next) => {
    const status = err.status || 500
    const message = err.message || err
    res.status(status).send(message)
})

module.exports = app