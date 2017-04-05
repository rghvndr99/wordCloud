wordCloudApp.factory('cloudfactory',[function(){
  var cloudObject = {

		//function to create the array of word objects with thein freqencies
		generateFrequency : function(option,scopeImages,page){
			var frequencyArray = [];
			for(var i = 0; i<scopeImages[page].length; i++){
				for(var j = 0; j<scopeImages[page][i].data[option].length; j++){
					var temp = $.grep(frequencyArray, function(word){
						return word.text == scopeImages[page][i].data[option][j];
					});
					if(temp.length == 0)
						frequencyArray.push({"text" : scopeImages[page][i].data[option][j],
											 "occurance" : 1	
											});
					else{
						var tagIndex = frequencyArray.indexOf(temp[0]);
						frequencyArray[tagIndex]["occurance"]+=1;
					}			
				}
			}
			return frequencyArray;
		},

		//Map the frequencies created above to their font sizes
		createWordArray : function(input){
			for(var i=0; i<input.length; i++){
				input[i]["size"] = input[i]["occurance"] * 25 <= 100 ? (input[i]["occurance"] * 25) : 100;
				delete input[i]["occurance"];			
			}
			return input;
		},

		//calling the above functions to generate inputs for the word cloud
		createCloud : function(scopeImages,page){		
			    		
			//Getting the occurances of words
			var tags_frequency = this.generateFrequency("tags",scopeImages,page);	
			var title_frequency = this.generateFrequency("tittleArray",scopeImages,page);

			//Mapping Occurances to Font Size for cloud
			tags_frequency = this.createWordArray(tags_frequency);
			title_frequency = this.createWordArray(title_frequency);

			//rendering both clouds
			this.renderCloud("#tag-list", tags_frequency, "tags");
			this.renderCloud("#title-list",title_frequency, "tittleArray");		
		},

		//Rendering the D3 Clouds here
		renderCloud : function(container,wordsArray,type){
			var width = $(".cloudWrapper").width(),
				height = $(container).height();
			var fill = d3.scale.category20();
			// clearing the word cloud
			$(container).html("");
			var layout = d3.layout.cloud()
			    .size([width, height ])
			    .words(wordsArray)
			    .padding(1)
			    .rotate(function() { return ~~(Math.random() * 2) * 90; })
			    .font("Impact")
			    .fontSize(function(d) { return d.size; })
			    .on("end", draw);
			layout.start();

			function draw(words) {
			  d3.select(container).append("svg")
			      .attr("width", layout.size()[0])
			      .attr("height", layout.size()[1])
			    .append("g")
			      .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
			    .selectAll("text")
			      .data(words)		      
			    .enter().append("text")				    
			      .style("font-size", function(d) { return d.size + "px"; })
			      .style("font-family", "Impact")
			      .style("cursor", "pointer")
			      .style("fill", function(d, i) { return fill(i); })
			      .transition()
	              .duration(1000)
			      .attr("text-anchor", "middle")
			      .attr("transform", function(d) {
			        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
			      })
			      .text(function(d) { return d.text; });
			}
		}
	};

	return cloudObject;
}])