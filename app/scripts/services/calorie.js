'use strict';

/**
 * @ngdoc service
 * @name lgn365App.calorie
 * @description
 * # calorie
 * Factory in the lgn365App.
 */
angular.module('lgn365App')
  .factory('calorie', function (config) {

    // Public API here
    return {
      calculateMaintenanceIntake: function () {
        var metric = config.get('metric'),
          activity = config.get('activity'),
          bodyWeight = config.get('bodyWeight');

        return metric.modifier * activity.value * bodyWeight;
      },

      calculate: function () {
        var data = config.getAll(),
          calories = [data.maintenanceIntake, data.maintenanceIntake];

        // fat los absolute
        if (data.goal.id === 0) {
          // female <= 16 or male <= 10
          if ((data.gender.id === 0 && data.bodyFat <= 16) || (data.gender.id === 1 && data.bodyFat <= 10)) {
            calories = [calories[0] + 100, calories[1] - 500];
          // female <= 24 or male <= 17
          } else if ((data.gender.id === 0 && data.bodyFat <= 24) || (data.gender.id === 1 && data.bodyFat <= 17)) {
            calories = [calories[0], calories[1] - 650];
          // female > 24 or male > 17
          } else {
            calories = [calories[0] - 200, calories[1] - 600];
          }
        // fat los percentage
        } else if (data.goal.id === 1) {
          // female <= 16 or male <= 10
          if ((data.gender.id === 0 && data.bodyFat <= 16) || (data.gender.id === 1 && data.bodyFat <= 10)) {
            calories = [calories[0] * 1.1, calories[1] * 0.7];
          // female <= 24 or male <= 17
          } else if ((data.gender.id === 0 && data.bodyFat <= 24) || (data.gender.id === 1 && data.bodyFat <= 17)) {
            calories = [calories[0], calories[1] * 0.65];
          // female > 24 or male > 17
          } else {
            calories = [calories[0] - 200, calories[1] * 0.65];
          }
        // muscle gain
        } else if (data.goal.id === 2) {
          // female
          if (data.gender.id === 0) {
            calories = [calories[0] + 300, calories[1] - 100];
          // male
          } else if (data.gender.id === 1) {
            calories = [calories[0] * 1.2, calories[1] * 0.95];
          }
        }

        return calories;
      }
    };
  });
