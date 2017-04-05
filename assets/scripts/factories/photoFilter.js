wordCloudApp.filter('photoFilter',function(){
	return function(photos,filterText,filterType){		
		if(filterText){
			var filteredPhotos = [];
			for(var i=0; i<photos.length; i++){
				if(photos[i].data[filterType].indexOf(filterText)!= -1){
					filteredPhotos.push(photos[i]);
				}
			}
			return filteredPhotos;
		}
		else{
			return photos; 
		}				
	}
})