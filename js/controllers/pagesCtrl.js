/**
 * Created by dor on 28/07/2016.
 */


PagesApp.controller("peopleCtrl",  function($scope, $http) {



    $http.get("data/people.json")
        .then(function(response) {
            console.log(response.data.items);

            $scope.assets = response.data;
                    console.log(response.data);
                    $scope.people={
                        graduateStudents: $scope.assets.graduateStudents,
                        undergraduateStudents:$scope.assets.undergraduateStudents,
                        alumni:$scope.assets.alumni
                    };




        });




});
PagesApp.controller("teachingCtrl",  function($scope, $http) {


    //
    //$http.get("data/people.json")
    //    .then(function(response) {
    //        console.log(response.data.items);
    //
    //        $scope.assets = response.data;
    //                console.log(response.data);
    //                $scope.people={
    //                    graduateStudents: $scope.assets.graduateStudents,
    //                    undergraduateStudents:$scope.assets.undergraduateStudents,
    //                    alumni:$scope.assets.alumni
    //                };
    //
    //
    //
    //
    //    });




});


PagesApp.controller("projectCtrl",  function($scope, $http) {
    $http.get("data/projects.json")
        .then(function(response) {
            $scope.data = response.data;

        });
});

PagesApp.controller("kobiCtrl",  function($scope, $http) {
    $http.get("https://cdn.contentful.com/spaces/oms6o6p0a1c2/entries?access_token=f4a10de7d79820fd2c5559abb51c928a89e3df67b7ea0955dbb59ff22c9586d9&content_type=kobi")
        .then(function(response) {
            console.log(response.data);
            $scope.kobi = response.data.items[0].fields;

        });

});

PagesApp.controller("dorCtrl", function ($scope, $http) {
    // $http.get("https://cdn.contentful.com/spaces/oms6o6p0a1c2/entries?access_token=f4a10de7d79820fd2c5559abb51c928a89e3df67b7ea0955dbb59ff22c9586d9&content_type=kobi")
    //   .then(function(response) {
    //       console.log(response.data);
    //       $scope.kobi = response.data.items[0].fields;

    //   });
    $('html,body').scrollTop(0);
});

PagesApp.controller("picCtrl",  function($scope, $http) {
    // $http.get("data/projects.json")
    // .then(function(response) {
    //     $scope.data = response.data;

    // });
});


PagesApp.controller("contactCtrl",  function($scope, $http) {
    // $http.get("data/projects.json")
    // .then(function(response) {
    //     $scope.data = response.data;

    // });
});
