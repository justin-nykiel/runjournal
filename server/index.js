const express = require('express')
const path = require('path')

const cors = require('cors');

require('dotenv').config();

const PORT = process.env.PORT || 3001

const app = express()
app.use(cors());

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get('/api', (req,res,next)=>{
    res.json({message: "hello from server"})
})

app.listen(PORT, ()=>{
    console.log('server is listening on ' + PORT)
})