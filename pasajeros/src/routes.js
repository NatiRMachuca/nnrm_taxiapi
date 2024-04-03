const router = require('express').Router();
const Pasajero = require('./schemas/model');
const Conductor= require('./schemas/conductores');

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
    try {
        const dataToSave = await Pasajero.create(req.body);
        res.status(200).json(dataToSave)
    }catch (error) {
        res.status(400).json({message: error.message})
    }
})

router.post('/cercanos', async (req, res) => {
    console.log("aquii");
    const items = await Conductor.find({});
    return res.status(200).json(items);
  
});



module.exports = router;