  var config = {
    apiKey: "AIzaSyB1WeSpzG_QY1bbJ1YvKEjcorbXq-761n0",
    authDomain: "rpsmulti.firebaseapp.com",
    databaseURL: "https://rpsmulti.firebaseio.com",
    storageBucket: "rpsmulti.appspot.com",
  };
  firebase.initializeApp(config);

  var db = firebase.database();
  var p1db;
  var p2db;
  var p1Wins;
  var p1Loses;
  var ties;
  var p2Wins;
  var p2loses;
  $("#p1").on('click', function(){
  	$('#p1choice').show();
  	$('.start').hide();
  	$('#p1Results').show();
  });

  $('.p1choices').on('click', function(){
  	var p1 = $(this).attr('value');
  	p1db = p1;
  	console.log(p1)
  	db.ref().update({
  		player1: p1,
  	})
  	gameRun();
  	return false; 

  });

 $("#p2").on('click', function(){
  	$('#p2choice').show();
  	$('.start').hide();
  	$('#p2Results').show();
  });
  $('.p2choices').on('click', function(){
  	var p2 = $(this).attr('value');
  	console.log(p2)
  	db.ref().update({
  		player2: p2,
  	})
  	return false; 
  	gameRun();

  });

 

db.ref().on('value', function(snapshot){
	var gameChoices = snapshot.val();
	 p2db = gameChoices.player2;
	 p1db = gameChoices.player1;
	 p1Wins = gameChoices.player1Wins;
	 p1Loses = gameChoices.player1Loses;
	 p2Wins = gameChoices.player2Wins;
	 p2loses = gameChoices.player2Loses;
	 ties = gameChoices.ties;
	console.log(gameChoices)
	console.log(p1db);
	console.log(p2db);
	gameRun();
	$('#ties').text(ties);
	$('#p1Wins').text(p1Wins);
	$('#p2Loses').text(p2loses);
	$('#p2Wins').text(p2Wins);
	$('#p1Loses').text(p1Loses);
});

 function gameRun() {
  			if(p1db === p2db && p1db != "notChosen" && p2db != "notChosen") {
  				$("#results").text("its a tie");
  				ties++; 
  				db.ref().update({
  					ties: ties,
  				});
  				$('#ties').text(ties);
  				p2db = "notChosen";
  	p1db = "notChosen";
  	db.ref().update({
  		player2: p2db,
  	});
  	db.ref().update({
  		player1: p1db,
  	});
  				
  				
  			} else if(p1db === "rock" && p2db === "scissors"){
	  			$("#results").text("Player 1 wins rock beats scissors");
	  			player1Wins();
	  			
	  		} else if (p1db === "rock" && p2db === "paper") {
	  			$("#results").text("Player 2 wins paper beats rock");
	  			play2wins();
	  			
	  		} else if(p1db === "paper" && p2db === "rock"){
	  			$("#results").text("Player 1 wins paper beats rock");
	  			player1Wins();
	  			
	  		} else if (p1db === "paper" && p2db === "scissors") {
	  			$("#results").text("Player 2 wins scissors beats paper");
	  			play2wins();
	  			
	  		} else if(p1db === "scissors" && p2db === "paper"){
	  			$("#results").text("Player 1 wins scissors beats paper");
	  			player1Wins();
	  			
	  		} else if(p1db === "scissors" && p2db === "rock") {
	  			$("#results").text("Player 2 wins rock beats scissors");
	  			play2wins();
	  			
	  		} else {
	  			$("#results").text("other player hasn't chosen yet");
	  		}
  }

function play1wins () {
	  p1Wins++;
	  p2loses++;
	  db.ref().update({
  		player1Wins: p1Wins,
  		player2Loses: p2loses,
  	});
	$('#p1Wins').text(p1Wins);
	$('#p2Loses').text(p2Loses);
}
function play2wins () {
	  p2Wins++;
	  p1Loses++;
	  db.ref().update({
  		player2Wins: p2Wins,
  		player1Loses: p1Loses,
  	});
	$('#p2Wins').text(p2Wins);
	$('#p1Loses').text(p1Loses);
}

 $('#reset').on('click', function(){
  	p2db = "notChosen";
  	p1db = "notChosen";
  	db.ref().update({
  		player2: p2db,
  	});
  	db.ref().update({
  		player1: p1db,
  	});
  });
 $('#resetScore').on('click', function(){
  	p1Wins = 0;
  	p1Loses = 0;
  	p2Wins = 0;
  	p2loses = 0;
  	ties = 0;
  	db.ref().update({
  		player1Wins: p1Wins,
  		player1Loses: p1Loses,
  		player2Wins: p2Wins,
  		player2Loses: p2loses,
  		ties: ties, 
  	});
  });

  $(document).ready(function(){
  	$('#p1choice').hide();
  	$('#p2choice').hide();
  	$('#p1Results').hide();
  	$('#p2Results').hide();
  	reset();

  });