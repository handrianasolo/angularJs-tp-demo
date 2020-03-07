var app = angular.module('WebMail', [ 'ngSanitize' ]);
app.controller('WebMailCtrl', function($scope, $location, $filter, $window) {

	$scope.dossiers = [ 
		{ value: 'RECEPTION', label: "Boite de reception", emails: [
			{id: 1, from: 'Abel', to: 'Anna', subject: "Salut", date: new Date(2015, 8, 15, 16, 10), content: "<strong>Salut Anna ca va?</strong>"},
			{id: 2, from: 'Karim', to: 'Abel', subject: "Je pars", date: new Date(2012, 9, 20, 18, 10), content: "<strong>Salut Abel ca va? je pars!</strong>"},
			{id: 3, from: 'Tatum', to: 'Karim', subject: "Vacances", date: new Date(2015, 10, 30, 10, 30), content: "<strong>Salut Karim ca va? bonnes vacances!</strong>"},
			{id: 4, from: 'Shana', to: 'Anna', subject: "Shopping", date: new Date(2011, 2, 15, 20, 10), content: "<strong>Salut Anna ca va? on sort faire du shopping, a+!</strong>"}
		] },

		{ value: 'SPAM', label: "Courrier indesirable", emails: [
			{id: 1, from: 'Hossen', to: 'Anna', subject: "Salut", date: new Date(2015, 5, 30, 17, 10), content: "Salut Anna ca va?je t'aime :*"},
			{id: 2, from: 'Patty', to: 'Abel', subject: "Je pars", date: new Date(2013, 2, 2, 15, 10), content: "Salut Abel ca va? je pars au US today!Bye!"},
			{id: 3, from: 'Tatum', to: 'Patty', subject: "Vacances", date: new Date(2015, 1, 20, 14, 10), content: "Salut Patty ca va? bonnes vacances à tamatave!"}
		] },

		{ value: 'ARCHIVE', label: "Archives", emails: [
			{id: 1, from: 'Elisoa', to: 'Tota', subject: "Examen", date: new Date(2015, 8, 15, 16, 10), content: "Salut Tota ca va? bonne chance pour l'examen!"},
			{id: 2, from: 'Tota', to: 'Amy', subject: "Je pars", date: new Date(2014, 8, 15, 16, 10), content: "Salut Amy ca va? je pars avec toi!a+"}
		] },

		{ value: 'ENVOYE', label: "Envoyes", emails: [
			{id: 1, from: 'Aria', to: 'Emily', subject: "A", date: new Date(2010, 08, 15, 16, 10), content: "Salut Emily je sais qui est A"}
		] }
	];

	//selection dossier de travail
	$scope.dossierCourant = null;
	$scope.emailSelection = null;
		
	$scope.selectionDossier = function(dossier){
		$scope.dossierCourant = dossier;
		$scope.emailSelection = null;
	}
	$scope.selectionEmail = function(email){
		$scope.emailSelection = email;
	}

	// url location
	$scope.versEmail = function(dossier, email){
		$location.path("/" + dossier.value + "/" + email.id);
	}

	//tri 
	$scope.champTri = null;
	$scope.reverse = false;
	$scope.triEmails = function(champ){
		if($scope.champTri == champ){
			$scope.reverse = !$scope.reverse;
		}
		else{
			$scope.champTri = champ;
			$scope.reverse = false;
		}
	}

	// tri avec ordre decroissant ou croissant
	$scope.cssChevronTri = function(champ){
		return {
			glyphicon: $scope.champTri == champ, 
			'glyphicon-chevron-up': $scope.champTri == champ && !$scope.reverse, 
			'glyphicon-chevron-down': $scope.champTri == champ && $scope.reverse
		};
	}

	//crud
	$scope.add = function(){
		$scope.dossierCourant.emails.push($scope.newEmail);
        $scope.newEmail = {};
	}

	$scope.edit = function(id){
		for(var i=0; i<$scope.dossierCourant.emails.length; i++){
			if($scope.dossierCourant.emails[i].id == id){
				$scope.newEmail = angular.copy($scope.dossierCourant.emails[i]);;
			}
		}
	}

	$scope.remove = function(id){
		var index = function getSelectedIndex(id){
			for(var i=0; i<$scope.dossierCourant.emails.length; i++){
				if($scope.dossierCourant.emails[i].id == id){
					return i;
				}
			return -1;
		}
	}
		$scope.dossierCourant.emails.splice(index, 1);
		$scope.newEmail = {};
	}

	$scope.save = function () {
		var empid = 1;
        if ($scope.newEmail.id == null) {
            $scope.newEmail.id = empid++;
            $scope.newEmail.push($scope.newEmail);
        } else {
            for (i in $scope.dossierCourant.emails) {
                if ($scope.dossierCourant.emails[i].id == $scope.newEmail.id) {
                    $scope.dossierCourant.emails[i] = $scope.newEmail;
                }
            }
        }
        $scope.newEmail = {};
		$window.location.path("/" + dossier.value + "/" + email.id);
    }

    //$scope.getDossiersFiltre = function(){
    	//return $filter("filter")($scope.dossierCourant.emails, $scope.recherche);
    //}

    //chemin dossier
    $scope.$watch(function(){
    	   return $location.path();
    }, function(newPath){
    	var tabPath = newPath.split("/");
    	if(tabPath.length>1){
    		var valDossier = tabPath[1];
    		$scope.dossiers.forEach(function(item){
    			if(item.value == valDossier){
    				$scope.selectionDossier(item);
    			}
    		});
    		if(tabPath.length>2){
    			var idMail = tabPath[2];
    			$scope.dossierCourant.emails.forEach(function(item){
    				if(item.id == idMail){
    					$scope.selectionEmail(item);
    				}
    			});
    		}
    	}
    });
});