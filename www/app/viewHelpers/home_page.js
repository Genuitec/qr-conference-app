(function(View, Router){
    
//    $(document).ready(function(){
//        liveSearch($("#hero #livesearch-place form"), {onSubmit: function(search_data){
//            console.log(search_data);
//            return Router.redirect("results_page", search_data);
//        }});
//    });
    
    View.scaninfopage = function(data){
//        console.log("111");
    };
    
    View.scannowpage = function(data){
//        var part_data = {
//            last_minute_deals : data.last_minute_deals.slice(0,1),
//            amazing_deals : data.amazing_deals.slice(0,2)
//        },
//        template = Handlebars.compile($("#home_page-template").html());
//        $("#home_page .page_content").html(template(part_data)); 
//        
////        liveSearch($("#hero form"), function(search_data){
////        liveSearch($("#hero #livesearch-place"), function(search_data){
////            console.log(search_data);
////        });
//        
//        // bind events
//        (function(){// bind events
//            $("a.todealpage").click(function(e){
//                console.log("click");
//                e.preventDefault();
//                var el_id = $(this).attr("el-lm-id") || $(this).attr("el-ad-id"),
//                    redirect_data = data[($(this).attr("el-lm-id") ? "last_minute_deals" : "amazing_deals")][el_id].reservation;
//                return Router.redirect($(this).attr("href"), redirect_data);
//            });
//            
//            $("#more-last_minute_deals").click(function(e){
//                e.preventDefault();
//                Router.redirect("more_last_minute_deals", data.last_minute_deals);
//            });
//
//            $("#more-amazing_deals").click(function(e){
//                e.preventDefault();
//                Router.redirect("more_amazing_deals", data.amazing_deals);
//            });
//        }());// bind events
//        // bind events
    };
    
}(App.viewHelpers, App.Router));