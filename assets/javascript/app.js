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
  $("#p1").on('click', function(){
  	$('#p1choice').show();
  	$('.start').hide();

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
	console.log(gameChoices)
	
});

 function gameRun() {
  	if(p1db != "notChosen" && p2db != "notChosen"){
  		if(p1db === p2db) {
  			$("#results").text("its a tie");
	  		if(p1db === "rock" && p2db === "scissors"){
	  			$("#results").text("Player 1 wins");
	  		} else {
	  			$("#results").text("Player 2 wins");
	  		}
	  		if(p1db === "paper" && p2db === "rock"){
	  			$("#results").text("Player 1 wins");
	  		} else {
	  			$("#results").text("Player 2 wins");
	  		}
	  		if(p1db === "scissors" && p2db === "paper"){
	  			$("#results").text("Player 1 wins");
	  		} else {
	  			$("#results").text("Player 2 wins");
	  		}
  		}  
  	}

  }
  $(document).ready(function(){
  	$('#p1choice').hide();
  	$('#p2choice').hide();


  });