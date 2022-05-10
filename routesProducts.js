const {Router} = require('express');
const router = Router();

const products=[
	{
	"title":"Escuadra",
	"price": 123.45,
	"id":1
	},
	{
	"title":"Calculadora",
	"price": 234.56,
	"id":2
	},
	{
	"title":"Globo Terráqueo",
	"price": 345.67,
	"id":3
	},
	{
	"title":"Agenda",
	"price": 30.67,
	"id":4
	},
	{
	"title":"Lapíz",
	"price": 5.67,
	"id":5
	}
]

router.get('/',(req,res)=>{
    res.json({products:products})
})

router.get('/:id',(req,res)=>{
	const idt=req.params.id
	let resultado=products.find(x => x.id == idt)
	resultado === undefined || resultado === null ? res.send({error:'Error ID no encontrado'}): res.json({products:resultado});
})

router.post('/',(req,res)=>{
    const producto= req.body
	let countId=1;
	if(products.length === 0){
		let newId=countId;
		producto.id=newId;
		products.push(producto)
		res.json({mensaje:'id', newId})
	}else{
		let last_element = products[products.length - 1];
		let newId= last_element.id + countId;
		producto.id=newId;
		products.push(producto);
		res.json({mensaje: 'pepe', newId})
	}
})

router.put('/:id',(req,res)=>{
    const idt=parseInt(req.params.id)
	console.log(idt)
	let resultado=products.find(x => x.id == idt)
	console.log(resultado)
	if(resultado === undefined){
		res.json({error:'Error ID no encontrado'})
	}else{
		products[idt]["title"]=req.body.title;
		products[idt]["price"]=req.body.price;
		res.json(products)
	}
})

router.delete('/:id',(req,res)=>{
	const idt=parseInt(req.params.id)
	let resultado=products.find(x => x.id == idt);
	if(resultado === undefined){
		res.json({error:'Error ID no encontrado'})
	}else{
		let newProducts=products.filter((item) => item != resultado);
		res.json({newProducts})
	}
})

module.exports=router