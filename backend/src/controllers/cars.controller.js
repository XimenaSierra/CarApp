
const cars = require("../data/cars.data");

//Obtener todos los carros

const getAllCars = (req, res) => {
    res.json(cars);
};

//Obtener un carro por su ID

const getCarById = (req, res) => {
    const car = cars.find((c) => c.id === parseInt(req.params.id));
    if (!car) {
        return res.status(404).json({ message: "Carro no encontrado"});
    }
    res.json(car);

};

//Crear un nuevo carro

const createCar = (req, res) => {
    const { brand, model, year, color } = req.body;
    const newCar = {
        id: cars.length + 1,
        brand,
        model,
        year,
        color,
    };
    cars.push(newCar);
    res.status(201).json(newCar);
};


//Actualizar un carro

const updateCar = (req, res) => {
    const index = cars.findIndex((c) => c.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({ message: "Carro no encontrado"});
    }
    car[index] = { ...caars[index], ...req.body };
    res.json(cars[index]);
};

//Eliminar un carro

const deleteCar = (req, res) => {
    const index = cars.findIndex((c) => c.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({ message: "Carro no encontrado"});
    }
    const deleted = cars.splice(index, 1);
    res.json({ message: "Carro eliminado", car: deleted[0] });
}

module.exports = { getAllCars, getCarById, createCar, updateCar, deleteCar };