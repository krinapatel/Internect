var express = require('express');
var router = express.Router();
var Cloudant = require('cloudant');
var username = process.env.cloudant_username || "nodejs";
var password = process.env.cloudant_password;
var cloudant = Cloudant({account:username, password:password});
var multer  = require('multer');
var testdb = cloudant.db.use('testdb');
var nano = require('nano')('https://dc3ccbc8-dbff-410e-a91c-9170a2d71e57-bluemix:7b8890a78b25a0bea55cfe249811a1624891950b59660c8eaf4ef018a428bbb2@dc3ccbc8-dbff-410e-a91c-9170a2d71e57-bluemix.cloudant.com');
var testDb = nano.db.use('testdb');
var fs = require('fs');


// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// define the home page route
router.get('/', function(req, res) {
  res.send('Birds home page');
});
// router.get('/users', function(req, res) {
// testdb.find({selector:{_id:'7ab9d8c834a309ef18334047a5809e6f'}}, function(er, result) {
//   if (er) {
//     throw er;
//   }

//   console.log('Found %d documents with name Alice', result.docs.length);
//   for (var i = 0; i < result.docs.length; i++) {
//     console.log('  Doc id: %s', result.docs[i].name);
//   }
// });
// });

router.post('/user', function(req, res, next) {
	testdb.insert({
		"firstName": req.body.firstName,
		"lastName": req.body.lastName,
		"position": req.body.position, 
		"company" : req.body.company,
		"phoneNum": req.body.phoneNum, 
		"email": req.body.email, 
		"linkedin": req.body.linkedin, 
		"facebook": req.body.facebook, 
		"twitter": req.body.twitter,
		"connCount": req.body.connCount,
		"location": req.body.location,
		"profileurl": req.body.profileurl,
		"coverurl": req.body.coverurl,
		"connection": []
		}, function(err, data) {
    	if(err) {
    		console.log("Error:", err);
    		res.send(err);
    	}
    	else {
    		console.log("Data:", data);
    		res.send(data);	
    	}
    	
  	});
});

router.get('/getConn/:id', function(req, res, next) {
	testdb.find({selector:{"_id":req.params.id}}, function(er, result) {
		//console.log(result.docs[0].connection);
		if(er) {
			throw er;
		}
		res.send(result.docs[0].connection);
	});
});


router.get('/users/:id/:email', function(req, res, next) {
	var rev, fname, lname, position, company, phoneNum, eMail, linkedin, facebook, twitter, cnt, conn, location, profileurl, coverurl;
	var rev1, fname1, lname1, position1, company1, phoneNum1, eMail1, linkedin1, facebook1, twitter1, cnt1, conn1, location1, profileurl1, coverurl1;
	var conns = [];
	var conns1 = [];
	var newConn2 = null;


	testdb.find({selector:{"_id":req.params.id}}, function(er, result) {
  			if (er) {
    			throw er;
 			}
 			newConn2 = {
 			 "id" : req.params.id,
 			 "firstName" : result.docs[0].firstName,
 			 "lastName" : result.docs[0].lastName,
 			 "position" : result.docs[0].position,
 			 "company" : result.docs[0].company,
 			 "profileurl": result.docs[0].profileurl,
 			 "connCount" : result.docs[0].connCount+1
 			};

    		rev = result.docs[0]._rev;
    		fname = result.docs[0].firstName;
    		lname = result.docs[0].lastName;
    		position = result.docs[0].position;
    		company = result.docs[0].company;
    		phoneNum = result.docs[0].phoneNum;
    		eMail = result.docs[0].email;
    		linkedin = result.docs[0].linkedin;
    		facebook = result.docs[0].facebook;
    		twitter = result.docs[0].twitter;
    		cnt = result.docs[0].connCount;
    		conn = result.docs[0].connection;
    		location = result.docs[0].location;
    		profileurl = result.docs[0].profileurl;
			coverurl = result.docs[0].coverurl;

    		console.log('Rev is %s', rev);
	});


	testdb.find({selector:{"email":req.params.email}}, function(er, result) {
  			if (er) {
    			throw er;
 			}
 			var newConn = {
 			 "id" : result.docs[0]._id,
 			 "firstName" : result.docs[0].firstName,
 			 "lastName" : result.docs[0].lastName,
 			 "position" : result.docs[0].position,
 			 "company" : result.docs[0].company,
 			 "profileurl": result.docs[0].profileurl,
 			 "connCount" : result.docs[0].connCount+1
 			};

 			cnt++;

 			console.log(conn);
 			for(var i in conn) {
 				if (result.docs[0]._id == conn[i].id) {
 					res.send("User already added");
 					return;
 				}
 			}

 			conn.push(newConn);

 			console.log("Found ID ",req.params.id);
 			testdb.insert({
	 				"_id": req.params.id,
	 				"_rev": rev,
	 				"firstName": fname, 
	 				"lastName": lname,
					"position": position,
					"company": company, 
					"phoneNum": phoneNum, 
					"email": eMail, 
					"linkedin": linkedin, 
					"facebook": facebook, 
					"twitter": twitter,
					"connCount": cnt,
	 				"connection": conns,
	 				"locattion": location,
	 				"profileurl": profileurl,
	 				"coverurl": coverurl
			}, function(err, data) {
	    		if(err) {
	    			console.log("Error:", err);
	    		}
	    		console.log("Data:", data);
	  		});
 			

 			id1 = result.docs[0]._id;
 			rev1 = result.docs[0]._rev;
    		fname1 = result.docs[0].firstName;
    		lname1 = result.docs[0].lastName;
    		position1 = result.docs[0].position;
    		company1 = result.docs[0].company;
    		phoneNum1 = result.docs[0].phoneNum;
    		eMail1 = result.docs[0].email;
    		linkedin1 = result.docs[0].linkedin;
    		facebook1 = result.docs[0].facebook;
    		twitter1 = result.docs[0].twitter;
    		cnt1 = result.docs[0].connCount;
    		conns1 = result.docs[0].connection;
    		location1 = result.docs[0].location;
    		profileurl1 = result.docs[0].profileurl;
			coverurl1 = result.docs[0].coverurl;

    		cnt1++;
    		conns1.push(newConn2);
    		console.log(conns1);

 			testdb.insert({
 				"_id": id1,
 				"_rev": rev1,
 				"firstName": fname1, 
 				"lastName": lname1,
				"position": position1,
				"company": company1, 
				"phoneNum": phoneNum1, 
				"email": eMail1, 
				"linkedin": linkedin1, 
				"facebook": facebook1, 
				"twitter": twitter1,
				"connCount": cnt1,
 				"connection": conns1,
 				"location": location1,
				"profileurl": profileurl1,
				"coverurl": coverurl1
			}, function(err, data) {
    	if(err) {console.log("Error:", err);}
    	//console.log("Error:", err);
    	console.log("Data:", data);
    	res.send("Added");
  	});
	});
});

