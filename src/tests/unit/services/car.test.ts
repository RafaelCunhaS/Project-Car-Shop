import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';
import CarModel from '../../../models/Car';
import CarService from '../../../services/Car';
import { carMock, carMockWithId } from '../../mocks/carMock';

describe('car Service', () => {
	const carModel = new CarModel();
	const carService = new CarService(carModel);

	before(() => {
		sinon.stub(carModel, 'create').resolves(carMockWithId);

		sinon.stub(carModel, 'readOne')
			.onCall(0).resolves(carMockWithId)
			.onCall(1).resolves(null);

    sinon.stub(carModel, 'read').resolves([carMockWithId]);

    sinon.stub(carModel, 'update')
      .onCall(0).resolves(carMockWithId)
			.onCall(1).resolves(null);

    sinon.stub(carModel, 'delete')
      .onCall(0).resolves(carMockWithId)
			.onCall(1).resolves(null);
	})

	after(() => {
		sinon.restore()
	})

	describe('Create car', () => {
		it('Success', async () => {
			const carCreated = await carService.create(carMock);

			expect(carCreated).to.be.deep.equal(carMockWithId);
		});

		it('Failure', async () => {
			try {
				await carService.create({} as any);
			} catch (error) {
				expect(error).to.be.instanceOf(ZodError);
			}
		});
	});

	describe('ReadOne car', () => {
		it('Success', async () => {
			const carCreated = await carService.readOne(carMockWithId._id);

			expect(carCreated).to.be.deep.equal(carMockWithId);
		});

		it('Failure', async () => {
			try {
				await carService.readOne(carMockWithId._id);
			} catch (error:any) {
				expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
			}
		});
	});

  describe('Read all cars', () => {
		it('Success', async () => {
			const carCreated = await carService.read();

			expect(carCreated).to.be.deep.equal([carMockWithId]);
		});
	});

  describe('Updating a car', () => {
		it('Success', async () => {
			const carCreated = await carService.update(carMockWithId._id, carMock);

			expect(carCreated).to.be.deep.equal(carMockWithId);
		});

		it('Zod error', async () => {
			try {
				await carService.update(carMockWithId._id, {} as any);
			} catch (error) {
				expect(error).to.be.instanceOf(ZodError);
			}
		});

		it('Not found failure', async () => {
			try {
				await carService.update(carMockWithId._id, carMock);
			} catch (error:any) {
				expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
			}
		});
	});

  describe('Deleting a car', () => {
		it('Success', async () => {
			const carCreated = await carService.delete(carMockWithId._id);

			expect(carCreated).to.be.deep.equal(carMockWithId);
		});

		it('Failure', async () => {
			try {
				await carService.delete(carMockWithId._id);
			} catch (error:any) {
				expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
			}
		});
	});
});