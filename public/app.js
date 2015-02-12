(function() {

angular
	.module('coderFriends', ['ngRoute'])
	.config(config)
	.factory('myHttpInterceptor', myHttpInterceptor);

function config($routeProvider, $httpProvider) {
	$routeProvider
		.when('/', {
			templateUrl: '/index.html'
		})
		.when('/home', {
			templateUrl: 'templates/home.html',
			controller: 'MainCtrl',
			controllerAs: 'vm'
		})
		.when('/friend/:github_username', {
			templateUrl: 'templates/friend.html',
			controller: 'MainCtrl',
			controllerAs: 'vm'
		})
		.otherwise('/');


	$httpProvider.defaults.headers.common[
	'X-Requested-With'] = 'XMLHttpRequest';
	$httpProvider.interceptors.push('myHttpInterceptor');

}

function myHttpInterceptor($q) {
	return {
		//optional method
		'responseError': function(rejection) {
			if (rejection.status == 403) {
				document.location = '/';
				return;
			}
			return $q.reject(rejection);
		}
	};
};

})();