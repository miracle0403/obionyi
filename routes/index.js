'use strict';
const nodemailer = require('nodemailer'); 
var formidable = require('formidable');
var express = require('express');
var router = express.Router();
var util = require('util');
var fs = require('fs');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'IFEYSAMUEL VENTURES' });
});

router.get('/upload', function(req, res, next) {
  res.render('upload', { title: 'Upload File' });
});



router.post('/upload', function(req, res, next) {
	var img = req.body.img;
	if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
		// parse a file upload
		var form = new formidable.IncomingForm();
		form.parse(req, function(err, fields, files) {
			if (err) throw err;
			
					/*var name = JSON.stringify(files.img.name);
					var newpath = './public/images/samples/' + name;
					var oldpath = JSON.stringify(files.img.path);
					console.log(newpath)
					fs.rename(oldpath, newpath, function(err){
						if (err) throw err;
						res.render('/upload', {title: 'saved'});
					});*/
					var filed =  JSON.stringify(files.img);
					var file  =  JSON.parse( filed );
					var name  =  file.name;
					console.log( file );
					form.on('fileBegin', function(name, file) {
						var newpath =  '/storage/emulated/0/obionyi/public/samples/' 
						var oldpath  =  file.path;
						var type  =  file.type;
						var size  =  file.size;
						var fs  =  require( 'fs' );
						/*fs.rename(oldpath, newpath, function( err ){
							if( err ) throw err;
							console.log( 'file moved' );
						});*/
						//if the type is not supported.
						var supported  =  {
							png: 'image/png',
							jpg: 'image/jpg',
							jpeg: 'image/jpeg'
						}
						if( type  == supported.png || type == supported.jpg || type == supported.jpeg){
							console.log( 'file is supported', typeof supported.jpeg, typeof type, supported.jpeg === type, supported.jpeg == type);
							//check the size
							if( size > 3000000 ){
								console.log( 'file too big' )
							}else{
								console.log( 'file is normal' )
							}
						}else{
							console.log( 'is not supported' );
						}
					});
					form.emit( 'fileBegin', name, file );
				/*
			}else{
				var error = 'This file is not supported. Please use either a jpg or png or jpeg file.';
				console.log(error)
				res.render('upload', {title: 'Upload Failed', error: error});
			}*/
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