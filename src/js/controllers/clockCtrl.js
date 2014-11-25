'use strict';

app.controller('ClockCtrl', function($scope, $location, ngDialog, ClockService) {
	$scope.defaultClock;
	$scope.hour = 0;
	$scope.minute = 0;
	$scope.getHour;
	$scope.getMinute;
	$scope.hourday = '';

	var stage = new Kinetic.Stage({
		container: 'clock',
		width: 440,
		height: 456
	});

	var game = new Kinetic.Layer();

	//Jeu
	$scope.game = function(){
		ngDialog.close();
		$scope.random();
		$scope.Defaultclock();
		imgclock.src='../src/img/'+$scope.defaultClock+'.png';
		firstHand.src = '../src/img/firstHand.png';
		secondHand.src = '../src/img/secondHand.png';
	}


	//Gestion du choix de l'horloge
	$scope.Defaultclock = function(){
		if(typeof ClockService.getClock() === "undefined"){
			$scope.defaultClock="clock1";
		}else{
			$scope.defaultClock=ClockService.getClock();
		}
	};

	//Gestion de l'aleatoire
	$scope.random = function(){
		$scope.getHour = Math.floor(Math.random() * (12 - 1 + 1)) + 1;
		$scope.getMinute = Math.floor(Math.random() * (12 - 1 + 1)) + 1;
		$scope.hourday = ($scope.getHour < 12) ? 'Matin' : 'Après-Midi';
	}

	//Affichage de l'horloge
	var imgclock = new Image();
	imgclock.onload = function() {
		var clock = new Kinetic.Image({
			x: 0,
			y: 0,
			image: imgclock,
			width: 440,
			height: 445
		});

		game.add(clock);
		stage.add(game);

	};
	

	//Affichage des minutes
	var firstHand = new Image();
	firstHand.onload = function () {
        var hours = new Kinetic.Image({
           image: firstHand,
           x: 220,
           y: 215,
           width: 6,
           height: 120,
           offsetX: 3
       });
       hours.rotate(180 + 30 * $scope.getMinute)
           .currentRotation = 0;
       game.add(hours);
       stage.add(game);
   	};
	

	//Affichage de l'heure
	var secondHand = new Image();
	secondHand.onload = function () {
       var minute = new Kinetic.Image({
           image: secondHand,
           x: 220,
           y: 210,
           width: 6,
           height: 80,
           offsetX: 3
       });
       minute.rotate(180+30*$scope.getHour)//entre 0 et 12
           .currentRotation = 0;
       game.add(minute);
       stage.add(game);
   	};
	
	
	//Incrementation
	$scope.up = function(type){
		if(type === 'hour'){$scope.hour+=1;}
		else{$scope.minute+=5;}
		
	};

	//Décrementation
	$scope.down = function(type){
		if(type === 'hour'){$scope.hour-=1;}
		else{$scope.minute-=5;}
	};

	//Redirection
	$scope.goTo = function(view){
		ngDialog.close();
		$location.url(view);
	}

	//Vérification
	$scope.check = function(hour,min){
		if (hour === $scope.getHour && min === $scope.getMinute*5) {
			ngDialog.open({
			    template: 'partials/success.html',
			    className: 'ngdialog-theme-plain',
			    showClose: true,
			});
		}else{
			ngDialog.open({
			   template: "partials/fail.html",
			   showClose: true,
			   className: 'ngdialog-theme-plain'
			});
		};
	};

	$scope.game();
});

app.controller('OptionsCtrl', function($scope, ClockService) {
	$scope.clock = function(typeClock){
		ClockService.clock(typeClock);
		console.log(typeClock);
	};
});