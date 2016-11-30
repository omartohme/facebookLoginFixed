angular.module('starter.controllers', [])

.controller("LoginController", function ($scope, $localStorage, $state, $cordovaOauth, $location) {
    $scope.loginFacebook = function () {
        $cordovaOauth.facebook("1133142430115727", ["email"]).then(function (result) {
            console.log('my access token: ', result.access_token);
            $localStorage.accessToken = result.access_token;
            $state.go("app.profile");
        }, function (error) {
            alert("There was a problem signing in!  See the console for logs");
            console.log(error);
        });
    };

})

.controller("ProfileController", function ($scope, $http, $localStorage, $location) {
    console.log('my access token $$$$$$$$$:', $localStorage.accessToken);
    $scope.init = function () {
        console.log('*********', "https://graph.facebook.com/v2.8/me?fields=id,name&access_token=" + $localStorage.accessToken);

        $http.get("https://graph.facebook.com/v2.8/me?access_token=" + $localStorage.accessToken).then(function (result) {
                console.log('my result', JSON.stringify(result));
                $scope.profileData = result.data;
            },
            function (error) {
                alert("There was a problem getting your profile.  Check the logs for details.");
                console.log('error', JSON.stringify(error));
            });
    };
    $scope.logout = function () {
        delete $localStorage.accessToken;
        $location.path("/login");
    };
    $scope.init();
});