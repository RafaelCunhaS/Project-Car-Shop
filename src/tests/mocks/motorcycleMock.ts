import { IMotorcycle } from '../../interfaces/IMotorcycle';

export const motorcycleMock: IMotorcycle = {
  model: "Ferrari Maranello",
  year: 1963,
  color: "red",
  buyValue: 3500000,
  category: "Street",
  engineCapacity: 125
}

export const motorcycleMockWithId: IMotorcycle & { _id: string } = {
  _id: "4edd40c86762e0fb12000003",
  model: "Ferrari Maranello",
  year: 1963,
  color: "red",
  buyValue: 3500000,
  category: "Street",
  engineCapacity: 125
}

export const motorcycleUpdateMock: IMotorcycle = {
  model: "Ferrari Maranello",
  year: 1963,
  color: "red",
  buyValue: 3800000,
  category: "Trail",
  engineCapacity: 225
}

export const motorcycleUpdateMockWithId: IMotorcycle & { _id: string } = {
  _id: "4edd40c86762e0fb12000003",
  model: "Ferrari Maranello",
  year: 1963,
  color: "red",
  buyValue: 3800000,
  category: "Trail",
  engineCapacity: 225
}