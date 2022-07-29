import { z } from 'zod';
import { VehicleZodSchema } from './IVehicle';

const vehicleCar = z.object({
  doorsQty: z.number().int().gte(2).lte(4),
  seatsQty: z.number().int().gte(2).lte(7),
});

export const CarZodSchema = z.intersection(vehicleCar, VehicleZodSchema);
export type ICar = z.infer<typeof CarZodSchema>;