// Connect string to Oracle
//Connect string to Oracle
var connectData = { 
  "hostname": "pandacfy.c3agsqowvc8u.us-west-2.rds.amazonaws.com", 
  "user": "PanDaCFY", 
  "password": "cdqzcdqz", 
  "database": "CFYDB" };
var oracle =  require("oracle");


function query_db(res,name) {
oracle.connect(connectData, function(err, connection) {
 if ( err ) {
 	console.log(err);
 } else {
	  	// selecting rows
	  	connection.execute("SELECT b.name BOARD, o.url URL FROM boards b, pins p, objects o WHERE b.userId = '" + name + "' AND p.userId = b.userId AND o.id = p.objectId AND o.source = p.source",  
	  			[], 
	  			   function(err, results) {
	  	    if ( err ) {
	  	    	console.log(err);
	  	    } else {
	  	    	connection.close(); // done with the connection
	  	    	res.render("board.jade", {results: results});
	  	    }
	
	  	}); // end connection.execute
 }
}); // end oracle.connect
}


function output_actors(res,name,results) {
	
	if(Object.keys(results).length == 0){
		console.log('NULL cfy');
	}
	else{
		console.log('success cfy: ' + name);
		
		res.render('actor.jade',
				   { title: "Actors with last name " + results[0].B,
				     results: results }
			  );
	}
}

exports.do_work = function(req, res){
	console.log("User name: " + req.query.username);
	query_db(res,req.query.username);
};
