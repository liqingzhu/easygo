// DP.define(["comm::util","io/ajax","comm::options-from-dataset","event/live"],function(h,c){c("comm::util");c("event/live");var i=c("comm::options-from-dataset");return h.Class({initialize:function(j,f){var b=this;this.node=j;this.options=f?f:{};this.mainLevel=this.node.one("#nav-level-main");this.mainlevelTriggers=this.mainLevel.all(">ul>li");var a=null,g=null,c=0,e=[];$(document).on("mousemove",function(b){e.push({x:b.event.clientX,y:b.event.clientY});var a=1;2<=e.length&&(e.forEach(function(b,d){1<=
// d&&1>=b.x-e[d-1].x&&(a*=0)}),e=[],c=a?2E3:0)});this.mainlevelTriggers.on("mouseover",function(){if(!$(this).hasClass("no-hover")){var f=$(this),e=$(this).one("[data-id=nav-ad]");g&&clearTimeout(g);a=setTimeout(function(){b.mainlevelTriggers.removeClass("hover");f.addClass("hover");if(e.count()&&"1"!==e.attr("data-loaded")){var a=[],d=i(e.el(0));d.config&&(d.config.key&&""!==d.config.key)&&(e.attr("data-loaded","1"),a.push({id:d.config.key,city:h.data("cityID"),limit:d.config.limit?d.config.limit:
// 1}),h.provide("comm::model/activity-ad",function(d,g){(new g(f)).fetch(!0,{q:JSON.stringify(a)},function(d){b.renderAd(e,d[a[0].id])})}))}},c)}});this.mainlevelTriggers.on("mouseout",function(){var b=$(this);a&&clearTimeout(a);g=setTimeout(function(){b.removeClass("hover")},0)});this.node.hasClass("tg-nav-menu-active")&&(this.node.on("mouseenter",function(){"1"!==b.node.attr("data-loaded")&&(b.node.addClass("on"),b.node.attr("data-loaded","1"))}),this.node.on("mouseleave",function(){b.node.removeClass("on");
// b.node.attr("data-loaded","0")}))},renderAd:function(c,f){var b=510,a="";if(1===f.length)b=510;else if(2===f.length)b=255;else return;a+="<ul>";f.forEach(function(c){a+='<li><a target="blank" title="'+c.title+'" href="'+c.link+'"><img height="'+b+'" width="261" src="'+c.image+'"/></a></li>'});a+="</ul>";c.html(a);c.removeClass("Hide")}})});


/**
 * @author daxuan.she
 * @date 11/08/2014
 * 新首页页头菜单
 */
DP.define(["comm::util","io/ajax","comm::options-from-dataset",'event/live'],
	function (DP,require,Util,Ajax) {

	    var Util = require("comm::util"),
	        Live = require("event/live"),
	        optionsFromDataset = require("comm::options-from-dataset");


    var TgNav = DP.Class({
        initialize: function(node, options){
            var self = this;
            this.node = node;
            this.options = options ? options : {};

            this.mainLevel = this.node.one('#nav-level-main');

            this.mainlevelTriggers = this.mainLevel.all('>ul>li');
            var openTimer = null, closeTimer = null;
            var timeout = 0;
            var mousePath = [];

            $(document).on('mousemove',function(e){

                mousePath.push({
                    x: e.event.clientX,
                    y: e.event.clientY
                });

                var moveResult = 1;
                if(mousePath.length >= 2){

                    mousePath.forEach(function(mp, i){

                        if(i >=1 ){

                            if(mp.x - mousePath[i-1].x <= 1){
                                moveResult = moveResult * 0;

                            }
                        }
                    });
                    mousePath = [];

                    if(moveResult){
                        timeout = 2000;
                    }else{
                        timeout = 0;
                    }

                }

            });

            this.mainlevelTriggers.on('mouseover',function(e){
                if(!$(this).hasClass('no-hover')){
                    var $this = $(this), $navAd = $(this).one('[data-id=nav-ad]');

                    if(closeTimer){
                        clearTimeout(closeTimer);
                    }

                    openTimer = setTimeout(function(){
                        self.mainlevelTriggers.removeClass('hover');
                        $this.addClass('hover');
                        if($navAd.count() && $navAd.attr('data-loaded') !== '1'){
                            var adParam = [], navAdOptions = optionsFromDataset($navAd.el(0));
                            if(navAdOptions.config && navAdOptions.config.key && navAdOptions.config.key !== ''){
                                $navAd.attr('data-loaded','1');
                                adParam.push({id:navAdOptions.config.key, city: DP.data('cityID') , limit: navAdOptions.config.limit ? navAdOptions.config.limit : 1});
                                DP.provide('comm::model/activity-ad',function(D, ActivityAd){
                                    var activityAd = new ActivityAd($this);
                                    activityAd.fetch(true,{'q':JSON.stringify(adParam)},function(data){
                                        self.renderAd($navAd, data[adParam[0].id]);
                                    });
                                });
                            }

                        }
                    },timeout)
                }

            });
            this.mainlevelTriggers.on('mouseout',function(){

                var $node = $(this);

                if(openTimer){
                    clearTimeout(openTimer);
                }
                closeTimer = setTimeout(function(){
                    $node.removeClass('hover');
                },0);


            });



            if(this.node.hasClass('tg-nav-menu-active')){

                this.node.on('mouseenter',function(e){

                    if(self.node.attr('data-loaded') !== '1'){

                        self.node.addClass('on');
                        self.node.attr('data-loaded','1');
                    }

                });


                this.node.on('mouseleave',function(e){

                    self.node.removeClass('on');
                    self.node.attr('data-loaded','0');
                });
            }



        },
        renderAd: function(node, data){

            var imgHeight = 510, html = '';

            if(data.length === 1){
                imgHeight = 510;
            }else if(data.length === 2){
                imgHeight = 255;
            }else{
                return;
            }


            html += '<ul>'
            data.forEach(function(d, i){
                html += '<li><a target="blank" title="'+ d.title+'" href="'+d.link+'"><img height="'+imgHeight+'" width="261" src="'+ d.image+'"/></a></li>'
            });
            html += '</ul>';

            node.html(html);

            node.removeClass('Hide');


        }
    })

    return TgNav;
});