(function() {

angular
	.module('coderFriends')
	.controller('MainCtrl', MainCtrl);

function MainCtrl(githubService){

	var vm = this;

	vm.test = 'Welcome Home';

	vm.getFollowing = function() {
		githubService.getFollowing().then(function(res) {
			vm.friends = res.data;
		})
	}
	//vm.getFollowing();
}


})();