PagesApp.controller("searchCtrl",  function($scope, $http) {
  window.scrollTo(0, 0);
     $http.get("data/people.json")
     .then(function(response) {
         $scope.people = response.data;

     });

    $http.get("data/pages.json")
        .then(function(response) {
          console.log(response)
            $scope.pages = response.data;
        });

        $http.get("data/projects.json")
            .then(function(response) {
              console.log(response)
                $scope.projects = response.data;
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
        if (input.size == 0 || input == ""){
          return;
        }
    		angular.forEach($scope.people.graduateStudents,  function(person, index){
                if ($scope.search_in_people(person,input.toLowerCase())) {
                    $scope.search_people.push(person)
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
