const { UserRepository } = require('../repositories/userRepository');

describe('insert', () => {
  beforeAll(async () => {
    await UserRepository.deleteOne({ id: 'some-user-id' });
  });
  afterAll(async () => {
    await UserRepository.deleteOne({ id: 'some-user-id' });
  });

  it('should insert a doc into collection', async () => {
    const mockUserId = { id: 'some-user-id' };
    await UserRepository.insertOne(mockUserId);

    const findOneWillRetrunDocument = await UserRepository.findOne({ id: 'some-user-id' });
    expect(findOneWillRetrunDocument.id).toEqual(findOneWillRetrunDocument.id);
  });
});

describe(`you shouldn't find a user`, () => {
  it('failed to find user', async () => {
    const query = { id: 'some-user-id' };
    const clientNotExistInDatabase = await UserRepository.findOne(query);
    expect(clientNotExistInDatabase).toBeFalsy();
  });
});

describe(`get all database`, () => {
  afterAll(async () => {
    await UserRepository.deleteOne({ id: 'some-user-id' });
  });
  it('should find all the documents', async () => {
    const findWillRetrunAllDocuments = await UserRepository.find();
    expect(findWillRetrunAllDocuments.length).toEqual(0);
  });
});

describe(`should update one document`, () => {
  beforeAll(async () => {
    const mockUserId = { id: 'some-user-id' };
    await UserRepository.insertOne(mockUserId);
  });

  afterAll(async () => {
    await UserRepository.deleteOne({ id: 'some-user-id-updated' });
  });
  it('should find and update one document', async () => {
    const query = { id: 'some-user-id' };
    const userToUpdate = await UserRepository.findOne(query);
    const updateClientDocument = { $set: { id: 'some-user-id-updated' } };
    await UserRepository.updateOne(userToUpdate, updateClientDocument);
    const findOneWillRetrunDocument = await UserRepository.findOne({ id: 'some-user-id-updated' });
    expect(findOneWillRetrunDocument.id).toEqual(findOneWillRetrunDocument.id);
  });
});
