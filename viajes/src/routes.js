const router = require('express').Router();
const Viaje = require('./model');
const stan = require('./bus');


router.get('/', async (req, res) => {
    const query = { estatus: "Activo" };
    const items = await Viaje.find(query);
    return res.status(200).json(items);
})

router.post('/', async (req, res) => {
    

    let data ={};
    let databus={};
    const { pasajero,conductor,puntoinicio,puntofinal,comentarios}=req.body || {};

    //console.log(req.body,Object.keys(req.body).length);
    if(pasajero && conductor && puntoinicio && puntofinal && comentarios){
        data={
            pasajero,
            conductor,
            puntoinicio,
            puntofinal,
            comentarios,
            estatus: "Activo"
        }

        databus={id: conductor}
        try{ 
            const dataToSave = await Viaje.create(data);
            stan.publish('conductores:updateOcupado', JSON.stringify(databus), (err, guid) => {
                if (err) console.log('post viaje : ERROR en la publicacion de msj : ' + err);
                else console.log('post viaje: EXITO publico msj guid: ' + guid);
            });
            res.status(200).json(dataToSave)
        
        }catch (error) {
            res.status(400).json({message: error.message})
        }
    }else{
        res.status(422).json({message: 'Invalid parameters'})
    }
})

router.put('/:id', async (req, res) => {
    try{
        const {id} = req.params;
        console.log(!id);
        if(!id){
            return res.status(422).json({ error: 'id de viaje requerido' });
        }

        const updatedData = {"estatus": "Completado"};
        const options = { new: true }
    
        const item = await Viaje.findByIdAndUpdate(id,updatedData,options);
        //console.log("item en completar viaje",item);
    
        if (item) {
            let databus={id: item.conductor}
            stan.publish('conductores:updateDisponible', JSON.stringify(databus), (err, guid) => {
                if (err) console.log('put viaje : ERROR en la publicacion de msj : ' + err);
                else console.log('put  viaje: EXITO publico msj guid: ' + guid);
            });
            
            return res.status(200).json(item);
        
        }else{
            return res.status(404).json({ error: 'Viaje no encontrado' });
        }
    }catch(e){
        let msjerror="Error interno";
        if(e.constructor.name=="CastError"){
            msjerror="El id tiene formato incorrecto"
        }
        console.log(e.constructor.name);
        return res.status(500).json({ error: msjerror });
    }

  
});


module.exports = router;