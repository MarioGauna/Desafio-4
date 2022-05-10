const express = require("express");
const routesProducts= require('./routesProducts.js')
const app=express();

const PORT=8080;
const server=app.listen(PORT,()=>{
    console.log(`Servidor escuchando puerto ${PORT}`);
});

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
app.use("/api/productos",routesProducts);