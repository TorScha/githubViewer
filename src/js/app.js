(function () {

    'use strict';

    var app = angular.module("githubViewer", []);

    function HomeController($scope, $http) {
        $scope.message = "Welcome to the githubViewer";
        //$scope.username = "angular";
        $scope.sortOrder = "-stargazers_count";

        $scope.changeSortOrder = function(sortOrder) {
          $scope.sortOrder = sortOrder;
        };

        function onSuccess(response) {
            $scope.fetchUserError = undefined;
            $scope.user = response.data;

            $http.get($scope.user.repos_url)
                .then(onRepos, function (error) {
                    $scope.fetchUserError = "Error fetching repos from user" + $scope.user.login +
                            "Status: " + error.status;
                });
        }

        function onRepos(response) {
            $scope.repos = response.data;
            console.log($scope.repos);
        }

        function onError(reason) {
            $scope.user = undefined;
            $scope.fetchUserError = "Error fetching user. Response status: " + reason.status;
        }

        $scope.search = function (username) {
            $http.get("https://api.github.com/users/" + username)
                .then(onSuccess, onError);
        };


    }

    app.controller("HomeController", HomeController);

}());