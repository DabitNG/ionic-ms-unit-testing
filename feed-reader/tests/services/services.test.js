describe('Services', function(){

	beforeEach(module('feed-reader.services'));

	beforeEach(inject(function(_FeedReaderSrvc_){
		FeedReaderSrvc = _FeedReaderSrvc_;
	}));

	it('should have posts loaded', inject(function(FeedReaderSrvc){
		expect(FeedReaderSrvc.read()).not.toBe(null);
	}));
});