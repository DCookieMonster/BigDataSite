/**
 * Created by dor on 28/07/2016.
 */


PagesApp.controller("peopleCtrl",  function($scope, $http) {

    $http.get("https://cdn.contentful.com/spaces/oms6o6p0a1c2/entries?access_token=f4a10de7d79820fd2c5559abb51c928a89e3df67b7ea0955dbb59ff22c9586d9&content_type=kobi")
        .then(function(response) {
            console.log(response.data);
            $scope.aboutKobi = response.data.items[0].fields.shortAboutKobi;

        });

    $http.get("https://cdn.contentful.com/spaces/oms6o6p0a1c2/assets?access_token=f4a10de7d79820fd2c5559abb51c928a89e3df67b7ea0955dbb59ff22c9586d9")
        .then(function(response) {
            console.log(response.data.items);

            $scope.assets = response.data.items;
            $http.get("https://cdn.contentful.com/spaces/oms6o6p0a1c2/entries?access_token=f4a10de7d79820fd2c5559abb51c928a89e3df67b7ea0955dbb59ff22c9586d9&content_type=people&order")
                .then(function(response) {
                    console.log(response.data.items);
                    $scope.people={
                        graduateStudents:[],
                        undergraduateStudents:[],
                        alumni:[]
                    };
                    response.data.items.forEach(function(item, index){
                        var imgSrcId=item.fields.imgsrc.sys.id;
                        var person=item.fields;
                        $scope.assets.forEach(function(it,i){
                            if (imgSrcId==it.sys.id){
                                person["img"]="http:"+it.fields.file.url;
                            }
                        })
                        if (person.student=="Alumni"){
                            $scope.people.alumni.push(person)

                        }
                        if (person.student=="Undergraduate students"){
                            $scope.people.undergraduateStudents.push(person)

                        }
                        if (person.student=="Graduate students"){
                            $scope.people.graduateStudents.push(person)

                        }
                    })
                    // $scope.data = response.data.items;

                });

        });



    $http.get("data/people.json")
        .then(function(response) {
            $scope.data = response.data;

        });
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
