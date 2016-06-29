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
	console.log(gameChoices);
	
	 p2db = gameChoices.player2;
	 p1db = gameChoices.player1;

	 p1Wins = gameChoices.player1Wins;
	 p1Loses = gameChoices.player1Loses;
	 p2Wins = gameChoices.player2Wins;
	 p2loses = gameChoices.player2Loses;
	 ties = gameChoices.ties;
	gameRun();
	$('#ties').text("Ties: " + ties);
  	$('#ties1').text("Ties: " + ties);
	$('#p1Wins').text("wins: " + p1Wins);
	$('#p2Loses').text("Loses: " + p2loses);
	$('#p2Wins').text("wins: " + p2Wins);
	$('#p1Loses').text("Loses: " + p1Loses);
});

 function gameRun() {

  			if(p1db === p2db) {
  				reset();
  				$("#results").text("its a tie");
  				ties++; 
  				db.ref().update({
  					ties: ties,
  				});
  				$('#ties').text("Ties: " + ties);
  				$('#ties1').text("Ties: " + ties);
  				
  				
  			} else if(p1db === "rock" && p2db === "scissors"){
	  			$("#results").text("Player 1 wins rock beats scissors");
	  			play1wins();
	  			
	  		} else if (p1db === "rock" && p2db === "paper") {
	  			$("#results").text("Player 2 wins paper beats rock");
	  			play2wins();
	  			
	  		} else if(p1db === "paper" && p2db === "rock"){
	  			$("#results").text("Player 1 wins paper beats rock");
	  			play1wins();
	  			
	  		} else if (p1db === "paper" && p2db === "scissors") {
	  			$("#results").text("Player 2 wins scissors beats paper");
	  			play2wins();
	  			
	  		} else if(p1db === "scissors" && p2db === "paper"){
	  			$("#results").text("Player 1 wins scissors beats paper");
	  			play1wins();
	  			
	  		} else if(p1db === "scissors" && p2db === "rock") {
	  			$("#results").text("Player 2 wins rock beats scissors");
	  			play2wins();
	  			
	  		} else {
	  			//$("#results").text("other player hasn't chosen yet");
	  		}

	  		if(p1db ==="rock" || p1db ==="paper" || p1db ==="scissor" ){
	  			$(".p1choice").hide();
	  		} else if(p1db === "notChosen1"){
	  			$(".p1choice").show();
	  		}
	  		if(p2db ==="rock" || p2db ==="paper" || p2db ==="scissor" ){
	  			$(".p2choice").hide();
	  		} else if(p1db === "notChosen1"){
	  			$(".p2choice").show();
	  		}
  }

  function reset() { 
    p2db = "notChosen";
  	p1db = "notChosen1";
  	db.ref().update({
  		player2: p2db,
  		player1: p1db,
  	});
  }

function play1wins () {
	  reset(); 
	  p1Wins++;
	  p2loses++;
	  db.ref().update({
  		player1Wins: p1Wins,
  		player2Loses: p2loses,
  	});
	$('#p1Wins').text("wins: " + p1Wins);
	$('#p2Loses').text("Loses: " + p2loses);
}
function play2wins () {
	  reset();
	  p2Wins++;
	  p1Loses++;
	  db.ref().update({
  		player2Wins: p2Wins,
  		player1Loses: p1Loses,
  	});
	$('#p2Wins').text("wins: " + p2Wins);
	$('#p1Loses').text("Loses: " + p1Loses);
	;
}



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
  	//reset();

  });