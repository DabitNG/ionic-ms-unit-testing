describe('LocalStorage unit test', function(){
	var LocalStorage;

	beforeEach(module('local-storage'));

	beforeEach(inject(function(_LocalStorage_){
		LocalStorage = _LocalStorage_;
	}));

	it('get value by index', inject(function(LocalStorage){
		expect(LocalStorage.get(1,'')).toEqual('');
	}));

	it('get object by index', inject(function(LocalStorage){
		expect(LocalStorage.get(2,'{}')).toEqual('{}');
	}));

	it('add value with index', inject(function(LocalStorage){
		LocalStorage.set(1, 'Pepe')
		expect(LocalStorage.get(1,'')).toEqual('Pepe');
	}));
	
	it('add object with index', inject(function(LocalStorage){
		var person = {
			id: "1",
			name: "Pepe"
		};
		LocalStorage.setObject(2, person)
		expect(LocalStorage.get(2,'{}')).toEqual(JSON.stringify(person));
	}));

	it('get defaultValue if index not exists', inject(function(LocalStorage){
		expect(LocalStorage.get(3,'Mateo')).toEqual('Mateo');
	}));

	it('get defaultObj if index not exists', inject(function(LocalStorage){
		expect(LocalStorage.get(3,'{"id":1,"name":"Pepe"}')).toEqual('{"id":1,"name":"Pepe"}');
	}));
});
