  var config = {
    apiKey: "AIzaSyB1WeSpzG_QY1bbJ1YvKEjcorbXq-761n0",
    authDomain: "rpsmulti.firebaseapp.com",
    databaseURL: "https://rpsmulti.firebaseio.com",
    storageBucket: "rpsmulti.appspot.com",
  };
  firebase.initializeApp(config);

  var db = firebase.database();

  $("#p1").on('click', function(){
  	$('#p1choice').show();
  	$('.start').hide();

  });

  $('.p1choices').on('click', function(){
  	var p1 = $(this).attr('value');
  	console.log(p1)
  	db.ref().update({
  		player1: p1,
  	})
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

  });




  $(document).ready(function(){
  	$('#p1choice').hide();
  	$('#p2choice').hide();


  });