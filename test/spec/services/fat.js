'use strict';

describe('Service: fat', function () {

  // load the service's module
  beforeEach(module('lgn365App'));

  // instantiate service
  var fat;
  beforeEach(inject(function (_fat_) {
    fat = _fat_;
  }));

  it('should do something', function () {
    expect(!!fat).toBe(true);
  });

});
