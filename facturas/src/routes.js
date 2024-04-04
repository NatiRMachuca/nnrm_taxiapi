const router = require('express').Router();
const Factura = require('./model');

router.get('/', async (req, res) => {
    const items = await Factura.find({});
    return res.status(200).json(items);
})


router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const item = await Factura.findOne({_id: id});
    if (!item) return res.status(404).json({ error: 'Item not found' });

  return res.status(200).json(item);
});


module.exports = router;