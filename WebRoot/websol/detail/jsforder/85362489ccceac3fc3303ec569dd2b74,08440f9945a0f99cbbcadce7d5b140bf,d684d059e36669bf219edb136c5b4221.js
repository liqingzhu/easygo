DP.define('/lib/1.0/io/ajax.js',["util/json"],function(d,x){function h(a,b,c){var f=arguments.length;return this instanceof h&&b&&1<f?(c=c||{},c.method="GET",c.url=data,(new m(c)).on("success",b).send(data)):new m(a)}function s(){return new XMLHttpRequest}function y(a){var b=!1,c;try{c=a.status,b=200<=c&&300>c||1223===c}catch(f){}return b}function t(a){return a}function z(){return!0}var u=x("util/json"),l=d.__HOST,n=function(){},A=/^&+|&+$/,B=/#.*/,o=l.ActiveXObject?function(){if(l.XMLHttpRequest)try{return s()}catch(a){}try{return new l.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}:
s,C={Accept:{xml:"aplication/xml, text/xml",html:"text/html",script:"text/javascript, application/javascript",json:"application/json, text/javascript",text:"text/plain","*":"*/*"},"X-Request":{json:"JSON"}},p={xml:"responseXML",text:"responseText"},D={url:"",method:"GET",dataType:"json",async:!0,timeout:0,cache:!0,user:"",password:"",headers:{"X-Requested-With":"XMLHttpRequest"},parser:t,santitizer:t},v=o(),q="onprogress"in v,m=d.Class({Implements:"attrs events",initialize:function(a){var b=this,
c=d.bind;b.set({opt:a});b.xhr=o();b.headers=b._makeHeaders();b.timer=d.delay(function(){b.fire("timeout");b.cancel()},b.get("opt").timeout);c("_stateChange",b);q&&(c("_loadstart",b),c("_progress",b))},_makeHeaders:function(){var a=this.get("opt"),b=a.dataType||"*",c=a.headers;d.each(C,function(a,d){var e=a[b];e&&(c[d]=e)});"post"===a.method.toLowerCase()&&(c["Content-Type"]="application/x-www-form-urlencoded;charset=UTF-8;");return c},_stateChange:function(){var a=this.get("opt"),b=this.xhr,c=a.isSuccess||
z,f=a.isXHRSuccess||y,d;4===b.readyState&&this.running&&(this.running=!1,b.onreadystatechange=n,this.timer.cancel(),a=this._parseResponse(b),d=[a,b],this.fire(!this.parseError&&f(b)&&c(a)?"success":"error",d))},_parseResponse:function(a){var b=this.get("opt"),c=b.santitizer,f=b.parser,b=b.dataType,a=c(a[p[b]||p.text]||a[p.text]);if(-1<b.indexOf("json"))try{a=u.parse(a),this.parseError=!1}catch(d){a={},this.parseError=!0}return f(a)},send:function(a){var b=this.get("opt"),c=(b.method||"GET").toUpperCase(),
f=String(b.url).replace(B,"")||d.getLocation().pathname,E=this.headers,e=this.xhr;this.running=!0;a=this._tidyRequest(a);if(!b.cache)var k=d.guid(),f=f+(-1<f.indexOf("?")?"&":"?")+k;a&&"GET"===c&&(f=f+(-1<f.indexOf("?")?"&":"?")+a,a=void 0);q&&(e.onloadstart=this._loadstart,e.onprogress=this._progress);b.user?e.open(c,f,b.async,b.user,b.password):e.open(c,f,b.async);b.user&&"withCredentials"in e&&(e.withCredentials=!0);e.onreadystatechange=this._stateChange;d.each(E,function(a,b){try{e.setRequestHeader(b,
a)}catch(c){}});this.fire("request");e.send(a);!b.async&&this._stateChange();b.timeout&&this.timer.start();return this},_tidyRequest:function(a){a=(void 0===a?this.get("opt").data:a)||"";d.isObject(a)?a=d.toQueryString(a):d.isString(a)&&(a=a.replace(A,""));return a},_loadstart:function(a){this.fire("loadstart",[a,this.xhr])},_progress:function(a){this.fire("progress",[a,this.xhr])},cancel:function(){if(this.running){this.running=!1;var a=this.xhr;a.abort();this.timer.cancel();a.onreadystatechange=
n;q&&(a.onprogress=a.onloadstart=n);this.xhr=o();this.fire("cancel")}return this}});d.Class.setAttrs(m,{opt:{value:D,setter:function(a){return d.mix(this.get("opt"),a)}}});var v=null,F=h,r=function(a){return a.xhr},r=r||function(a){return a},G=500;window.__ajaxMonitor={};var w=window.__ajaxMonitor.queue=[];return h=function(a){function b(b,c){if(!f){var e=+new Date,h="http://"+(location.host.match(".dianping.com")?"114.80.165.63":"192.168.213.233:8080")+"/broker-service/api/single?",j=d,i=a.url.split("?")[0],
k=document.createElement("a");k.href=i;var g,e={v:1,ts:j,tu:k.href,d:e-d,hs:b,ec:c},j=encodeURIComponent,i=[];for(g in e)e[g]&&i.push(g+"="+j(e[g]));g=i.join("&");h+=g;g=new Image;w.push(g);g.onerror=function(){w.pop()};g.src=h;f=!0}}var c,f=!1,d,e=(new F(a)).on("timeout",function(){b("-910",null)}),k=r(e),h=e.send;e.send=function(m){function l(d,h){d.onreadystatechange=function(){if(!f){var j=d.readyState;(c||null!==c)&&clearTimeout(c);4!==j&&(c=setTimeout(b,G,"-90"+j,null))}if(4===d.readyState&&
!f){a:{var i;try{i=d.status}catch(k){j=null;break a}j=i}i=a.contentType;var g;if(!i||-1!==i.indexOf("json"))try{g=u.parse(d.responseText),b(j,g.code)}catch(l){b("-905",null)}}h&&e._stateChange()}}d=+new Date;l(k);h.call(e,m);l(k,!0);return this};return e}});


