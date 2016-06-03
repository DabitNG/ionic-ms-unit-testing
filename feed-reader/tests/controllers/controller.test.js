describe('Controllers', function(){
	var scope;

	beforeEach(module('feed-reader.controllers'));

	beforeEach(inject(function($rootScope, $controller){
		scope = $rootScope.$new();
		$controller('FeedReaderCtrl', {$scope: scope});
	}));

	it('should have posts loaded', function(){
		expect(scope.posts).not.toBe(null);
	});
});