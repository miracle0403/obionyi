'use strict';
const nodemailer = require('nodemailer'); 
var formidable = require('formidable');
var express = require('express');
var router = express.Router();
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn
var util = require('util');
var fs = require('fs');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'IFEYSAMUEL VENTURES' });
});

router.get('/upload', ensureLoggedIn( '/login' ), function(req, res, next) {
	//get the category.
	db.query('SELECT category FROM category', function(err, results, fields){
		if(err) throw err;
		var category = results;
		res.render('upload', { title: 'Upload File', category: category });
	});
});


//get login
router.get('/login', function(req, res, next) {  
	const flashMessages = res.locals.getMessages( );
	if( flashMessages.error ){
		res.render( 'login', {
			title: 'LOGIN',
			showErrors: true,
			errors: flashMessages.error
		});
	}else{
		res.render('login', { title: 'LOG IN'});
	}
});


//register get request
router.get('/register', function(req, res, next) {	
    res.render('register',  { title: 'REGISTRATION'});
});


//post add new category never existed.
router.post('/newcat', function(req, res, next) {
	var category = req.body.category;
	db.query('CALL newcategory (?)', [category], function(err, results, fields){
		if (err) throw err;
		var child = 'Category added.';
		res.render('index', { title: 'IFEYSAMUEL VENTURES', child: success});
	});
});

//post log in
router.post('/login', passport.authenticate('local', {
  failureRedirect: '/login',
  successReturnToOrRedirect: '/',
  failureFlash: true
}));

//post add category 
router.post('/addcategory', function(req, res, next) {
	var category = req.body.category;
	var parent = req.body.parent;
	db.query('CALL addcategory (?, ?)', [parent, category], function(err, results, fields){
		if (err) throw err;
		var success = 'Category added.';
		res.render('index', { title: 'IFEYSAMUEL VENTURES', parent: success});
	});
});


router.post('/upload', function(req, res, next) {
	var img = req.body.img;
	//var category = req.body.category;
	if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
		// parse a file upload
		var form = new formidable.IncomingForm();
		form.parse(req, function(err, fields, files) {
			if (err) throw err;
					var filed =  JSON.stringify(files.img);
					var file  =  JSON.parse( filed );
					var name  =  file.name;
					console.log( file );
					form.on('fileBegin', function(name, file) {
						var newpath =  '/storage/emulated/0/obionyi/public/samples/' + name;
						var oldpath  =  file.path;
						var type  =  file.type;
						var size  =  file.size;
						var fs  =  require( 'fs' );
						//if the type is not supported.
						var supported  =  {
							png: 'image/png',
							jpg: 'image/jpg',
							jpeg: 'image/jpeg'
						}
						if( type  == supported.png || type == supported.jpg || type == supported.jpeg){
							//console.log( 'file is supported', typeof supported.jpeg, typeof type, supported.jpeg === type, supported.jpeg == type);
							//check the size
							if( size > 3000000 ){
								var error = 'This file is too big. the maximum file size is 3mb.'
								//console.log( 'file too big' )
								//delete the file
								fs.unlink('oldpath', function(err){
									if(err) throw err;
									res.render('upload', {title: 'FILE UPLOAD FAILED', error: error});
								});
							}else{
								// move the file.
								fs.rename(oldpath, newpath, function( err ){
									if( err ) throw err;
									console.log( 'file moved' );
									//insert joor
									db.query('INSERT INTO products (price, category, product_name, image, product_id, status) values (?, ?, ?, ?, ?, ?)', [price, category, product, newpath, product_id, 'instock'], function(err, results, fields){
										if (err) throw err;
										var success = 'Product added successfully';
										res.render('upload', {title: 'FILE UPLOAD FAILED', success: success});
									});
								});
							}
						}else{
							//console.log( 'is not supported' );
							var error = 'This file is not supported. Use a jpg or png or jpeg file.';
							res.render('upload', {title: 'FILE UPLOAD FAILED', error: error});
						}
					});
					form.emit( 'fileBegin', name, file );
		});
	}
});


/*console.log('files', files);
		files.map(File, function(){
			console.log(File);
		});
		//what happens if file is not in jpg or png format
		else{
			console.log('nada')
			res.render('upload', {title: 'nada'})
		}*/
/*if(type !== 'image/jpg' || type !== 'image/png' || type != 'image/jpeg'){
			var error = 'File format is not supported. Use jpg or jpeg or png images';
			console.log(error)
			res.render('upload', { title: 'File Upload Failed', error: error });
		}else{
			//check the size i.e mb stuff
			var permittedsize = form.maxFileSize = 200 * 1024 * 1024;
			console.log(permittedsize)
			res.render('upload', { title: 'Upload File' });
		}*/

router.get('/404', function(req, res, next) {
  res.render('404', {title: 'PAGE NOT FOUND', message: 'Ooops  since you got lost somehow but i am here to catch you. see our quick links.'});
});

module.exports = router;