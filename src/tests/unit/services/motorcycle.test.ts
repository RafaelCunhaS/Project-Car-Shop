import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';
import MotorcycleModel from '../../../models/Motorcycle';
import MotorcycleService from '../../../services/Motorcycle';
import { motorcycleMock, motorcycleMockWithId } from '../../mocks/motorcycleMock';

describe('motorcycle Service', () => {
	const motorcycleModel = new MotorcycleModel();
	const motorcycleService = new MotorcycleService(motorcycleModel);

	before(() => {
		sinon.stub(motorcycleModel, 'create').resolves(motorcycleMockWithId);

		sinon.stub(motorcycleModel, 'readOne')
			.onCall(0).resolves(motorcycleMockWithId)
			.onCall(1).resolves(null);

    sinon.stub(motorcycleModel, 'read').resolves([motorcycleMockWithId]);

    sinon.stub(motorcycleModel, 'update')
      .onCall(0).resolves(motorcycleMockWithId)
			.onCall(1).resolves(null);

    sinon.stub(motorcycleModel, 'delete')
      .onCall(0).resolves(motorcycleMockWithId)
			.onCall(1).resolves(null);
	})

	after(() => {
		sinon.restore()
	})

	describe('Create motorcycle', () => {
		it('Success', async () => {
			const motorcycleCreated = await motorcycleService.create(motorcycleMock);

			expect(motorcycleCreated).to.be.deep.equal(motorcycleMockWithId);
		});

		it('Failure', async () => {
			try {
				await motorcycleService.create({} as any);
			} catch (error) {
				expect(error).to.be.instanceOf(ZodError);
			}
		});
	});

	describe('ReadOne motorcycle', () => {
		it('Success', async () => {
			const motorcycleCreated = await motorcycleService.readOne(motorcycleMockWithId._id);

			expect(motorcycleCreated).to.be.deep.equal(motorcycleMockWithId);
		});

		it('Failure', async () => {
			try {
				await motorcycleService.readOne(motorcycleMockWithId._id);
			} catch (error:any) {
				expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
			}
		});
	});

  describe('Read all motorcycles', () => {
		it('Success', async () => {
			const motorcycleCreated = await motorcycleService.read();

			expect(motorcycleCreated).to.be.deep.equal([motorcycleMockWithId]);
		});
	});

  describe('Updating a motorcycle', () => {
		it('Success', async () => {
			const motorcycleCreated = await motorcycleService.update(motorcycleMockWithId._id, motorcycleMock);

			expect(motorcycleCreated).to.be.deep.equal(motorcycleMockWithId);
		});

		it('Zod error', async () => {
			try {
				await motorcycleService.update(motorcycleMockWithId._id, {} as any);
			} catch (error) {
				expect(error).to.be.instanceOf(ZodError);
			}
		});

		it('Not found failure', async () => {
			try {
				await motorcycleService.update(motorcycleMockWithId._id, motorcycleMock);
			} catch (error:any) {
				expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
			}
		});
	});

  describe('Deleting a motorcycle', () => {
		it('Success', async () => {
			const motorcycleCreated = await motorcycleService.delete(motorcycleMockWithId._id);

			expect(motorcycleCreated).to.be.deep.equal(motorcycleMockWithId);
		});

		it('Failure', async () => {
			try {
				await motorcycleService.delete(motorcycleMockWithId._id);
			} catch (error:any) {
				expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
			}
		});
	});
});