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

const existe=function(req,res,next){
	if(req.params.id >= products.length || isNaN(req.params.id)){
		return res.json({error:'Error producto no encontrado'})
	}
	next()
}

router.get('/',(req,res)=>{
    res.json({products:products})
})

router.get('/:id',existe,(req,res)=>{
	const idt=req.params.id
	let resultado=products.find(x => x.id == idt)
	res.json({products:resultado});
})

router.post('/',(req,res)=>{
    const producto= req.body
	let countId=1;
	if(products.length === 0){
		let newId=countId;
		producto.id=newId;
		products.push(producto)
		res.json({mensaje:'Producto Guardado',id: newId})
	}else{
		let last_element = products[products.length - 1];
		let newId= last_element.id + countId;
		producto.id=newId;
		products.push(producto);
		res.json({mensaje: 'Producto Guardado',id: newId})
	}
})

router.put('/:id',existe,(req,res)=>{
    let idt=parseInt(req.params.id)
	let newContent=req.body;
	products.splice(idt-1,1,newContent)
	res.json({mensaje: products})
	// let resultado=products.find(x => x.id === idt)
	// console.log(resultado)
	// products[idt]["title"]=req.body.title;
	// products[idt]["price"]=req.body.price;
	// res.json(products)
})

router.delete('/:id',existe,(req,res)=>{
	const idt=parseInt(req.params.id)
	let resultado=products.find(x => x.id == idt);
	let newProducts=products.filter((item) => item != resultado);
	res.json({mensaje: newProducts})
})

module.exports=router