(function(Widgets){
    
    Widgets.Loader = (function(){
        var loader, body,
        initLoader = function(){
            if(empty(loader)){
                body = document.querySelector("body"),
                loader = body.appendChild(document.createElement('div'));
                loader.id = "loader";
            }
        };
        
        return {
            start: function(){},
            stop: function(){}     
        }; 
    }());
    
}(App.Widgets));