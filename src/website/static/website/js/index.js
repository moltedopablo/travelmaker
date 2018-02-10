var app = angular.module('travelmaker', []);
app.controller('main_controller', function ($scope, $http) {

	$scope.current_trip = null;

	$http.get('api/trips').then(function (response) {
        $scope.trips = response.data;
        $scope.current_trip = $scope.trips[0];
    });



	$scope.$watch('current_trip', function () {
		console.log($scope.current_trip);
		if($scope.current_trip !== null){
			$http.get('api/activity_list?trip=' + $scope.current_trip.id).then(function (response) {
				$scope.activities = response.data;
			});
		}
    });

	$scope.change_current_trip = function (trip) {
		$scope.current_trip = trip;
    };



});

$('.ui.accordion')
    .accordion()
;

	var mymap = L.map('mapid').setView([51.505, -0.09], 13);

	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
			'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="http://mapbox.com">Mapbox</a>',
		id: 'mapbox.streets'
	}).addTo(mymap);

