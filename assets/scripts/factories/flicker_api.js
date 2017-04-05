wordCloudApp.factory("flickerApi",["$http","$q","props",function($http,$q,props){
    var Obj={
        base_url:props.base_url,
        api_key:props.api_key,
        per_page:25,
        getPhotos:function(page){
            var def=$q.defer();
            $http({
                method:'GET',
                url: this.base_url+'?method=flickr.photos.getRecent&api_key='+ this.api_key +'&per_page=' + this.per_page + '&page='+ page +'&format=json&nojsoncallback=1&extras=owner_name%2Cdate_upload%2Ctags'
            }).then(
                function(response){
                    if(response.data.stat=="ok")
                        def.resolve({data:response.data});
                    else 
                        def.reject({error:response})
                },
                function(error){
                    def.reject({error:error})
                }
            );
            return def.promise;
        }
    }
    return Obj;
}]);