(function() {

angular
	.module('coderFriends')
	.service('githubService', githubService);

function githubService ($http) {

	this.getFollowing = function() {
		return $http.get('/api/github/following');		
	}
}

})();