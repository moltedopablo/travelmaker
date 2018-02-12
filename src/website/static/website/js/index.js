var app = angular.module('travelmaker', []);
app.controller('main_controller', function ($scope, $http) {

    $scope.current_trip = null;
    $scope.current_itinerary = null;

    $http.get('api/trips').then(function (response) {
        $scope.trips = response.data;
        if (response.data.length > 0) {
            $scope.current_trip = $scope.trips[0];
        } else {
            $scope.current_trip = null;
        }
    });


    $scope.$watch('current_trip', function () {
        if ($scope.current_trip !== null) {
            $http.get('api/activities?trip=' + $scope.current_trip.id).then(function (response) {
                $scope.activities = response.data;
            });

            $http.get('api/itineraries?trip=' + $scope.current_trip.id).then(function (response) {
                $scope.itineraries = response.data;
                if (response.data.length > 0) {
                    $scope.current_itinerary = $scope.itineraries[0];
                } else {
                    $scope.current_itinerary = null;
                }
            });
        }
    });


    // $scope.$watch('current_itinerary', function () {
    //     if ($scope.current_trip !== null) {
    //         $http.get('api/activitie?trip=' + $scope.current_trip.id).then(function (response) {
    //             $scope.activities = response.data;
    //         });
    //
    //         $http.get('api/itinerary_list?trip=' + $scope.current_trip.id).then(function (response) {
    //             $scope.itineraries = response.data;
    //             $scope.current_itinerary = $scope.itineraries[0];
    //         });
    //     }
    // });

    $scope.change_current_trip = function (trip) {
        $scope.current_trip = trip;
    };

    $scope.change_current_itinerary = function (itinerary) {
        $scope.current_itinerary = itinerary;
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

