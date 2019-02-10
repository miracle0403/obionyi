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
			var type = JSON.stringify(files.img.type);
			var supported = {
				jpeg: "image/jpeg",
				png: "image/png",
				jpg: "image/jpg"
			}
			var jpeg = JSON.stringify(supported.jpeg);
			var jpg = JSON.stringify(supported.jpg);
			var png = JSON.stringify(supported.png)
			console.log (jpeg == type)
			if(type === jpg || type === png || type === jpeg){
				//get the size
				var size = JSON.stringify(files.img.size);
				
				if (size > 3000000){
					
					var error = 'File size is too big try reducing...';
					console.log(error);
					res.render('upload', {title: 'Upload Failed', error: error});
				}else{
					
					/*var name = JSON.stringify(files.img.name);
					var newpath = './public/images/samples/' + name;
					var oldpath = JSON.stringify(files.img.path);
					console.log(newpath)
					fs.rename(oldpath, newpath, function(err){
						if (err) throw err;
						res.render('/upload', {title: 'saved'});
					});*/
					form.on('fileBegin', function(name, file) {
						file.path = './public/images/samples/' + name;
						
					});
				}
			}else{
				var error = 'This file is not supported. Please use either a jpg or png or jpeg file.';
				console.log(error)
				res.render('upload', {title: 'Upload Failed', error: error});
			}
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
