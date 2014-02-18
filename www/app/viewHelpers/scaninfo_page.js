(function(View, Router){
    
    View.scaninfo_page = function(_data){
        var data = _data[0],
            template = Handlebars.compile($("#scaninfo_page-template").html());
        console.log(data);
        
        $('#scaninfo_page').html(template(data)).trigger('create');
        
    };
    
}(App.viewHelpers, App.Router));