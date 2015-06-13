'use strict';

/**
 * @ngdoc function
 * @name lgn365App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the lgn365App
 */
angular.module('lgn365App')
  .controller('MainCtrl', function ($scope, $location, dataService) {

    $scope.activities = dataService.getActivities();
    $scope.metrics    = dataService.getMetrics();
    $scope.goals      = dataService.getGoals();

    $scope.maintenanceBase   = 0;
    $scope.maintenanceIntake = [0, 0];
    $scope.macros = {
      protein : [0, 0],
      carbs   : [0, 0],
      fat     : [0, 0],
      calories: [0, 0]
    };

    $scope.$watchGroup(['metric', 'goal', 'activity', 'bodyWeight', 'bodyFat'], updateData);

    function updateData () {
      if (isValidData()) {
        setData();
      } else {
        resetData();
      }
    }

    function setData () {
      $scope.maintenanceIntake = calculateMaintenanceIntake();
      $scope.macros.calories   = calculateCalories();
      $scope.macros.fat        = calculateFat();
      $scope.macros.protein    = calculateProteins();
      $scope.macros.carbs      = calculateCarbs();
    }

    function resetData () {
      $scope.maintenanceIntake = 0;
      $scope.macros.calories   = [0, 0, 0];
      $scope.macros.protein    = [0, 0, 0];
      $scope.macros.fat        = [0, 0, 0];
      $scope.macros.carbs      = [0, 0, 0];
    }

    function isValidData () {
      return angular.isDefined($scope.activity) &&
             angular.isDefined($scope.metric) &&
             angular.isDefined($scope.goal) &&
             angular.isDefined($scope.bodyWeight) &&
             angular.isDefined($scope.bodyFat);
    }


    function calculateMaintenanceIntake () {
      return $scope.metric.modifier * $scope.activity.value * $scope.bodyWeight;
    }


    /**
     * Calculation formulas for calories
     * @return {Array}
     */
    function calculateCalories () {
      var base = $scope.maintenanceIntake,
        calories;

      // without refeed
      if ($scope.goal.id === 0) {
        // female <= 16
        if ($scope.bodyFat <= 16) {
          calories = [base + 100, base - 500];
        // female <= 24
        } else if ($scope.bodyFat <= 24) {
          calories = [base, base - 650];
        // female > 24
        } else {
          calories = [base - 200, base - 600];
        }

      // with refeed
      } else if ($scope.goal.id === 1) {
        calories = [
          base * 0.8,
          base * 0.8 - 150,
          base + 500
        ];

      // Maintenance
      } else if ($scope.goal.id === 2) {
        calories = [base + base * 0.1, base - base * 0.1];
      } else if ($scope.goal.id === 3) {
        calories = [base + base * 0.1, base - base * 0.05];
      }
      return calories;
    }


    function calculateFat () {
      var fat = [0, 0];

      // without refeed
      if (!isRefeed()) {
        // female <= 16
        if ($scope.bodyFat <= 16) {
          fat = [$scope.macros.calories[0] * 0.2 / 9, $scope.bodyWeight * $scope.metric.modifier * 0.4];
        // female <= 24
        } else if ($scope.bodyFat <= 24) {
          fat = [$scope.macros.calories[0] * 0.25 / 9, $scope.bodyWeight * $scope.metric.modifier * 0.4];
        // female > 24
        } else {
          fat = [$scope.bodyWeight * $scope.metric.modifier * 0.5, $scope.bodyWeight * $scope.metric.modifier * 0.4];
        }
      // with refeed
      } else {
        fat = [
          $scope.macros.calories[0] * 0.25 / 9,
          $scope.macros.calories[1] * 0.25 / 9,
          [
            $scope.macros.calories[2] * 0.2 / 9,
            $scope.macros.calories[2] * 0.25 / 9
          ]
        ];
      }

      return fat;
    }


    function calculateProteins () {
      var modifiers = getProteinModifiers();

      return [
        $scope.bodyWeight * $scope.metric.modifier * modifiers[0],
        $scope.bodyWeight * $scope.metric.modifier * modifiers[1],
        $scope.bodyWeight * $scope.metric.modifier * modifiers[2]
      ];
    }

    function calculateCarbs () {
      var carbs = [
        ($scope.macros.calories[0] - $scope.macros.protein[0] * 4 - $scope.macros.fat[0] * 9) / 4,
        ($scope.macros.calories[1] - $scope.macros.protein[1] * 4 - $scope.macros.fat[1] * 9) / 4,
      ];

      if ($scope.goal.id === 1) {
        carbs.push([
            ($scope.macros.calories[2] - $scope.macros.protein[2] * 4 - $scope.macros.fat[2][1] * 9) / 4,
            ($scope.macros.calories[2] - $scope.macros.protein[2] * 4 - $scope.macros.fat[2][0] * 9) / 4
        ]);
      }

      return carbs;
    }

    function getProteinModifiers () {
      var modifiers = [1, 1, 1];

      if ($scope.goal.id === 0 && $scope.bodyFat >= 24) {
        modifiers[1] = 0.9;
      }

      return modifiers;
    }


    function isRefeed () {
      return $scope.goal.id === 1;
    }

  });
