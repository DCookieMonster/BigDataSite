PagesApp.controller("searchCtrl",  function($scope, $http) {
  window.scrollTo(0, 0);
     $http.get("https://cdn.contentful.com/spaces/07lyy2v445rx/entries?access_token=e3d1f3defe78ec9cedbb5c50563e89f4fee00d093ec4458dbbbeb64679822598&limit=200&content_type=students&order")
     .then(function(response) {
       $scope.people = {
         PhD: [],
         MSc: [],
         BSc: [],
         Other: []
       };
       response.data.items.forEach(function(item, index){
         if (item.fields.rank  == 'PhD Student'){
             $scope.people.PhD.push(item.fields)
         }
         else if  (item.fields.rank  == 'MSc Student'){
           $scope.people.MSc.push(item.fields)

         }
         else if (item.fields.rank  == 'BSc Student'){
           $scope.people.BSc.push(item.fields)

         }
         else {
           $scope.people.Other.push(item.fields)

         }

       });


     });

    $http.get("data/pages.json")
        .then(function(response) {
          console.log(response)
            $scope.pages = response.data;
        });

        $http.get("https://cdn.contentful.com/spaces/07lyy2v445rx/entries?access_token=e3d1f3defe78ec9cedbb5c50563e89f4fee00d093ec4458dbbbeb64679822598&limit=200&content_type=projects&order")
            .then(function(response) {
              console.log(response)
              $scope.projects = [];
                response.data.items.forEach(function(item, index){
                    $scope.projects.push(item.fields)
                });            });

            $http.get("https://cdn.contentful.com/spaces/07lyy2v445rx/entries?access_token=e3d1f3defe78ec9cedbb5c50563e89f4fee00d093ec4458dbbbeb64679822598&limit=200&content_type=publications&order")
                .then(function(response) {
                  console.log(response)
                    $scope.publications = [];
                    response.data.items.forEach(function(item, index){
                       $scope.publications.push(item.fields)
                    });
                });


    $scope.search_in_people = function(person,value){
    	if (person.firstName.toLowerCase().indexOf(value) > -1 ||
    		person.lastName.toLowerCase().indexOf(value) > -1 ||
    		person.title.toLowerCase().indexOf(value) > -1 )
    	{
    		return true;
    	}
    	return false;
    };

    $scope.search_in_projects = function(project,value){
      if (project.name.toLowerCase().indexOf(value) > -1 ||
        project.supervisors.toLowerCase().indexOf(value) > -1 ||
        project.people_on_the_project.toLowerCase().indexOf(value) > -1 )
      {
        return true;
      }
      return false;
    };

    $scope.search_in_publications = function(publication,value){
      if (     publication.year == value ||
          publication.authors.toLowerCase().indexOf(value) > -1 ||
            publication.publish.toLowerCase().indexOf(value) > -1 ||
        publication.name.toLowerCase().indexOf(value) > -1 )
      {
        return true;
      }
      return false;
    };

    $scope.search_in_pages = function(page,value){
      if (page.page_name.toLowerCase().indexOf(value) > -1 ||
        page.text.toLowerCase().indexOf(value) > -1)

      {
        return true;
      }
      return false;
    };

    //strip HTML tag and return regular text
    $scope.strip = function(html)
    {
       var tmp = document.createElement("DIV");
       tmp.innerHTML = html;
       return tmp.textContent||tmp.innerText;
    }


    $scope.search = function(input){
        $scope.search_pages = [];
        $scope.search_projects = [];
    		$scope.search_people = [];
        $scope.search_publications = [];

        if (input.size == 0 || input == ""){
          return;
        }
    		angular.forEach($scope.people.PhD,  function(person, index){
                if ($scope.search_in_people(person,input.toLowerCase())) {
                    $scope.search_people.push(person)
                }
            });

            angular.forEach($scope.people.MSc,  function(person, index){
                    if ($scope.search_in_people(person,input.toLowerCase())) {
                        $scope.search_people.push(person)
                    }
                });
                angular.forEach($scope.publications,  function(publication, index){
                        if ($scope.search_in_publications(publication,input.toLowerCase())) {
                            $scope.search_publications.push(publication)
                        }
                    });
            angular.forEach($scope.projects,  function(project, index){
                    if ($scope.search_in_projects(project,input.toLowerCase())) {
                        $scope.search_projects.push(project)
                    }
                });
          angular.forEach($scope.pages,  function(page, index){
                    if ($scope.search_in_pages(page,input.toLowerCase())) {
                      page.description = $scope.strip(page.text).substring(0,500)+"..."
                      $scope.search_pages.push(page)
                    }
                });

    }
});
