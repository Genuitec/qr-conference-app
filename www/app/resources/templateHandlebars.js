(function(Resources, H){
    
    Resources.templateHandlebars = function(templEl){
        
        var el = templEl,
                
            compiledTemplate,
                
            compile = function(){
                compiledTemplate = H.compile(el.html());
            };

        compile();
        
        this.getHtml = function(data){
            if(arguments.length === 1)
                return compiledTemplate(data);
            else return false;
        };
        
    };
    
}(App.Resources, Handlebars));