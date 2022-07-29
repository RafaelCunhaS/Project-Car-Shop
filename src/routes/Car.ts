import { Router } from 'express';
import CarController from '../controllers/Car';
import CarModel from '../models/Car';
import CarService from '../services/Car';

const route = Router();

const car = new CarModel();
const carService = new CarService(car);
const carController = new CarController(carService);

route.post('/', (req, res) => carController.create(req, res));

route.get('/', (req, res) => carController.read(req, res));

route.get('/:id', (req, res) => carController.readOne(req, res));

route.delete('/:id', (req, res) => carController.delete(req, res));

export default route;