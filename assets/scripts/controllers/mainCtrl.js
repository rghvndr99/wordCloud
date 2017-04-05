wordCloudApp.controller('wordCtrl',['$scope','$http','flickerApi','cloudfactory','props',function($scope,$http,flickerApi,cloudfactory,props){
    /*initializing variable*/
  var gridster_row = 0, gridster_column = 0, url = "", img = {}, tags = [], tittleArray = [], owner ="", uploaded;
    $scope.obj={};
    $scope.obj.tagCloudActive=true;
    $scope.obj.images={};
    $scope.obj.page=1;
    $scope.obj.filterName="";
    $scope.obj.filterType="";
    
    $scope.obj.getDate=function(unixDate){
        var date = new Date(unixDate*1000);
		var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		return date.getDate()+" "+months[(date.getMonth())]+" , "+date.getFullYear();
    }
    
    $scope.obj.resetFilter=function(){
        $scope.obj.filterName="";
        $('.cloudWrapper').find('text').removeClass('unhighlight')
    }
    
    $scope.obj.toggleCloud=function(){        $scope.obj.tagCloudActive=!$scope.obj.tagCloudActive;
    }
    
    //get photo from flicker api
   $scope.obj.loadImages=function(){      flickerApi.getPhotos($scope.obj.page).then(function(response){
        url="";img={};
       $scope.obj.images[$scope.obj.page]=[];
       gridster_row=0;
       gridster_column=0;
       var photoArr=response.data.photos.photo;
       for(var i=0;i<photoArr.length;i++){
          img=photoArr[i],
          tags=[],
          tittleArray=[],
         url='https://farm'+ img.farm +'.staticflickr.com/'+ img.server +'/'+ img.id +'_'+ img.secret +'.jpg';
        owner=img.ownername.toUpperCase();
        //get the formatted date
           uploaded=$scope.obj.getDate(img.dateupload);
           
           //extracting tags and title
           tags=$scope.obj.createArray(img,'tags');
           tags=tags.length==1&& tags[0]==""?[]:tags;           tittleArray=$scope.obj.createArray(img,'title');
           tittleArray=tittleArray.length==1&& tittleArray[0]==""?[]:tittleArray;
           
           //creating gridster object for each image
           if((i%5)==0){
               gridster_column=0;
               gridster_row++;
           }
           $scope.obj.images[$scope.obj.page].push({
             size:{x:1,y:1} ,
             position:{
                 x:gridster_row,
                 y:gridster_column++
             },
               data:{
                   url:url,
                   tags:tags,
                   tittleArray:tittleArray,
                   owner_name:owner,
                   date_upload:uploaded
               }
           });
       }
       //create the word cloud
       cloudfactory.createCloud($scope.obj.images,$scope.obj.page);
    },function(error){
       console.log(error);
   }); 
   }
   
   $scope.obj.createArray=function(photo,option){
       return photo[option].split(" ");
   }
   //navigation
   $scope.obj.navigate=function(direction){
       $scope.obj.filterName="";
       if(direction=="next") $scope.obj.page+=1;
       else if(direction=="prev"&&$scope.obj.page>1){
           $scope.obj.page-=1;
       }
       else{
           $scope.obj.page=1;
       }
       $scope.obj.loadImages();
   }
   //click event on text
   $scope.obj.eventListeners=function(){
       $('.cloudWrapper').on('click','text',function(e){
           $('.cloudWrapper').find('text').addClass('unhighlight');
           $(e.target).removeClass('unhighlight');
           $scope.obj.filterName=$(e.target).html();
           $scope.obj.filterType=$(e.target).parents('.myCloud').attr('id') == "tag-list" ? "tags" : "titleArray";
           $scope.$digest();
       });
   }
   
   $scope.obj.customMap=props.gridsterMap;
    $scope.obj.gridsterOpts=props.gridsterProps;
    $scope.obj.loadImages();
    $scope.obj.eventListeners();
}]);