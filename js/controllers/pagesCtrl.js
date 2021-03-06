/**
 * Created by dor on 28/07/2016.
 */

PagesApp.controller("peopleCtrl", function($scope, $http) {
    window.scrollTo(0, 0);
    $http.get("https://cdn.contentful.com/spaces/07lyy2v445rx/entries?access_token=e3d1f3defe78ec9cedbb5c50563e89f4fee00d093ec4458dbbbeb64679822598&limit=200&content_type=students&order")
        .then(function(response) {
            console.log(response.data.items);
            $scope.assets = {
              PhD: [],
              MSc: [],
              BSc: [],
              Other: []
            };
            response.data.items.forEach(function(item, index){
              if (item.fields.rank  == 'PhD Student'){
                  $scope.assets.PhD.push(item.fields)
              }
              else if  (item.fields.rank  == 'MSc Student'){
                $scope.assets.MSc.push(item.fields)

              }
              else if (item.fields.rank  == 'BSc Student'){
                $scope.assets.BSc.push(item.fields)

              }
              else {
                $scope.assets.Other.push(item.fields)

              }

            });
            $scope.people = {
                PhD: $scope.assets.PhD,
                MSc: $scope.assets.MSc,
                undergraduateStudents: $scope.assets.BSc,
                alumni: $scope.assets.Other
            };

        });
});

PagesApp.controller("teachingCtrl", function($scope, $http) {
    window.scrollTo(0, 0);
    $http.get("https://cdn.contentful.com/spaces/07lyy2v445rx/entries/b9UMbJjtS0mWQ2qI4s0IG?"+API_KEY)
        .then(function(response) {
              $scope.page = response.data.fields;

        });

});

PagesApp.controller("dmbiCtrl", function($scope, $http) {
    window.scrollTo(0, 0);
    $http.get("https://cdn.contentful.com/spaces/07lyy2v445rx/entries/5vsgCKmIowgOogSq6qegge?"+API_KEY)
        .then(function(response) {

            $scope.page = response.data.fields;
            console.log(response.data)

        });

});

PagesApp.controller("projectsCtrl", function($scope, $http, contentful) {
    window.scrollTo(0, 0);
    $scope.projects=[]
    contentful
      .entries('content_type=projects')
      .then(

        // Success handler
        function(response){
          response.data.items.forEach(function(item, index){
              $scope.projects.push(item.fields)
          });
        },

        // Error handler
        function(response){
          console.log('Oops, error ' + response.status);
        }
      );
});

PagesApp.controller("publicationsCtrl", function($scope, $http, filterFilter, $modal, $log) {
    window.scrollTo(0, 0);
    $scope.list = [];
    $scope.fliter_year = function(year) {
        if ($scope.search && $scope.search.name.length > 0) {
            $scope.years_filter_list = $scope.filterList
        } else {

            $scope.years_filter_list = $scope.list
        }
        console.log(year)
        if ($("#" + year).hasClass('crossLine')) {
            $("#" + year).removeClass('crossLine')

            var test = filterFilter($scope.years_filter_list, year);
            $scope.filterList = $scope.filterList.concat(test);
            console.log($scope.filterList)

        } else {
            $(".years_filter").addClass('crossLine')

            $scope.filterList = filterFilter($scope.years_filter_list, year);
        }
        $("#" + year).removeClass('crossLine')

        if (year == "All") {
            if ($scope.search && $scope.search.name.length > 0) {
                var term = $scope.search.name
                var obj = {
                    name: term
                };

                $scope.filterList = filterFilter($scope.list, obj);
                obj = {
                    year: term
                };
                var test = filterFilter($scope.list, obj);
                $scope.filterList = $scope.filterList.concat(test);
                obj = {
                    authors: term
                };
                var test = filterFilter($scope.list, obj);
                $scope.filterList = $scope.filterList.concat(test);
                obj = {
                    publish: term
                };
                var test = filterFilter($scope.list, obj);
                $scope.filterList = $scope.filterList.concat(test);
            } else {
                $scope.filterList = $scope.years_filter_list
            }

            $(".years_filter").removeClass('crossLine')
        }

    }

    $scope.init = function() {
        $http.get("https://cdn.contentful.com/spaces/07lyy2v445rx/entries?access_token=e3d1f3defe78ec9cedbb5c50563e89f4fee00d093ec4458dbbbeb64679822598&limit=200&content_type=publications&order")
            .then(function(response) {
              $scope.list = [];
                response.data.items.forEach(function(item, index){
                    $scope.list.push(item.fields)
                });
                $scope.list.sort(function(a,b) {return (a.year > b.year) ? -1 : ((b.year > a.year) ? 1 : (a.type < b.type) ? -1 : (b.type < a.type) ? 1 : 0);} );

                $scope.showModal = false;
                $scope.toggleModal = function(abstract) {
                    $scope.abstract = abstract;
                    $scope.showModal = !$scope.showModal;
                };

                $scope.pageSize = 6;

                $scope.years = new Set()
                angular.forEach($scope.list, function(publication, index) {
                    $scope.years.add(publication.year)
                });

                $scope.years = Array.from($scope.years)
                $scope.$watch('search.name', function(term) {

                    if ($(".crossLine")[0]) {
                        $scope.search_list = $scope.filterList
                    } else {
                        $scope.search_list = $scope.list
                    }
                    var obj = {
                        name: term
                    };


                    $scope.filterList = filterFilter($scope.search_list, obj);
                    obj = {
                        year: term
                    };
                    var test = filterFilter($scope.search_list, obj);
                    $scope.filterList = $scope.filterList.concat(test);
                    obj = {
                        authors: term
                    };
                    var test = filterFilter($scope.search_list, obj);
                    $scope.filterList = $scope.filterList.concat(test);
                    obj = {
                        publish: term
                    };
                    var test = filterFilter($scope.search_list, obj);
                    $scope.filterList = $scope.filterList.concat(test);

                    $scope.currentPage = 1;
                });
            })
    };

}).filter('start', function() {
    return function(input, start) {
        if (!input || !input.length) {
            return;
        }

        start = +start;
        return input.slice(start);
    };
});


PagesApp.controller("contactCtrl", function($scope, $http) {
    window.scrollTo(0, 0);
});
