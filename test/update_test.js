const assert = require('assert');
const User = require('../src/user')


describe('Updating records', () => {
	let joe;

	beforeEach((done) => {
		joe = new User({ name: 'Joe', likes: 0 });
		joe.save()
			.then(() => done());
	});

	function assertName(operation, done) {
		operation
			.then(() => User.find({}))
			.then((users) => {
				assert(users.length === 1);
				assert(users[0].name === 'Michael');
				done();
			});
	}

	it('instance type using set and save', (done) => {
		joe.set('name', 'Michael');
		assertName(joe.save(), done);
	});

	it('a model instance can update', (done) => {
		assertName(
			User.update({ 'name': 'Joe' }, { 'name': 'Michael' }),
			done
		);			
	});

	it('a model class can update', (done) => {
		assertName(
			User.findOneAndUpdate({ 'name': 'Joe' }, { 'name': 'Michael' }), 
			done
		);			
	});

	it('a model class can find a record with an id and update it', (done) => {
		assertName(
			User.findByIdAndUpdate(joe._id, { 'name': 'Michael' }), 
			done
		);			
	});

	it('A user can have their postcount increment by 10', (done) => {
		User.update({ name: 'Joe' }, { $inc: { likes: 10 } })
			.then(() => User.findOne({ name: 'Joe' }))
			.then((user) => {
				assert(user.likes === 10);
				done();
			});
	});

});








