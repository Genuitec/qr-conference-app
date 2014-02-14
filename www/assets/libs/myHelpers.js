String.prototype.trim = function(){
    return this.replace(/^\s+|\s+$/g, "");
};

Array.range = function(a, b, step){
    var A= [];
    if(typeof a == 'number'){
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

function clone_object_array_fields_to_str(o, field_name){
    var oo = {}, field = "";
    for(var i in o){
        oo[i] = o[i];
        if(arguments.length === 2 && is_array(o[i])){
            o[i].forEach(function(arEl){
                if(typeof(arEl) === "object")
                    for(var k in arEl)
                        if(k === field_name)
                            field+= (field === "" ? arEl[k] : (","+arEl[k]));
            });
            oo[i] = field.trim();
            field = "";
        }
    }
    return oo;
}

function filter_fields(data, fields){
    if(!is_array(fields) || arguments.length < 2)return false;
    for(var i in data)
        if(fields.indexOf(i) === -1)
            delete data[i];
    return data;
}

function trim_ar_strings(ar){
    for(var i = 0; i< ar.length; ++i)
        ar[i] = ar[i].replace(/^\s+|\s+$/g, "");
    return ar;
}

function strfield_to_array(field, data){
    if(data instanceof Array){
        var _data = [];
        data.forEach(function(v, k){
            _data.push(clone_object(v, field, v[field].split(","))); // images string to array
        });
        return _data;
    }else{
        return clone_object(data, field, data[field].split(","));
    }
};

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