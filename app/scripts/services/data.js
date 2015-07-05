angular.module("lgn365App").service("dataService", function() {
    this.getActivities = function() {
        return [{
            id: 0,
            name: "Lightly active",
            description: "training 2-3 hours per week, light movement during daily activity/office work."
        }, {
            id: 1,
            name: "Moderately active",
            description: "training 3-4 hours per week, mixtures of standing/sitting during work hours."
        }, {
            id: 2,
            name: "Active",
            description: "training 4-5 hours per week, moderate amounts lifting and lots of walking during work hours."
        }, {
            id: 3,
            name: "Very active",
            description: "training 4-5 hours per week, moderate amounts lifting and lots of walking during work hours."
        }, {
            id: 4,
            name: "Extremely active",
            description: "training 5-6 hours per week, strenuous job situation such as construction, landscaping and other manual labor jobs."
        }]
    }, this.getActivityValues = function(a) {
        return 15 >= a ?
                    [14.5, 15.5, 16.5, 17.5, 18.5] :
                    24 >= a ? [14, 15, 16, 17, 18] : [13.5, 14.5, 15.5, 16.5, 17.5];
    }, this.getMetrics = function() {
        return [{
            id: 0,
            name: "Pounds",
            modifier: 1
        }, {
            id: 1,
            name: "Kilograms",
            modifier: 2.2
        }]
    }, this.getGoals = function() {
        return [{
            id: 0,
            name: "Staggered With No Weekly Refeed"
        }, {
            id: 1,
            name: "Staggered With Weekly Refeed"
        }, {
            id: 2,
            name: "Maintenance"
        }, {
            id: 3,
            name: "Recomposition"
        }]
    }
});
