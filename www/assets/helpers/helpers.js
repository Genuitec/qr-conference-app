Array.range = function(a, b, step){
    var A= [];
    if(typeof a== 'number'){
        A[0]= a;
        step= step || 1;
        while(a+step<= b){
            A[A.length]= a+= step;
        }
    }
    else{
        var s= 'abcdefghijklmnopqrstuvwxyz';
        if(a=== a.toUpperCase()){
            b=b.toUpperCase();
            s= s.toUpperCase();
        }
        s= s.substring(s.indexOf(a), s.indexOf(b)+ 1);
        A= s.split('');        
    }
    return A;
};

function clone_object(o, field_name, replace_with){
    var oo = {};
    for(var i in o){
        oo[i] = o[i];
    }
    if(arguments.length === 3)
        oo[field_name] = trim_ar_strings(replace_with);
    return oo;
}

function is_set(){ //many arguments
    try {
        for(var i = 0; i<arguments.length; ++i)
            if(arguments[i] === false || arguments[i] === null || typeof(arguments[i]) === "undefined" || arguments[i] === "")
                return false;
        return true;
    } catch(e) {
        return false;
    }
}

function empty(){
    try {
        if(arguments.length === 0)return true;
        for(var i = 0; i<arguments.length; ++i)
            if(!is_set(arguments[i]))
                return true;
            else
                if(is_array(arguments[i]) && arguments[i].length === 0)
                    return true;
                else if(typeof(arguments[i]) === "object" && Object.keys(arguments[i]).length === 0)
                    return true;
                else if(typeof(arguments[i]) === "string" && arguments[i] === "")
                    return true;
                else if(typeof(arguments[i]) === "number" && arguments[i] === "")
                    return true;
        return false;
    } catch(e) {
        return true;
    }
}

function is_array(ar){
    return (ar instanceof Array);
}

function group_objects(){
    var result = {};
    for(var i = 0; i<arguments.length; ++i)
        for(var k in arguments[i])
            result[k] = arguments[i][k];
    console.log(result);
    return result;
}

/* JQUERY PLUGIN */
$(document).ready(function(){
    
    (function($){
        $.fn.formData = function(){
            var res = {};
            ($(this).serializeArray()).forEach(function(v,k){
               res[v.name] = v.value;
            });
            return res;
        };
    })(jQuery);
});