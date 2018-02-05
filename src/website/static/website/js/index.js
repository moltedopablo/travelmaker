var app = angular.module('travelmaker', []);
app.controller('main_controller', function($scope, $http) {
    $http.get('api/activity_list').
        then(function(response) {
            $scope.activities = response.data;
        });
});