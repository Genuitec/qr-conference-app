(function(Resources, T){
    
    Resources.templateDoT = function(templEl){
        
        var el = templEl,
                
            compiledTemplate,
                
            compile = function(){
                compiledTemplate = T.template(el.text());
            };

        compile();
        
        this.getHtml = function(data){
            if(arguments.length === 1)
                return compiledTemplate(data);
            else return false;
        };
        
    };
    
}(App.Resources, doT));