(function(View, Router){
    
    View.scaninfo_page = function(_data){
        console.log(data);
        var data = _data[0],
            template = Handlebars.compile($("#scaninfo_page-template").html());
        
        $('#scaninfo_page section[data-role="templates"]').html(template(data));
//        list.listview('refresh');
        
    };
    
}(App.viewHelpers, App.Router));