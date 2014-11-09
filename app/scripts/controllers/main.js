'use strict';

/**
 * @ngdoc function
 * @name lgn365App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the lgn365App
 */
angular.module('lgn365App')
  .controller('MainCtrl', function ($scope, $location) {
    // var hash = parseHash();
    var hash = {};

    $scope.activities = [
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
    ];
    $scope.activity = $scope.activities[hash.a || undefined];

    $scope.metrics = [
      {id: 0, name: 'Pounds', modifier: 1},
      {id: 1, name: 'Kilograms', modifier: 2.2}
    ];
    $scope.metric = $scope.metrics[hash.m || undefined];

    $scope.goals = [
      {id: 0, name: 'Staggered With No Weekly Refeed'},
      {id: 1, name: 'Staggered With Weekly Refeed'}
    ];
    $scope.goal = $scope.goals[hash.g || undefined];

    $scope.genders = [
      {id: 0, name: 'Female'},
      {id: 1, name: 'Male'}
    ];
    $scope.gender = $scope.genders[hash.s || undefined];

    $scope.bodyWeight = parseInt(hash.w, 10) || undefined;
    $scope.bodyFat = parseInt(hash.f, 10) || undefined;

    $scope.maintenanceIntake = 0;
    $scope.macros = {
      protein: [0, 0],
      carbs: [0, 0],
      fat: [0, 0],
      calories: [0, 0]
    };

    $scope.updateData = function () {
      if (isValidData()) {
        setData();
      } else {
        resetData();
      }
      // updateHash();
    };

    function setData () {
      $scope.maintenanceIntake = calculateMaintenanceIntake();
      $scope.macros.calories = calculateCalories();
      $scope.macros.fat = calculateFat();
      $scope.macros.protein = calculateProteins();
      $scope.macros.carbs = calculateCarbs();
    }

    function resetData () {
      $scope.maintenanceIntake = 0;
      $scope.macros.calories = [0, 0, 0];
      $scope.macros.protein = [0, 0, 0];
      $scope.macros.fat = [0, 0, 0];
      $scope.macros.carbs = [0, 0, 0];
    }

    function isValidData () {
      return angular.isDefined($scope.activity) &&
             angular.isDefined($scope.metric) &&
             angular.isDefined($scope.goal) &&
             angular.isDefined($scope.gender) &&
             angular.isDefined($scope.bodyWeight) &&
             angular.isDefined($scope.bodyFat);
    }

    function calculateMaintenanceIntake () {
      var intake = $scope.metric.modifier * $scope.activity.value * $scope.bodyWeight;
      return $scope.goal === 0 ? intake : intake - intake * .2;
    }

    /**
     * Calculation formulas for calories
     * @return {Array}
     */
    function calculateCalories () {
      var calories = [$scope.maintenanceIntake, $scope.maintenanceIntake];

      // without refeed
      if ($scope.goal.id === 0) {
        // female <= 16 or male <= 10
        if (($scope.gender.id === 0 && $scope.bodyFat <= 16) || ($scope.gender.id === 1 && $scope.bodyFat <= 10)) {
          calories = [calories[0] + 100, calories[1] - 500];
        // female <= 24 or male <= 17
        } else if (($scope.gender.id === 0 && $scope.bodyFat <= 24) || ($scope.gender.id === 1 && $scope.bodyFat <= 17)) {
          calories = [calories[0], calories[1] - 650];
        // female > 24 or male > 17
        } else {
          calories = [calories[0] - 200, calories[1] - 600];
        }
      // fat los percentage
      } else if ($scope.goal.id === 1) {
        calories = [calories[0], calories[0] - 150, $scope.metric.modifier * ($scope.activity.value + 6) * $scope.bodyWeight];
        // // female <= 16 or male <= 10
        // if (($scope.gender.id === 0 && $scope.bodyFat <= 16) || ($scope.gender.id === 1 && $scope.bodyFat <= 10)) {
        //   calories = [calories[0] * 1.1, calories[1] * 0.7];
        // // female <= 24 or male <= 17
        // } else if (($scope.gender.id === 0 && $scope.bodyFat <= 24) || ($scope.gender.id === 1 && $scope.bodyFat <= 17)) {
        //   calories = [calories[0], calories[1] * 0.65];
        // // female > 24 or male > 17
        // } else {
        //   calories = [calories[0] - 200, calories[1] * 0.65];
        // }
      }
      return calories;
    }


    function calculateFat () {
      var fat = [0, 0];

      // without refeed
      if ($scope.goal.id === 0) {
        // female <= 16 or male <= 10
        if (($scope.gender.id === 0 && $scope.bodyFat <= 16) || ($scope.gender.id === 1 && $scope.bodyFat <= 10)) {
          fat = [$scope.macros.calories[0] * 0.2 / 9, $scope.bodyWeight * $scope.metric.modifier * 0.4];
        // female <= 24 or male <= 17
        } else if (($scope.gender.id === 0 && $scope.bodyFat <= 24) || ($scope.gender.id === 1 && $scope.bodyFat <= 17)) {
          fat = [$scope.macros.calories[0] * 0.25 / 9, $scope.bodyWeight * $scope.metric.modifier * 0.4];
        // female > 24 or male > 17
        } else {
          fat = [$scope.bodyWeight * $scope.metric.modifier * 0.5, $scope.bodyWeight * $scope.metric.modifier * 0.4];
        }
      // with refeed
      } else if ($scope.goal.id === 1) {
        fat = [$scope.macros.calories[0] * 0.25 / 9, $scope.macros.calories[0] * 0.25 / 9, $scope.macros.calories[0] * 0.25 / 9];
        // // female <= 16 or male <= 10
        // if (($scope.gender.id === 0 && $scope.bodyFat <= 16) || ($scope.gender.id === 1 && $scope.bodyFat <= 10)) {
        //   fat = [$scope.macros.calories[0] * 0.2 / 9, $scope.bodyWeight * $scope.metric.modifier * 0.25];
        // // female <= 24 or male <= 17
        // } else if (($scope.gender.id === 0 && $scope.bodyFat <= 24) || ($scope.gender.id === 1 && $scope.bodyFat <= 17)) {
        //   fat = [$scope.macros.calories[0] * 0.25 / 9, $scope.bodyWeight * $scope.metric.modifier * 0.25];
        // // female > 24 or male > 17
        // } else {
        //   fat = [$scope.bodyWeight * $scope.metric.modifier * 0.4, $scope.bodyWeight * $scope.metric.modifier * 0.4];
        // }
      }

      return fat;
    }


    function calculateProteins () {
      var p = $scope.bodyWeight * $scope.metric.modifier;
      return [p, p, p];
    }

    function calculateCarbs () {
      return [
        ($scope.macros.calories[0] - $scope.macros.protein[0] * 4 - $scope.macros.fat[0] * 9) / 4,
        ($scope.macros.calories[1] - $scope.macros.protein[1] * 4 - $scope.macros.fat[1] * 9) / 4,
        ($scope.macros.calories[2] - $scope.macros.protein[2] * 4 - $scope.macros.fat[2] * 9) / 4
      ];
    }

    function updateHash () {
      $location.hash('a=' + $scope.activity.id +
                    '/m=' + $scope.metric.id +
                    '/g=' + $scope.goal.id +
                    '/s=' + $scope.gender.id +
                    '/w=' + $scope.bodyWeight +
                    '/f=' + $scope.bodyFat);
    }

    function parseHash () {
      console.log($location.hash());
      var values = $location.hash().split('/'),
        hash = {},
        pair;
      for (var i = values.length - 1; i >= 0; i--) {
        pair = values[i].split('=');
        hash[pair[0]] = pair[1];
      }
      return hash;
    }
  });
