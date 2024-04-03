const router = require('express').Router();
const Pasajero = require('./model');


router.get('/', async (req, res) => {
    const items = await Pasajero.find({});
    return res.status(200).json(items);
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try{
        const item = await Pasajero.findOne({_id: id});
        return res.status(200).json(item);
    }catch(err){
        return res.status(404).json({ error: 'Item not found' });
    }
});

router.post('/', async (req, res) => {
    console.log(req.body);
    const { nombre, apellidos,sexo,celular,correo}=req.body;
    if(nombre && apellidos && sexo && correo &&celular){
        let data={
            nombre,
            apellidos,
            sexo,
            celular,
            correo
        };
        try {
            const dataToSave = await Pasajero.create(data);
            res.status(200).json(dataToSave)
        }catch (error) {
            res.status(400).json({message: error.message})
        }
    }else{
        res.status(422).json({message: "Invalid parameters"});
        
    }
})

module.exports = router;