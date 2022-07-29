import { expect } from 'chai';
import sinon from 'sinon';
import MotorcycleModel from '../../../models/Motorcycle';
import { Model } from 'mongoose';
import { motorcycleMock, motorcycleMockWithId, motorcycleUpdateMock, motorcycleUpdateMockWithId } from '../../mocks/motorcycleMock';

describe('motorcycle Model', () => {
  const motorcycleModel = new MotorcycleModel();

	before(() => {
		sinon.stub(Model, 'create').resolves(motorcycleMockWithId);
		sinon.stub(Model, 'findOne').resolves(motorcycleMockWithId);
		sinon.stub(Model, 'find').resolves([motorcycleMockWithId]);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(motorcycleUpdateMockWithId);
		sinon.stub(Model, 'findByIdAndRemove').resolves(motorcycleMockWithId);
	});

	after(() => {
		sinon.restore();
	});

	describe('creating a motorcycle', () => {
		it('successfully created', async () => {
			const newmotorcycle = await motorcycleModel.create(motorcycleMock);
			expect(newmotorcycle).to.be.deep.equal(motorcycleMockWithId);
		});
	});

	describe('searching a motorcycle', () => {
		it('successfully found', async () => {
			const motorcyclesFound = await motorcycleModel.readOne('62cf1fc6498565d94eba52cd');
			expect(motorcyclesFound).to.be.deep.equal(motorcycleMockWithId);
		});

		it('_id invalid', async () => {
			try {
				await motorcycleModel.readOne('123ERRADO');
			} catch (error: any) {
				expect(error.message).to.be.eq('InvalidMongoId');
			}
		});
	});

	describe('searching all motorcycles', () => {
		it('returns all motorcycles in the db', async () => {
			const motorcyclesFound = await motorcycleModel.read();
			expect(motorcyclesFound).to.be.deep.equal([motorcycleMockWithId]);
		});
	});

  describe('updating a motorcycle', () => {
		it('successfully deleted', async () => {
			const motorcycleDeleted = await motorcycleModel.update('62cf1fc6498565d94eba52cd', motorcycleUpdateMock);
			expect(motorcycleDeleted).to.be.deep.equal(motorcycleUpdateMockWithId);
		});

		it('_id invalid', async () => {
			try {
				await motorcycleModel.update('123ERRADO', motorcycleUpdateMock);
			} catch (error: any) {
				expect(error.message).to.be.eq('InvalidMongoId');
			}
		});
	});

	describe('deleting a motorcycle', () => {
		it('successfully deleted', async () => {
			const motorcycleDeleted = await motorcycleModel.delete('62cf1fc6498565d94eba52cd');
			expect(motorcycleDeleted).to.be.deep.equal(motorcycleMockWithId);
		});

		it('_id invalid', async () => {
			try {
				await motorcycleModel.delete('123ERRADO');
			} catch (error: any) {
				expect(error.message).to.be.eq('InvalidMongoId');
			}
		});
	});
});