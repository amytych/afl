'use strict';

describe('Service: protein', function () {

  // load the service's module
  beforeEach(module('lgn365App'));

  // instantiate service
  var protein;
  beforeEach(inject(function (_protein_) {
    protein = _protein_;
  }));

  it('should do something', function () {
    expect(!!protein).toBe(true);
  });

});
