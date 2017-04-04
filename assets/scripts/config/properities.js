wordCloudApp.constant('props',{
    base_url : 'https://api.flickr.com/services/rest/',	
	api_key : 'b848c900e213384f1107c5738f2b8b3f',
    gridsterProps : {
	    columns: 5, 
	    pushing: true,
	    floating: true,
	    swapping: false,
	    width: 'auto',
	    colWidth: 'auto',
	    rowHeight: 'match',
	    margins: [10, 10],	    
	    minSizeX: 1,
	    minSizeY: 1,
	    resizable: {
	       enabled: true,
	       handles: ['n', 'e', 's', 'w', 'ne', 'se', 'sw', 'nw']
	    },
	    draggable: {
	       enabled: true
	    }
	},

	gridsterMap : {
	    sizeX: 'image.size.x',
	    sizeY: 'image.size.y',
	    row: 'image.position[0]',
	    col: 'image.position[1]'
	}
});