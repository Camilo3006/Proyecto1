const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let usuarios = [];

const lugares = [
 {nombre:"Cartagena", seguridad:"Media ⚠️", descripcion:"Ciudad histórica", imagen:"cartagena.jpg"},
 {nombre:"Guatapé", seguridad:"Alta ✅", descripcion:"Pueblo colorido", imagen:"guatape.jpg"},
 {nombre:"Tatacoa", seguridad:"Alta ✅", descripcion:"Desierto", imagen:"tatacoa.jpg"},
 {nombre:"Caño Cristales", seguridad:"Media ⚠️", descripcion:"Río de colores", imagen:"cano.jpg"},
 {nombre:"Capurganá", seguridad:"Media ⚠️", descripcion:"Caribe escondido", imagen:"capurgana.jpg"},
 {nombre:"Tayrona", seguridad:"Alta ✅", descripcion:"Parque natural", imagen:"tayrona.jpg"},
 {nombre:"Salento", seguridad:"Alta ✅", descripcion:"Zona cafetera", imagen:"salento.jpg"},
 {nombre:"Leticia", seguridad:"Media ⚠️", descripcion:"Amazonas", imagen:"leticia.jpg"},
 {nombre:"Mompox", seguridad:"Alta ✅", descripcion:"Ciudad colonial", imagen:"mompox.jpg"}
];

app.get("/lugares",(req,res)=>res.json(lugares));

app.post("/registro",(req,res)=>{
 usuarios.push(req.body);
 res.json({mensaje:"Registrado"});
});

app.post("/login",(req,res)=>{
 const user=usuarios.find(u=>u.usuario===req.body.usuario && u.password===req.body.password);
 res.json({mensaje:user?"Login correcto":"Error"});
});

app.listen(3000,()=>console.log("Servidor en http://localhost:3000"));