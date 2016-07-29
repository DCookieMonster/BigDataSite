/**
 * Created by dor on 17/07/2016.
 */


Mainapp.controller('mainCtrl', ['$scope','$http', function($scope,$http) {
    $http.get("data/mainPage.json")
        .then(function(response) {
            console.log(response.data);
            $scope.aboutUs = response.data.aboutUs;

        });

}]);