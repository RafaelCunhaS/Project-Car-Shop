import { expect } from 'chai';
import sinon from 'sinon';
import CarModel from '../../../models/Car';
import { Model } from 'mongoose';
import { carMock, carMockWithId, carUpdateMock, carUpdateMockWithId } from '../../mocks/carMock';

describe('Car Model', () => {
  const carModel = new CarModel();

	before(() => {
		sinon.stub(Model, 'create').resolves(carMockWithId);
		sinon.stub(Model, 'findOne').resolves(carMockWithId);
		sinon.stub(Model, 'find').resolves([carMockWithId]);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(carUpdateMockWithId);
		sinon.stub(Model, 'findByIdAndRemove').resolves(carMockWithId);
	});

	after(() => {
		sinon.restore();
	});

	describe('creating a car', () => {
		it('successfully created', async () => {
			const newCar = await carModel.create(carMock);
			expect(newCar).to.be.deep.equal(carMockWithId);
		});
	});

	describe('searching a car', () => {
		it('successfully found', async () => {
			const CarsFound = await carModel.readOne('62cf1fc6498565d94eba52cd');
			expect(CarsFound).to.be.deep.equal(carMockWithId);
		});

		it('_id invalid', async () => {
			try {
				await carModel.readOne('123ERRADO');
			} catch (error: any) {
				expect(error.message).to.be.eq('InvalidMongoId');
			}
		});
	});

	describe('searching all cars', () => {
		it('returns all Cars in the db', async () => {
			const CarsFound = await carModel.read();
			expect(CarsFound).to.be.deep.equal([carMockWithId]);
		});
	});

  describe('updating a car', () => {
		it('successfully deleted', async () => {
			const CarDeleted = await carModel.update('62cf1fc6498565d94eba52cd', carUpdateMock);
			expect(CarDeleted).to.be.deep.equal(carUpdateMockWithId);
		});

		it('_id invalid', async () => {
			try {
				await carModel.update('123ERRADO', carUpdateMock);
			} catch (error: any) {
				expect(error.message).to.be.eq('InvalidMongoId');
			}
		});
	});

	describe('deleting a car', () => {
		it('successfully deleted', async () => {
			const CarDeleted = await carModel.delete('62cf1fc6498565d94eba52cd');
			expect(CarDeleted).to.be.deep.equal(carMockWithId);
		});

		it('_id invalid', async () => {
			try {
				await carModel.delete('123ERRADO');
			} catch (error: any) {
				expect(error.message).to.be.eq('InvalidMongoId');
			}
		});
	});
});