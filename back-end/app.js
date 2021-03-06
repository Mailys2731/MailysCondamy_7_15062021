
const express = require('express')
const { read } = require('fs')
//Middleware qui log toutes les requêtes
const morgan = require('morgan')
const sequelize = require('./src/db/sequelize')
const cors = require ('cors');
const bodyParser = require ('body-parser')


const app = express()
const port =3000

const path = require('path')


app
.use(morgan ('dev'))
.use(express.json())
.use(cors());

//sequelize.initDb()

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});


app.use('/public', express.static(path.join(__dirname, 'public')));


//Points de terminaison
const postsComments = require('./src/routes/comments')
app.use('/api/comments', postsComments)

const postsRoutes = require('./src/routes/posts')
app.use('/api/posts', postsRoutes)

const usersRoutes = require('./src/routes/users')
app.use('/api/users', usersRoutes)
app.use(bodyParser.urlencoded({ extended: true }));

//Gestion des erreurs 404
app.use(({res}) => {
    const message = 'Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL.'
    res.status(404).json({message})
})

app.listen(port, () => console.log(`app listen on: http://localhost:${port}`))