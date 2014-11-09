'use strict';

describe('Service: carb', function () {

  // load the service's module
  beforeEach(module('lgn365App'));

  // instantiate service
  var carb;
  beforeEach(inject(function (_carb_) {
    carb = _carb_;
  }));

  it('should do something', function () {
    expect(!!carb).toBe(true);
  });

});
