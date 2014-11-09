'use strict';

/**
 * @ngdoc service
 * @name lgn365App.carb
 * @description
 * # carb
 * Factory in the lgn365App.
 */
angular.module('lgn365App')
  .factory('carb', function (config) {

    // Public API here
    return {
      calculate: function () {
        var macros = config.get('macros');

        return [
          (macros.calories[0] - macros.protein[0] * 4 - macros.fat[0] * 9) / 4,
          (macros.calories[1] - macros.protein[1] * 4 - macros.fat[1] * 9) / 4
        ];
      }
    };
  });
