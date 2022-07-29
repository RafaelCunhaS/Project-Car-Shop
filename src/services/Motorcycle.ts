import { IMotorcycle, MotorcycleZodSchema } from '../interfaces/IMotorcycle';
import { IModel } from '../interfaces/IModel';
import { ErrorTypes } from '../errors/catalog';
import { IService } from '../interfaces/IService';

class MotorcycleService implements IService<IMotorcycle> {
  constructor(private _model:IModel<IMotorcycle>) {}

  public async create(obj:IMotorcycle): Promise<IMotorcycle> {
    const parsed = MotorcycleZodSchema.safeParse(obj);

    if (!parsed.success) throw parsed.error;

    return this._model.create(obj);
  }

  public async readOne(_id:string):Promise<IMotorcycle> {
    const motorcycle = await this._model.readOne(_id);

    if (!motorcycle) throw new Error(ErrorTypes.EntityNotFound);
    
    return motorcycle;
  }

  public async read(): Promise<IMotorcycle[]> {
    const motorcycles = await this._model.read();
    return motorcycles;
  }

  public async update(_id: string, obj: IMotorcycle): Promise<IMotorcycle> {
    const parsed = MotorcycleZodSchema.safeParse(obj);

    if (!parsed.success) throw parsed.error;

    const motorcycleUpdated = await this._model.update(_id, obj);

    if (!motorcycleUpdated) throw Error(ErrorTypes.EntityNotFound);

    return motorcycleUpdated;
  }

  public async delete(_id: string): Promise<IMotorcycle> {
    const motorcycleDeleted = await this._model.delete(_id);

    if (!motorcycleDeleted) throw Error(ErrorTypes.EntityNotFound);

    return motorcycleDeleted;
  }
}

export default MotorcycleService;