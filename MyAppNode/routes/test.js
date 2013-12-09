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
	  	connection.execute("WITH res AS(SELECT queryResult.r r, queryResult.tf*rates.avgScore*rates.avgScore / t21.total score FROM (SELECT o.url r, COUNT(*)*COUNT(*) tf FROM objects o, tags t WHERE (o.id = t.objectId AND o.source = t.source) AND (t.tag LIKE '" + name + "') GROUP BY o.url) queryResult,  ((SELECT o.url r, AVG(rts.rating) avgScore FROM ratings rts, objects o WHERE o.id = rts.objectId AND o.source = rts.source GROUP BY o.url) UNION (SELECT o.url r, 2.5 avgScore FROM objects o WHERE o.url NOT IN(SELECT o2.url FROM ratings rts2, objects o2 WHERE o2.id = rts2.objectId AND o2.source = rts2.source))) rates, test2_1 t21 WHERE queryResult.r = t21.r AND rates.r = queryResult.r ORDER BY score DESC) SELECT res.r R FROM res WHERE ROWNUM <= 10", 
	  			   [], 
	  			   function(err, results) {
	  	    if ( err ) {
	  	    	console.log(err);
	  	    } else {
	  	    	connection.close(); // done with the connection
	  	    	output_actors(res, name, results);
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
				   { title: "Actors with last name " + name,
				     results: results }
			  );
	}
}

exports.do_work = function(req, res){
	query_db(res,req.body.name);
};

