(function(Resources, VCF_plugin){
    
    Resources.vCardParser = function(input, callback){
        VCF_plugin.parse(input, callback);
    };
    
}(App.Resources, VCF));