DP.define('/lib/1.0/io/jsonp.js',function(b){function i(a,b,f){if(a)var c=a.length-1,e="&"===a[0],g="&"===a[c],a=b?e?a:"&"+a:e?a.substr(1):a,c=a.length-1,a=f?g?a:a+"&":g?a.substr(0,c):err;return a||""}var j=0,h=b.Class({Implements:"events attrs",initialize:function(a){this.set({opt:a})},send:function(a){var d=this,f,c,e=++j,g=b._JSONPRequest;a||(a={});b.isString(a)&&(f=a,a={});b.mix(a,d.get("opt"),!1);b.isString(f)||(f=b.toQueryString(a.data));c=a;var h=c.url.split("?");c=h[0]+"?"+i(h[1],!1,!0)+i(f,!1,!0)+c.callbackKey+
"=DP._JSONPRequest._"+e;if(2083<c.length)return d.fire("error",c);g["_"+e]=function(){d.__success.apply(d,arguments);delete g["_"+e]};d._clear();d.script=$(b.load(c,!1,"js"));d.fire("request");a.timeout&&setTimeout(function(){d.fire("timeout").fire("failure").cancel()},a.timeout);return e},__success:function(){this.fire("success",arguments)},cancel:function(){return this._clear().fire("cancel")},_clear:function(){var a=this.script;a&&a.destroy();this.script=null;return this}});b.Class.setAttrs(h,
{opt:{value:{url:"",callbackKey:"callback",data:"",timeout:0},setter:function(a){return b.mix(this.get("opt"),a)}}});b._JSONPRequest={};return h});


DP.define('/lib/1.0/io/swiff.js',function(c){function j(a){var b=a+"_"+c.guid()+Math.floor(100*Math.random());h("#"+b).count()&&(b=j(a));return b}var e={},h=c.DOM,k=c.Class,i=c.UA,l={align:"",allowFullScreen:"",allowNetworking:"",allowScriptAccess:"",base:"",bgcolor:"",menu:"",name:"",quality:"",salign:"",scale:"",tabindex:"",wmode:""},m=encodeURIComponent,g=null,f=0,g=i.getFlashVersion(),e=new k({Implements:"events attrs",initialize:function(a,b,d){if(!g)return this.__callEvent("noflash"),null;this.set(d);this.id=d=j(this.get("id"));
this._url=a;this._container=h(b);this._container.html(this._buildHTML());f++;e._instances[d]=this},_url:null,_container:null,id:"",toElement:function(){return this._container.child().el(0)},_buildFlashVars:function(a){c.mix(a,{flashId:this.id});return'<param name="flashVars" value="'+c.toQueryString(a)+'"/>'},_buildFlashParams:function(a){var b="";i.ie&&(b+='<param name="movie" value="'+this._cacheCtrl(this._url)+'"/>');for(var d in a)l.hasOwnProperty(d)&&(b+='<param name="'+d+'" value="'+m(a[d])+
'"/>');return b},__callEvent:function(a){var b=this;setTimeout(function(){b.fire(a)},0)},__asCalljs:function(a,b){this.fire(a,b)},_cacheCtrl:function(a){return this.get("cached")?a:a+(/.*\?.*/.test(a)?"&":"?")+"nocache="+Math.random()},_buildHTML:function(){var a="<object ",b=this._cacheCtrl(this._url),d=this.get("flashVars"),a=a+('id="'+this.id+'" '),a=i.ie?a+'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" ':a+('type="application/x-shockwave-flash" data="'+b+'" '),a=a+('width="'+this.get("width")+
'" height="'+this.get("height")+'">'),a=a+this._buildFlashParams(this.get("params"));d&&(a+=this._buildFlashVars(this.get("flashVars")));return a+"</object>"},remote:function(a,b){var d=this.toElement();if(d)return d[a].apply(d,b||[]);c.log("no swf element!");return null},destroy:function(){h(this.toElement()).destroy();f&&f--},toString:function(){return this.id}});e._instances=e._instances||{};c.mix(e,{getFlashVersion:function(){return g},isVersionGreater:function(a,b,d){var c=g,e=c.major,f=c.minor,
c=c.revision,a=parseInt(a||0,10)||0,b=parseInt(b||0,10)||0,d=parseInt(d||0,10)||0;return a===e?b===f?d<=c:b<f:a<e},count:function(){var a=f;return 0>a?0:a}});k.setAttrs(e,{id:{value:"Swiff",setter:function(a){return a},validator:function(a){return c.isString(a)}},width:{value:"100%",setter:function(a){return parseInt(a,10)||0},validator:function(a){return c.isNumber(a)}},height:{value:"100%",setter:function(a){return parseInt(a,10)||0},validator:function(a){return c.isNumber(a)}},flashVars:{value:{debugOn:!0}},
params:{value:{quality:"high",allowScriptAccess:"always",wmode:"opacity"}},cached:{value:!0,setter:function(a){return!!a}}});c.__SwiffInstances=e._instances||{};return e});
