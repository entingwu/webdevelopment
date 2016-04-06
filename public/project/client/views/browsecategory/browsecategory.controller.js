(function() {
    "use strict";
    angular
        .module("MusicPlayerApp")
        .controller('BrowseCategoryController', function($scope, API, $routeParams, Auth) {
        $scope.categoryname = '';

        API.getBrowseCategory($routeParams.categoryid).then(function(result) {
            $scope.categoryname = result.name;
        });
        API.getBrowseCategoryPlaylists($routeParams.categoryid, Auth.getUserCountry()).then(function(results) {
            $scope.playlists = results.playlists.items;
        });
    });

})();
