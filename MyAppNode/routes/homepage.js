exports.do_work = function(req, res){
  res.render('homepage.jade');
};



//Connect string to Oracle
var connectData = { 
  "hostname": "pandacfy.c3agsqowvc8u.us-west-2.rds.amazonaws.com", 
  "user": "PanDaCFY", 
  "password": "cdqzcdqz", 
  "database": "CFYDB" };
var oracle =  require("oracle");



/////
//Query the oracle database, and call output_actors on the results
//
//res = HTTP result object sent back to the client
//name = Name to query for
function query_dbA(res,name,password) {
oracle.connect(connectData, function(err, connection) {
 if ( err ) {
 	console.log(err);
 } else {
	 
	  	// selecting rows
	  	connection.execute("SELECT u.login L, u.password P FROM users u WHERE u.login = '" + name + "'", 
	  			   [], 
	  			   function(err, results) {
	  	    if ( err ) {
	  	    	console.log("This is an error: " + err);
	  	    } else {

	  	    	connection.close(); // done with the connection
	  	    	
	  	    	//console.log('Result: ' + results[0].C);
	  	    	output_loginA(res, name,password, results);
	  	    }
	
	  	}); // end connection.execute
 }
}); // end oracle.connect
}



function output_loginA(res,name,password,results) {
	

	if(Object.keys(results).length == 0){
		res.render('login.jade', {UserNotExist: true}
		  );
	}
	else{
		
		if(results[0].P != password){
			res.render('login.jade'
			  );			
		}
		else{
			/*
			console.log('Result1: ' + results[0].L);
			console.log('Result1: ' + results[0].P);
			res.render('homepage.jade',
					{ username: name}
				  );	
			*/
			
			if(results[0].P == '10086'){
				
				//render a new page
				
				console.log('Result1: ' + results[0].L);
				console.log('Result1: ' + results[0].P);	
				
				res.render('homepage.jade',
						{ username: name}
					  );
			}
			else{

				res.render('homepage.jade',
						{ username: name}
					  );				
			}	
		}
	}

}


exports.do_recently_pinned = function(req,res){

	query_dbB(res);
};

exports.do_login = function(req, res) {
	  //res.render("front.jade");
	  
	  query_dbA(res,req.body.name,req.body.password);
};



exports.do_register = function(req, res) {
	console.log('Name: ' + req.body.name);
	console.log('Password: ' + req.body.password);
	res.render('register.jade');
};