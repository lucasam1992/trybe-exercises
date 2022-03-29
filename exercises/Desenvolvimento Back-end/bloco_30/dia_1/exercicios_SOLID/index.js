const express = require('express');
const app = express();
const plants = require('./plants');

app.use(express.json());

app.get('/plants', (_req,res) => {
    const plant = plants.getPlants();
    res.send(plant);
});
app.get('plants/:id', (req,res) => {
    const { id } = req.params;
    const plant = plants.getPlantById(id);
    res.send(plant);
});
app.delete('plants/:id', (req,res) => {
    const { id } = req.params;
    const plant = plants.removePlantById(id);
    res.send(plant);
});
app.post('/plants', (req,res) => {
    const newPlant = req.body.plant;
    const plant = plants.createNewPlant(newPlant);
    res.send(plant);
});
app.put('/plants/:id', (req,res) => {
    const { id } = req.params;
    const newPlant = req.body.plant;
    const plant = plants.editPlant(id, newPlant);
    res.send(plant);
});
app.get('/sunny/:id', (req,res) => {
    const { id } = req.params;
    const plant = plants.getPlantById(id);
    res.send(plant);
});

app.listen(3000, function(){
    console.log("Ouvindo porta 3000");
});
