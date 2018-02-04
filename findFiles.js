'use strict'

var fs=require('fs');
var path=require('path');

var filePath=path.resolve("./1");
var outputPath=path.resolve("./");
findFiles(filePath);
function findFiles(filePath){
	fs.readdir(filePath,function(err,files){
		if(err){
			console.log(err);
		}else{
			files.forEach(function(fileName){
				var thisPath=path.resolve(filePath,fileName);
				fs.stat(thisPath,function(err,stats){
					if(err){
						console.log(err);
					}else{
						if(stats.isFile()){
							if(thisPath.search(/.mp3/)>-1){
								var rs=fs.createReadStream(thisPath);
								var thatPath=path.resolve(outputPath,"result",fileName);
								var ws=fs.createWriteStream(thatPath);
								rs.pipe(ws);
							}
						}else{
							findFiles(thisPath);
						}
					}
				})
			})
		}
	})
}
