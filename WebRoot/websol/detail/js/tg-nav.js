$scope.click(function(event) {
    /* Act on the event */
    alert('message');
});
$(document).ready(function($) {
    // alert('message');
    console.log('---------');
    var navmenu   = $('#nav-menu');
    navmenu.on('click',  function(event) {
        alert('message');
    });
    console.log("---------abc-------->");
    console.log($("#btninfo"));
     $('#btninfo').bind('click', function() {
          alert('User clicked on "foo."');
        });
      console.log($("#infobtninfo"));
      console.log("--------abc------->");
     $("#btninfo").bind('click', function() {alert("That tickles!"); });
    console.log('---------->'+navmenu);
    var mainLevel = $('#nav-level-main');
    console.log(mainLevel);
    var mainlevelTriggers = mainLevel.children('ul,li');
    var openTimer = null, closeTimer = null;
    var timeout = 0;
    var mousePath = [];
    $(document).on('mousemove',function(e){
            mousePath.push({
                x: e.clientX,
                y: e.clientY
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

    console.log("---------");
mainLevel.on('mouseover', function(event) {
   console.log('-----------------------||===========');
});
    mainlevelTriggers.on('mouseover',function(e){
            console.log('---------------');
            mainlevelTriggers.addClass('hover');

                if(!$(this).hasClass('no-hover')){
                    var $this = $(this), $navAd = $(this).one('[data-id=nav-ad]');

                    if(closeTimer){
                        clearTimeout(closeTimer);
                    }

                    openTimer = setTimeout(function(){
                        self.mainlevelTriggers.removeClass('hover');
                        $this.addClass('hover');
                      
                    },timeout)
                }

            });
           /* this.mainlevelTriggers.on('mouseout',function(){

                var $node = $(this);

                if(openTimer){
                    clearTimeout(openTimer);
                }
                closeTimer = setTimeout(function(){
                    $node.removeClass('hover');
                },0);


            });*/



});

/**
 * @author daxuan.she
 * @date 11/08/2014
 * 新首页页头菜单
 */
/*DP.define(["comm::util","io/ajax","comm::options-from-dataset",'event/live'],
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
});*/