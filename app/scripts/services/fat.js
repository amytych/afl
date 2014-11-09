'use strict';

/**
 * @ngdoc service
 * @name lgn365App.fat
 * @description
 * # fat
 * Factory in the lgn365App.
 */
angular.module('lgn365App')
  .factory('fat', function (config) {

    // Public API here
    return {
      calculate: function () {
        var data = config.getAll(),
          fat = [0, 0];

        // fat los absolute
        if (data.goal.id === 0) {
          // female <= 16 or male <= 10
          if ((data.gender.id === 0 && data.bodyFat <= 16) || (data.gender.id === 1 && data.bodyFat <= 10)) {
            fat = [data.macros.calories[0] * 0.2 / 9, data.bodyWeight * data.metric.modifier * 0.4];
          // female <= 24 or male <= 17
          } else if ((data.gender.id === 0 && data.bodyFat <= 24) || (data.gender.id === 1 && data.bodyFat <= 17)) {
            fat = [data.macros.calories[0] * 0.25 / 9, data.bodyWeight * data.metric.modifier * 0.4];
          // female > 24 or male > 17
          } else {
            fat = [data.bodyWeight * data.metric.modifier * 0.5, data.bodyWeight * data.metric.modifier * 0.4];
          }
        // fat los percentage
        } else if (data.goal.id === 1) {
          // female <= 16 or male <= 10
          if ((data.gender.id === 0 && data.bodyFat <= 16) || (data.gender.id === 1 && data.bodyFat <= 10)) {
            fat = [data.macros.calories[0] * 0.2 / 9, data.bodyWeight * data.metric.modifier * 0.25];
          // female <= 24 or male <= 17
          } else if ((data.gender.id === 0 && data.bodyFat <= 24) || (data.gender.id === 1 && data.bodyFat <= 17)) {
            fat = [data.macros.calories[0] * 0.25 / 9, data.bodyWeight * data.metric.modifier * 0.25];
          // female > 24 or male > 17
          } else {
            fat = [data.bodyWeight * data.metric.modifier * 0.4, data.bodyWeight * data.metric.modifier * 0.4];
          }
        // muscle gain
        } else if (data.goal.id === 2) {
          // female
          if (data.gender.id === 0) {
            fat = [data.macros.calories[0] * 0.15 / 9, data.bodyWeight * data.metric.modifier * 0.5];
          // male
          } else if (data.gender.id === 1) {
            fat = [data.macros.calories[0] * 0.2 / 9, data.bodyWeight * data.metric.modifier * 0.4];
          }
        }

        return fat;
      }
    };
  });
