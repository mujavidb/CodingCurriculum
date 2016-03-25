var app = angular.module('myApp', ['ngRoute', 'ngStorage', 'ui.ace'])
app.config(function($routeProvider){
    $routeProvider
    .when('/story', {
        templateUrl: 'templates/story.html',
        controller: 'StoryController'
    })
    .when('/challenge/1', {
        templateUrl: 'templates/challenge1.html',
        controller: 'ChallengeController'
    })
    .when('/challenge/2', {
        templateUrl: 'templates/challenge2.html',
        controller: 'ChallengeController'
    })
    .when('/challenge/3', {
        templateUrl: 'templates/challenge3.html',
        controller: 'ChallengeController'
    })
	.when('/challenge/4', {
        templateUrl: 'templates/challenge4.html',
        controller: 'ChallengeController'
    })
    .otherwise({
        templateUrl: 'templates/start.html',
        controller: 'StartController'
    })    
});
app.controller('StartController', function($scope, $location, $localStorage){
    $scope.name = "";
    $scope.go = function(){
        $location.path('/story');
        delete $localStorage.name;
        $localStorage.name = $scope.name;
    };
});
app.controller('StoryController', function($scope, $localStorage){
    $scope.$storage = $localStorage;
    $scope.choice = "";
    $scope.setChoice = function(choice){
        $scope.choice = choice;
        console.log($scope.choice, $scope.choice === 'yes', $scope.choice === 'no');
    }
});
app.controller('ChallengeController', function($scope, $localStorage, $location){
    $scope.$storage = $localStorage;
    $scope.continue = false;
    var counter = 0;
    $scope.ch1 = function(){
        var doc = document.getElementById("output");
        var result = doc.textContent;
        if (result == "Good Morning, Investigator Maria!\n" && counter === 0){
            $scope.continue = true;
            doc.innerHTML = doc.innerHTML + "\n---------\nWell Done, Challenge 1 Completed!"
            counter+=1;
        } else if (result == "-6\n" && counter === 1){
            $scope.continue = true;
            doc.innerHTML = doc.innerHTML + "\n---------\nWell Done, Challenge 2 Completed!"
            $location.path('/challenge/2');
            counter = 0;
        } else{
            doc.innerHTML = doc.innerHTML + "\n---------\nTry Again!"
        }
    }
    $scope.ch2 = function(){
        var doc = document.getElementById("output");
        var result = doc.textContent;
        if (result == "['The', 'Bugs', 'are', 'in', 'the', 'System']\n"){
            $scope.continue = true;
            doc.innerHTML = doc.innerHTML + "Well Done, Challenge Completed!"
            $location.path('/challenge/3');
        } else{
            doc.innerHTML = doc.innerHTML + "\n---------\nTry Again!\n"
        }
    }

    $scope.ch3 = function(){
        //FIX: Put correct values inside solution_one and solution_two
        var doc = document.getElementById("output");
        var result = doc.textContent;
        var solution_one = "* \n* * \n* * * \n* * * * \n* * * * * \n* * * * * * \n* * * * * * * \n";
        var solution_two = "*****************\n*               *\n**             **\n****         ****\n*****       *****\n******     ******\n*******   *******\n******** ********\n*******   *******\n******     ******\n*****       *****\n****         ****\n***           ***\n**             **\n*               *\n*****************\n";
        if (result === solution_one && counter === 0){
            $scope.continue = true;
            doc.innerHTML = doc.innerHTML + "\n---------\nWell Done, Challenge 1 Completed!"
			$location.path('/challenge/4');
            //counter+=1;
        } /*else if (result === solution_two && counter === 1){
            $scope.continue = true;
            doc.innerHTML = doc.innerHTML + "\n---------\nWell Done, Challenge 2 Completed!"
            $location.path('/challenge/4');
            counter = 0;
        }*/ else{
			console.log(result, solution_one, result === solution_one );
            doc.innerHTML = doc.innerHTML + "\n---------\nTry Again!"
        }
    }
	$scope.ch4 = function(){
        var doc = document.getElementById("output");
        var result = doc.textContent;
        if (result == "['The', 'Bugs', 'are', 'in', 'the', 'System']\n"){
            $scope.continue = true;
            doc.innerHTML = doc.innerHTML + "Well Done, Challenge Completed!"
            $location.path('/challenge/3');
        } else{
            doc.innerHTML = doc.innerHTML + "\n---------\nTry Again!\n"
        }
    }
});