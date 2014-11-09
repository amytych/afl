'use strict';

describe('Service: calorie', function () {

  // load the service's module
  beforeEach(module('lgn365App'));

  // instantiate service
  var calorie;
  beforeEach(inject(function (_calorie_) {
    calorie = _calorie_;
  }));

  it('should do something', function () {
    expect(!!calorie).toBe(true);
  });

});
