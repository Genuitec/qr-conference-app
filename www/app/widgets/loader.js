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
            start: function(){
                initLoader();
                body.style.overflow = "hidden";
                loader.style.display = "block";
            },
            stop: function(){
                initLoader();
                body.style.overflow = "";
                loader.style.display = "none";
            }     
        }; 
    }());
    
}(App.Widgets));