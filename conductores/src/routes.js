const router = require('express').Router();
const Conductor = require('./model');

//const stan = require('./bus');

router.get('/', async (req, res) => {
    const {estatus,latitud,longitud,radio}=req.query;
    const filtro={};
    if(estatus!=null)filtro["estatus"]=estatus;
    if(latitud!=null && longitud!=null ){
        filtro["ubicacion"]= {
            $near: {
                $maxDistance: (radio!=null && parseInt(radio))?parseInt(radio):3000,
                $geometry: {
                    type: "Point",
                    coordinates: [longitud, latitud]
                }
            }
        };
        filtro["estatus"]="Disponible";
    }
    console.log(filtro,req.query);
    const items = await Conductor.find(filtro);
    return res.status(200).json(items);
})


router.post('/', async (req, res) => {
    console.log(req.body);
    const { nombre, apellidos, sexo, celular, correo, longitud, latitud} = req.body
    let data={
        nombre,
        apellidos,
        sexo,
        celular,
        correo,
        estatus: "Disponible",
        ubicacion:{
            type: "Point",
            coordinates: [longitud,latitud]
        }
    }
    try {
        if(Object.keys(data).length>0){
            const dataToSave = await Conductor.create(data);
            res.status(200).json(dataToSave);
        }else{
            es.status(400).json({message: "Invalid parameters"})
        }
    }catch (error) {
        res.status(400).json({message: error.message})
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const item = await Conductor.findOne({_id: id});
    if (!item) return res.status(404).json({ error: 'Item not found' });

  return res.status(200).json(item);
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const updatedData = {"estatus": "Ocupado"};
    const options = { new: true }
    
    const item = await Conductor.findByIdAndUpdate(id,updatedData,options);
    if (!item) return res.status(404).json({ error: 'Item not found' });

  return res.status(200).json(item);
});

module.exports = router;