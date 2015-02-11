(function() {

angular
	.module('coderFriends', ['ngRoute'])
	.config(config)
	.factory('myHttpInterceptor', myHttpInterceptor);

function config($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: '/index.html'
		})
		.when('/home', {
			templateUrl: '/templates/home.html',
			controller: 'MainCtrl',
			controllerAs: 'vm'
		})
		.when('friend/:github_username', {
			templateUrl: '/templates/friend.html',
			controller: 'MainCtrl',
			controllerAs: 'vm'
		})
		.otherwise('/');
}

function myHttpInterceptor() {

}

})