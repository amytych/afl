'use strict';

/**
 * @ngdoc service
 * @name lgn365App.config
 * @description
 * # config
 * Factory in the lgn365App.
 */
angular.module('lgn365App')
  .factory('config', function () {
    var data = {
      activities: [
        {
          id: 0,
          name: 'Sedentary',
          description: 'little to no exercise, light training (1-2 hours per week), desk job, sitting most of the time, no activity outside of training.',
          value: 12.8
        },
        {
          id: 1,
          name: 'Lightly active',
          description: 'training 2-3 hours per week, light movement during daily activity/office work.',
          value: 13.5
        },
        {
          id: 2,
          name: 'Moderately active',
          description: 'training 3-4 hours per week, mixtures of standing/sitting during work hours.',
          value: 14.4
        },
        {
          id: 3,
          name: 'Active',
          description: 'training 4-5 hours per week, moderate amounts lifting and lots of walking during work hours.',
          value: 15.3
        },
        {
          id: 4,
          name: 'Very active',
          description: 'training 4-5 hours per week, moderate amounts lifting and lots of walking during work hours.',
          value: 16.2
        },
        {
          id: 5,
          name: 'Extremely active',
          description: 'training 5-6 hours per week, strenuous job situation such as construction, landscaping and other manual labor jobs.',
          value: 16.2
        }
      ],

      metrics: [
        {id: 0, name: 'Pounds', modifier: 1},
        {id: 1, name: 'Kilograms', modifier: 2.2}
      ],

      goals: [
        {id: 0, name: 'Fat Loss (absolute)'},
        {id: 1, name: 'Fat Loss (percentage)'},
        {id: 2, name: 'Muscle Gain'}
      ],

      genders: [
        {id: 0, name: 'Female'},
        {id: 1, name: 'Male'}
      ]
    };

    // Public API here
    return {
      getAll: function () {
        return {
             activity: data.activity,
             metric: data.metric,
             goal: data.goal,
             gender: data.gender,
             bodyWeight: data.bodyWeight,
             bodyFat: data.bodyFat,
             maintenanceIntake: data.maintenanceIntake
        };
      },
      get: function (name) {
        return data[name];
      },
      set: function (name, value) {
        data[name] = value;
      }
    };
  });
