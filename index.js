import express from 'express'
import { engine } from 'express-handlebars';

import { services } from './data/services.data.js'

const app = express();

// public directory
app.use(express.static('public'))

app.use('/css', express.static('node_modules/bootstrap/dist/css'))
app.use('/js', express.static('node_modules/bootstrap/dist/js'))
app.use('/css', express.static('node_modules/jquery/dist'))

// handlebars
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('home', { title: "Home Page 2.0" });
});

app.get('/services', (req, res) => {
    res.render('services', { services: services });
});

app.get('/services/:name', (req, res) => {

    const nameURL = req.params.name

    const service = services.find((item) => item.url === `/services/${nameURL}`)
    console.log(service)

    res.render('service', { service })
});

app.listen(5000, () => console.log(`Servidor encendido http://localhost:${5000}`))