router.get('/users/:location', function(req, res, next) {
	var ids;
	var newconns = null;
	var conns = [];
	testdb.find({selector:{"location":req.params.location}}, function(er, result) {
  			if (er) {
    			throw er;
 			}
 			//console.log(result.docs);
 			for(var i in result.docs) {
 				newconns = { 
		 			"id" : result.docs[i]._id,
		 			"firstName" : result.docs[i].firstName,
		 			"lastName" : result.docs[i].lastName,
		 			"position" : result.docs[i].position,
		 			"company" : result.docs[i].company,
		 			"connCount": result.docs[i].connCount,
		 			"profileurl": result.docs[i].profileurl
 				};
 				conns.push(newconns);	
 			}
 			console.log(conns);
			res.send(conns);
			//return
	});
});

// router.post('/uploadprofile/:id', function(req, res, next) {
// 	console.log(req.body.fname);


// 	fs.readFile('test.png', function(err, data) {
//   	if (!err) {
//     	testDb.multipart.insert({ foo: 'bar' }, [{name: 'rabbit.png', data: data, content_type: 'image/png'}], 'mydoc', 
//     		function(err, body) {
//         		if (!err)
//           		console.log(body);
//           		res.send("Added");
//     		});
//   	}
// 	});
// });



// router.post('/profile/:',upload.single('image'), function(req, res, next) {
//     fs.readFile('rabbit.png', function(err, data) {
//   		if (!err) {
//     			alice.attachment.insert('rabbit', 'rabbit.png', data, 'image/png',
//       		{ rev: '12-150985a725ec88be471921a54ce91452' }, function(err, body) {
//         	if (!err)
//           console.log(body);
//     });
//   }
// });
// });

// router.post('/uploadcover/:id',upload.single('image'), function(req, res, next) {
//     console.log(req.body);
//     console.log(req.file);
//     var url = "http://9.66.76.101:3000/uploads/"+req.file.filename;
//     console.log(url);
//     res.append('URL',url);
//     res.append('test',url);
//     res.end();
// });

// router.post('/uploadQR/:id',upload.single('image'), function(req, res, next) {
//     console.log(req.body);
//     console.log(req.file);
//     var url = "http://9.66.76.101:3000/uploads/"+req.file.filename;
//     console.log(url);
//     res.append('URL',url);
//     res.append('test',url);
//     res.end();
// });

// router.get('/uploads/:file', function (req, res){
//   file = req.params.file;
//   var img = fs.readFileSync("./uploads/" + file);
//   res.writeHead(200, {'Content-Type': 'image/jpg' });
//   res.end(img, 'binary');
// });

var addConnection = function() {

}

module.exports = router;