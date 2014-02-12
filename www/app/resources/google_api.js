(function(Resources){
    
    var map;
    
    Resources.GoogleApi = {
        
        autocomplete : function(q, callback){
            (new google.maps.places.AutocompleteService())
                .getQueryPredictions({ input: q, options: {types:"cities"} }, function(predictions, status) {
                    if (status !== google.maps.places.PlacesServiceStatus.OK)
                        return false;
                    callback(predictions);
//                    console.log(predictions);
            });
        },
        
        details : function(reference, callback){
            (new google.maps.places.PlacesService(map))
                .getDetails({
                    reference: reference
                }, function(place, status) {
                    if (status !== google.maps.places.PlacesServiceStatus.OK)
                        return false;
                    callback(place);
//                    console.log(place);
                });
        }
        
    };
    
    $(document).ready(function(){
        map = new google.maps.Map(document.getElementById("apimap"));
    });
    
}(App.Resources));