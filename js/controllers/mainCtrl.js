/**
 * Created by dor on 17/07/2016.
 */


Mainapp.controller('mainCtrl', ['$scope','$http','contentful', function($scope,$http,contentful) {
    window.scrollTo(0, 0);
$scope.entries=[]

    // Get all entries
   contentful
     .entries('content_type=news&order')
     .then(

       // Success handler
       function(response){
         $scope.entries = response.data.items;
         console.log($scope.entries);
       },

       // Error handler
       function(response){
         console.log('Oops, error ' + response.status);
       }
     );

     contentful
       .entry('5aBrprBtvGcwmm06yC8GSg')
       .then(

         // Success handler
         function(response){
           console.log(response.data);
             $scope.aboutUs = response.data.fields.text;
         },

         // Error handler
         function(response){
           console.log('Oops, error ' + response.status);
         }
       );

    // $http.get("data/mainPage.json")
    //     .then(function(response) {
    //         $scope.aboutUs = response.data.text;
    //
    //     });



}]);
