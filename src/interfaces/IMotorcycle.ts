import { z } from 'zod';
import { VehicleZodSchema } from './IVehicle';

const vehicleMotorcycle = z.object({
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z.number().int().positive().lte(2500),
});

export const MotorcycleZodSchema = z
  .intersection(vehicleMotorcycle, VehicleZodSchema);

export type IMotorcycle = z.infer<typeof MotorcycleZodSchema>;