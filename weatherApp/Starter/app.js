//module
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

//routes
weatherApp.config(function ($routeProvider) {
	$routeProvider 
		.when('/forecast', {
		templateUrl: 'pages/forecast.html',
		controller: 'forecastController'
		})
	
		.when('/', {
		templateUrl: 'pages/home.html',
		controller: 'homeController'
	})
});


//services
weatherApp.service('cityService', function() {
	this.city = "New York, NY";
	
});

//controller
weatherApp.controller('homeController', ['$scope', 'cityService', function($scope, cityService) {
	
	$scope.city = cityService.city;
	$scope.$watch('city', function() {
		cityService.city = $scope.city;
	});

}]);


weatherApp.controller('forecastController', ['$scope', '$resource', 'cityService', function($scope, $resource, cityService) {
	$scope.city = cityService.city;
//	$scope.$watch('city', function() {
//		cityService.city = $scope.city;
	
//	http://api.openweathermap.org/data/2.5/forecast/daily?APPID=YOURAPIKEY
	
	$scope.weatherAPI = 
		$resource("http://api.openweathermap.org/data/2.5/forecast/daily?APPID=43be971539236e44b50a19eeebb39b95", {
	callback: "JSON_CALLBACK" }, { get: { method: "JSONP" }});
	
	$scope.weatherResult = $scope.weatherAPI.get({ $scope.city, cnt: 2});
	
	console.log($scope.weatherResult);

}]);

