var finder = require('findit')('public/portfolio');
var path = require('path');
var fs = require('fs');

var data = {}

finder.on('directory', function (dir, stat, stop) {
 
    var d = dir.split('/')
    d.shift()
    d.shift()
    if (d.length == 2) {
      data[d[0]] = data[d[0]] ? data[d[0]] : {}
      data[d[0]].projects = data[d[0]].projects ? data[d[0]].projects : {}
      data[d[0]].projects[d[1]] = { images: [] }
    }

});


finder.on('file', function (file, stat) {
  
    var f = path.basename(file)
    var e = path.extname(file)
  	var d = path.dirname(file).split('/')
    d.shift()
    d.shift()
    
  	if (d.length == 2) {
  		if (e.toLowerCase() == '.jpg' || e.toLowerCase() == '.png')	{
        var image = file.replace('public/', '')
         if (data[d[0]].projects[d[1]].images.length == 0) {
            data[d[0]].projects[d[1]].image = image
         }
  	     data[d[0]].projects[d[1]].images.push(image)
    	} else if (f == 'info.txt') {
          var info = fs.readFileSync(file, 'utf-8').split('\n--\n')
          data[d[0]].projects[d[1]].title = (info.length == 2) ? info[0] : d[1]
          data[d[0]].projects[d[1]].desc = info[1] ? info[1] : info[0]
         
          if (info[2]) {
            data[d[0]].projects[d[1]].video = []
            info[2].split('\n').forEach(function(item) {
              if (item.substr(0,10) == 'http://you' || item.substr(0,11) == 'https://you') {
                data[d[0]].projects[d[1]].video.push('//www.youtube.com/embed/' + item.split('/')[3])
              } else if (item.substr(0,10) == 'http://vim' || item.substr(0,11) == 'https://vim') {
                data[d[0]].projects[d[1]].video.push('//player.vimeo.com/video/' + item.split('/')[3])
              } 

            })
          }

      }
    }
});

finder.on('end', function () {
 
  fs.writeFileSync('./public/index.json', JSON.stringify(data, null, 2))
  console.log('Index generated');

});


