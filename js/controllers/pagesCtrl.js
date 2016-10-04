/**
 * Created by dor on 28/07/2016.
 */

PagesApp.controller("peopleCtrl", function($scope, $http) {
    window.scrollTo(0, 0);
    $http.get("data/people.json")
        .then(function(response) {
            console.log(response.data.items);

            $scope.assets = response.data;
            console.log(response.data);
            $scope.people = {
                PhD: $scope.assets.PhD,
                MSc: $scope.assets.MSc,
                undergraduateStudents: $scope.assets.undergraduateStudents,
                alumni: $scope.assets.alumni
            };

        });
});

PagesApp.controller("teachingCtrl", function($scope, $http) {
    window.scrollTo(0, 0);
    $http.get("data/pages.json")
        .then(function(response) {
            $scope.pages = response.data;
            console.log($scope.pages)
            for (index in $scope.pages) {
                if ($scope.pages[index]._id == "teaching") {
                    $scope.page = $scope.pages[index];
                    break;
                }
            }

        });

});

PagesApp.controller("dmbiCtrl", function($scope, $http) {
    window.scrollTo(0, 0);
    $http.get("data/pages.json")
        .then(function(response) {
            $scope.pages = response.data;
            console.log($scope.pages)
            for (index in $scope.pages) {
                if ($scope.pages[index]._id == "dmbi") {
                    $scope.page = $scope.pages[index];
                    break;
                }
            }

        });

});

PagesApp.controller("projectsCtrl", function($scope, $http) {
    window.scrollTo(0, 0);
    $http.get("data/projects.json")
        .then(function(response) {
            $scope.projects = response.data;
        });
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
        $http.get("data/publications.json")
            .then(function(response) {
                $scope.list = response.data;
                $scope.list.sort(function(a,b) {return (a.year > b.year) ? -1 : ((b.year > a.year) ? 1 : 0);} ); 

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
