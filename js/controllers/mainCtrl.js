/**
 * Created by dor on 17/07/2016.
 */


Mainapp.controller('mainCtrl', ['$scope','$http', function($scope,$http) {
    window.scrollTo(0, 0);
    $scope.shuffle = function(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

          return array;
        }

    $scope.imgarr = $scope.shuffle([1,2,3,4,5,6,7,8,9,10,11])
    $http.get("data/mainPage.json")
        .then(function(response) {
            $scope.aboutUs = response.data.aboutUs;

        });



}]);
