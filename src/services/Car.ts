import { ICar, CarZodSchema } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import { ErrorTypes } from '../errors/catalog';
import { IService } from '../interfaces/IService';

class CarService implements IService<ICar> {
  constructor(private _model:IModel<ICar>) {}

  public async create(obj:ICar): Promise<ICar> {
    const parsed = CarZodSchema.safeParse(obj);

    if (!parsed.success) throw parsed.error;

    return this._model.create(obj);
  }

  public async readOne(_id:string):Promise<ICar> {
    const car = await this._model.readOne(_id);

    if (!car) throw new Error(ErrorTypes.EntityNotFound);
    
    return car;
  }

  public async read(): Promise<ICar[]> {
    const cars = await this._model.read();
    return cars;
  }

  public async update(_id: string, obj: ICar): Promise<ICar> {
    const parsed = CarZodSchema.safeParse(obj);

    if (!parsed.success) throw parsed.error;

    const carUpdated = await this._model.update(_id, obj);

    if (!carUpdated) throw Error(ErrorTypes.EntityNotFound);

    return carUpdated;
  }

  public async delete(_id: string): Promise<ICar> {
    const carDeleted = await this._model.delete(_id);

    if (!carDeleted) throw Error(ErrorTypes.EntityNotFound);

    return carDeleted;
  }
}

export default CarService;