const router = require('express').Router();
const Viaje = require('./model');
const stan = require('./bus');


router.get('/', async (req, res) => {
    const query = { estatus: "Activo" };
    const items = await Viaje.find(query);
    return res.status(200).json(items);
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try{
        const item = await Viaje.findOne({_id: id});
        return res.status(200).json(item);
    }catch(err){
        return res.status(404).json({ error: 'Item not found' });
    }
});

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
            const databus1={id: item.conductor};

            const {latitud:latitud1, longitud:longitud1}=item.puntofinal;
            const {latitud:latitud2, longitud:longitud2}=item.puntoinicio;
            const distanciametros=getDistanciaMetros(latitud1,longitud1,latitud2,longitud2);
            const databus2={
                viaje: id,
                distancia: distanciametros,
                precio: (distanciametros*8)
            };

            console.log(databus2);

            stan.publish('conductores:updateDisponible', JSON.stringify(databus1), (err, guid) => {
                if (err) console.log('put viaje hacia conuctores : ERROR en la publicacion de msj : ' + err);
                else console.log('put  viaje: EXITO publico msj guid: ' + guid);
            });
            
            stan.publish('facturas:crear', JSON.stringify(databus2), (err, guid) => {
                if (err) console.log('put viaje hacia facturas: ERROR en la publicacion de msj : ' + err);
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

    function getDistanciaMetros(lat1,lon1,lat2,lon2){
         rad = function(x) {return x*Math.PI/180;}
        var R = 6378.137; //Radio de la tierra en km 
        var dLat = rad( lat2 - lat1 );
        var dLong = rad( lon2 - lon1 );
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(lat1)) * 
        Math.cos(rad(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        //aquí obtienes la distancia en metros por la conversion 1Km =1000m
        var d = R * c * 1000; 
        return d ; 
    }

  
});


module.exports = router;