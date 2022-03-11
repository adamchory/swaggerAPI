const express = require('express')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json');

var players = [{number:0,name:"Tatum"},{number:7,name:"Brown"}]

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))



app.get("/players", (req,res)=>{
    res.send(players);
})
app.post("/player",(req,res)=>{
    players.push({number:req.body.number, name:req.body.name})
    res.send(`${JSON.stringify(players)} created`)
})
app.delete("/player/:number", (req,res)=>{
    console.log('delete:number:'+req.params.number)
    players = players.filter(item=> item.number != req.params.number)
    res.send("players left:"+JSON.stringify(players));
})

app.listen(4000,()=>console.log('Listening on 4000'))