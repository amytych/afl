'use strict';

/**
 * @ngdoc service
 * @name lgn365App.protein
 * @description
 * # protein
 * Factory in the lgn365App.
 */
angular.module('lgn365App')
  .factory('protein', function (config) {

    /**
     * Protein calculations depend on gender, goal and fat level
     * @return {Array}
     */
    function getModifiers () {
      var modifiers = [1, 1],
        goal = config.get('goal'),
        gender = config.get('gender'),
        bodyFat = config.get('bodyFat');

      // off day modifier is 0.9 when (fat loss absolute && male >= 24% BF || male >= 18% BF) || fat loss percentage
      if ((goal.id === 0 && (gender.id === 0 && bodyFat >= 24) || (gender.id === 1 && bodyFat >= 18)) || goal.id === 1) {
        modifiers[1] = 0.9;
      }

      return modifiers;
    }

    // Public API here
    return {
      calculate: function () {
        var protein = [0, 0],
          metric = config.get('metric'),
          bodyWeight = config.get('bodyWeight'),
          modifiers = getModifiers();

        protein[0] = modifiers[0] * bodyWeight * metric.modifier;
        protein[1] = modifiers[1] * bodyWeight * metric.modifier;

      return protein;

      }
    };
  });
