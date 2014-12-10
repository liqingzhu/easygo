//定义简单Map来存储信息  
    function InfoMap() {//初始化map_,给map_对象增加方法，使map_像Map    
             var map_ = new Object();    
             map_.put = function(key, value) {    
                 map_[key+'_'] = value;    
             };    
             map_.get = function(key) {    
                 return map_[key+'_'];    
             };    
             map_.remove = function(key) {    
                 delete map_[key+'_'];    
             }; 
             map_.keyset = function() {    
                 var ret = "";    
                 for(var p in map_) {    
                     if(typeof p == 'string' && p.substring(p.length-1) == "_") {    
                         ret += ",";    
                         ret += p.substring(0,p.length-1);    
                     }    
                 }    
                 if(ret == "") {    
                     return ret.split(",");    
                 } else {    
                      return ret.substring(1).split(",");    
                 }    
             };    
             return map_;    
    }    
    /*   
         var map = InfoMap();  
         map.put("395","12,21,52,89,35");  
         map.put("396","121111,2222221,5333332,8444449,3555555");  
         var map2 = map
         alert(map2.get("395"));//输出：12,21,52,89,35  
         alert(map2.keyset()); //输出：395,396  
     */
var mapObj,toolBar,mouseTool,contextMenu,markerlist,plist,templist;
  //存放点信息
  markerlist = new Array();
  //存放信息和经纬度信息
    var infoMaps = InfoMap();  
  //存放计算在容器范围内的坐标的对象信息
    var tempMaps = InfoMap();  
  //模拟数据坐标
  var x=116.398057 ;
  var y=39.914745;
  //keyset 可以作为id
  for(var t=0;t<100;t++){
    infoMaps.put(t+"id",new AMap.LngLat(
      x+Math.random()*Math.random(),
      y+Math.random()*Math.random()
      )
    );
  }
  //alert(infoMaps.getsize());

//初始化地图对象，加载地图
function mapInit(){
  mapObj = new AMap.Map("mapDiv");
  //地图中添加地图操作ToolBar插件、鼠标工具MouseTool插件
  mapObj.plugin(["AMap.ToolBar","AMap.MouseTool"],function(){   
    toolBar = new AMap.ToolBar(); 
    mapObj.addControl(toolBar); 
        mouseTool = new AMap.MouseTool(mapObj);     
  });
//地图加载完以后 标注视野内点
  // fn();
  //注册两个事件
  var listener1=AMap.event.addListener(mapObj,'zoomchange',fn); 
  var listener1=AMap.event.addListener(mapObj,'dragend',fn);    
  var listener1 = AMap.event.addListener(mapObj,'complete',fn);
  //事件回调中进行点和bounds判断，把在容器内的经纬度存放起来，并用于标点
    function fn(e){
      mapObj.clearMap();
      var tempMaps = InfoMap();  
      var bounds = mapObj.getBounds();
      var keyset = infoMaps.keyset();
        for(var j=0;j<keyset.length;j++){
        var xy = infoMaps.get(keyset[j]);
        var con = bounds.contains(xy);
        if(con){
          tempMaps.put(keyset[j],infoMaps.get(keyset[j]));
        }
      }
      document.getElementById("sub").innerHTML="视野内有："+tempMaps.keyset().length+"个点";
      addMarkers(tempMaps)  
    }
    function addMarkers(tempMaps){
        
      var keyset = tempMaps.keyset();
        for(var i=0;i<keyset.length;i++){
          addMarker(tempMaps.get(keyset[i]),keyset[i]); 
      }
    }
    function addMarker(xy,id){
      var marker = new AMap.Marker({
        map:mapObj,
        position:xy, //基点位置
        icon:"http://webapi.amap.com/images/marker_sprite.png", //marker图标，直接传递地址url
        offset:{x:-8,y:-34} //相对于基点的位置
        }); 
        AMap.event.addListener(marker, "click", function(e){
          var infoWindow = new AMap.InfoWindow
                        ({
                            content:"<h3><font color=\"#00a6ac\">&nbsp;&nbsp;正在送快递的编号"+id+"</font></h3>",
                            size:new AMap.Size(300, 0),
                            autoMove:true,  //设置自动调整信息窗口至视野范围
                offset:new AMap.Pixel(0,-30)
                        });
                    infoWindow.open(mapObj, marker.getPosition());    
        });
    }
}

function loadScript() {
  var script = document.createElement("script");
  script.type = "text/javascript";
  // script.src = "http://webapi.amap.com/maps?v=1.2&key=649986fc76a02015467032647f9ecb1c&callback=mapInit";
 script.src = "http://webapi.amap.com/maps?v=1.2&key=3e4ad80bb35e0d2f4a0ccd9779162923&callback=mapInit";
  document.body.appendChild(script);
}

// window.onload = loadScript;
window.onload = mapInit;