/*! For license information please see script.js.LICENSE.txt */
(()=>{"use strict";var e={733:(e,t,o)=>{o.r(t),o.d(t,{Properties:()=>n,VariableDescriptor:()=>r,bootstrapExtra:()=>J,findLayerBoundaries:()=>p,findLayersBoundaries:()=>u,getAllVariables:()=>i,getLayersMap:()=>c,initDoors:()=>q,initPropertiesTemplates:()=>k,initVariableActionLayer:()=>X});class n{constructor(e){this.properties=null!=e?e:[]}get(e){const t=this.properties.filter((t=>t.name===e)).map((e=>e.value));if(t.length>1)throw new Error('Expected only one property to be named "'+e+'"');if(0!==t.length)return t[0]}getString(e){return this.getByType(e,"string")}getNumber(e){return this.getByType(e,"number")}getBoolean(e){return this.getByType(e,"boolean")}getByType(e,t){const o=this.get(e);if(void 0!==o){if(typeof o!==t)throw new Error('Expected property "'+e+'" to have type "'+t+'"');return o}}mustGetString(e){return this.mustGetByType(e,"string")}mustGetNumber(e){return this.mustGetByType(e,"number")}mustGetBoolean(e){return this.mustGetByType(e,"boolean")}mustGetByType(e,t){const o=this.get(e);if(void 0===o)throw new Error('Property "'+e+'" is missing');if(typeof o!==t)throw new Error('Expected property "'+e+'" to have type "'+t+'"');return o}getType(e){const t=this.properties.filter((t=>t.name===e)).map((e=>e.type));if(t.length>1)throw new Error('Expected only one property to be named "'+e+'"');if(0!==t.length)return t[0]}}class r{constructor(e){this.name=e.name,this.x=e.x,this.y=e.y,this.properties=new n(e.properties)}get isReadable(){const e=this.properties.getString("readableBy");return!e||WA.player.tags.includes(e)}get isWritable(){const e=this.properties.getString("writableBy");return!e||WA.player.tags.includes(e)}}async function i(){const e=await WA.room.getTiledMap(),t=new Map;return s(e.layers,t),t}function s(e,t){for(const o of e)if("objectgroup"===o.type)for(const e of o.objects)"variable"===e.type&&t.set(e.name,new r(e));else"group"===o.type&&s(o.layers,t)}let a;async function c(){return void 0===a&&(a=async function(){return function(e){const t=new Map;return l(e.layers,"",t),t}(await WA.room.getTiledMap())}()),a}function l(e,t,o){for(const n of e)"group"===n.type?l(n.layers,t+n.name+"/",o):(n.name=t+n.name,o.set(n.name,n))}function p(e){let t=1/0,o=1/0,n=0,r=0;const i=e.data;if("string"==typeof i)throw new Error("Unsupported tile layer data stored as string instead of CSV");for(let s=0;s<e.height;s++)for(let a=0;a<e.width;a++)0!==i[a+s*e.width]&&(t=Math.min(t,a),r=Math.max(r,a),o=Math.min(o,s),n=Math.max(n,s));return{top:o,left:t,right:r+1,bottom:n+1}}function u(e){let t=1/0,o=1/0,n=0,r=0;for(const i of e){const e=p(i);e.left<t&&(t=e.left),e.top<o&&(o=e.top),e.right>r&&(r=e.right),e.bottom>n&&(n=e.bottom)}return{top:o,left:t,right:r,bottom:n}}var g=Object.prototype.toString,h=Array.isArray||function(e){return"[object Array]"===g.call(e)};function f(e){return"function"==typeof e}function d(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function m(e,t){return null!=e&&"object"==typeof e&&t in e}var y=RegExp.prototype.test,v=/\S/;var b={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"},w=/\s*/,A=/\s+/,W=/\s*=/,S=/\s*\}/,C=/#|\^|\/|>|\{|&|=|!/;function x(e){this.string=e,this.tail=e,this.pos=0}function E(e,t){this.view=e,this.cache={".":this.view},this.parent=t}function T(){this.templateCache={_cache:{},set:function(e,t){this._cache[e]=t},get:function(e){return this._cache[e]},clear:function(){this._cache={}}}}x.prototype.eos=function(){return""===this.tail},x.prototype.scan=function(e){var t=this.tail.match(e);if(!t||0!==t.index)return"";var o=t[0];return this.tail=this.tail.substring(o.length),this.pos+=o.length,o},x.prototype.scanUntil=function(e){var t,o=this.tail.search(e);switch(o){case-1:t=this.tail,this.tail="";break;case 0:t="";break;default:t=this.tail.substring(0,o),this.tail=this.tail.substring(o)}return this.pos+=t.length,t},E.prototype.push=function(e){return new E(e,this)},E.prototype.lookup=function(e){var t,o,n,r=this.cache;if(r.hasOwnProperty(e))t=r[e];else{for(var i,s,a,c=this,l=!1;c;){if(e.indexOf(".")>0)for(i=c.view,s=e.split("."),a=0;null!=i&&a<s.length;)a===s.length-1&&(l=m(i,s[a])||(o=i,n=s[a],null!=o&&"object"!=typeof o&&o.hasOwnProperty&&o.hasOwnProperty(n))),i=i[s[a++]];else i=c.view[e],l=m(c.view,e);if(l){t=i;break}c=c.parent}r[e]=t}return f(t)&&(t=t.call(this.view)),t},T.prototype.clearCache=function(){void 0!==this.templateCache&&this.templateCache.clear()},T.prototype.parse=function(e,t){var o=this.templateCache,n=e+":"+(t||M.tags).join(":"),r=void 0!==o,i=r?o.get(n):void 0;return null==i&&(i=function(e,t){if(!e)return[];var o,n,r,i,s=!1,a=[],c=[],l=[],p=!1,u=!1,g="",f=0;function m(){if(p&&!u)for(;l.length;)delete c[l.pop()];else l=[];p=!1,u=!1}function b(e){if("string"==typeof e&&(e=e.split(A,2)),!h(e)||2!==e.length)throw new Error("Invalid tags: "+e);o=new RegExp(d(e[0])+"\\s*"),n=new RegExp("\\s*"+d(e[1])),r=new RegExp("\\s*"+d("}"+e[1]))}b(t||M.tags);for(var E,T,P,L,V,k,_=new x(e);!_.eos();){if(E=_.pos,P=_.scanUntil(o))for(var j=0,B=P.length;j<B;++j)i=L=P.charAt(j),function(e,t){return y.call(e,t)}(v,i)?(u=!0,s=!0,g+=" "):(l.push(c.length),g+=L),c.push(["text",L,E,E+1]),E+=1,"\n"===L&&(m(),g="",f=0,s=!1);if(!_.scan(o))break;if(p=!0,T=_.scan(C)||"name",_.scan(w),"="===T?(P=_.scanUntil(W),_.scan(W),_.scanUntil(n)):"{"===T?(P=_.scanUntil(r),_.scan(S),_.scanUntil(n),T="&"):P=_.scanUntil(n),!_.scan(n))throw new Error("Unclosed tag at "+_.pos);if(V=">"==T?[T,P,E,_.pos,g,f,s]:[T,P,E,_.pos],f++,c.push(V),"#"===T||"^"===T)a.push(V);else if("/"===T){if(!(k=a.pop()))throw new Error('Unopened section "'+P+'" at '+E);if(k[1]!==P)throw new Error('Unclosed section "'+k[1]+'" at '+E)}else"name"===T||"{"===T||"&"===T?u=!0:"="===T&&b(P)}if(m(),k=a.pop())throw new Error('Unclosed section "'+k[1]+'" at '+_.pos);return function(e){for(var t,o=[],n=o,r=[],i=0,s=e.length;i<s;++i)switch((t=e[i])[0]){case"#":case"^":n.push(t),r.push(t),n=t[4]=[];break;case"/":r.pop()[5]=t[2],n=r.length>0?r[r.length-1][4]:o;break;default:n.push(t)}return o}(function(e){for(var t,o,n=[],r=0,i=e.length;r<i;++r)(t=e[r])&&("text"===t[0]&&o&&"text"===o[0]?(o[1]+=t[1],o[3]=t[3]):(n.push(t),o=t));return n}(c))}(e,t),r&&o.set(n,i)),i},T.prototype.render=function(e,t,o,n){var r=this.getConfigTags(n),i=this.parse(e,r),s=t instanceof E?t:new E(t,void 0);return this.renderTokens(i,s,o,e,n)},T.prototype.renderTokens=function(e,t,o,n,r){for(var i,s,a,c="",l=0,p=e.length;l<p;++l)a=void 0,"#"===(s=(i=e[l])[0])?a=this.renderSection(i,t,o,n,r):"^"===s?a=this.renderInverted(i,t,o,n,r):">"===s?a=this.renderPartial(i,t,o,r):"&"===s?a=this.unescapedValue(i,t):"name"===s?a=this.escapedValue(i,t,r):"text"===s&&(a=this.rawValue(i)),void 0!==a&&(c+=a);return c},T.prototype.renderSection=function(e,t,o,n,r){var i=this,s="",a=t.lookup(e[1]);if(a){if(h(a))for(var c=0,l=a.length;c<l;++c)s+=this.renderTokens(e[4],t.push(a[c]),o,n,r);else if("object"==typeof a||"string"==typeof a||"number"==typeof a)s+=this.renderTokens(e[4],t.push(a),o,n,r);else if(f(a)){if("string"!=typeof n)throw new Error("Cannot use higher-order sections without the original template");null!=(a=a.call(t.view,n.slice(e[3],e[5]),(function(e){return i.render(e,t,o,r)})))&&(s+=a)}else s+=this.renderTokens(e[4],t,o,n,r);return s}},T.prototype.renderInverted=function(e,t,o,n,r){var i=t.lookup(e[1]);if(!i||h(i)&&0===i.length)return this.renderTokens(e[4],t,o,n,r)},T.prototype.indentPartial=function(e,t,o){for(var n=t.replace(/[^ \t]/g,""),r=e.split("\n"),i=0;i<r.length;i++)r[i].length&&(i>0||!o)&&(r[i]=n+r[i]);return r.join("\n")},T.prototype.renderPartial=function(e,t,o,n){if(o){var r=this.getConfigTags(n),i=f(o)?o(e[1]):o[e[1]];if(null!=i){var s=e[6],a=e[5],c=e[4],l=i;0==a&&c&&(l=this.indentPartial(i,c,s));var p=this.parse(l,r);return this.renderTokens(p,t,o,l,n)}}},T.prototype.unescapedValue=function(e,t){var o=t.lookup(e[1]);if(null!=o)return o},T.prototype.escapedValue=function(e,t,o){var n=this.getConfigEscape(o)||M.escape,r=t.lookup(e[1]);if(null!=r)return"number"==typeof r&&n===M.escape?String(r):n(r)},T.prototype.rawValue=function(e){return e[1]},T.prototype.getConfigTags=function(e){return h(e)?e:e&&"object"==typeof e?e.tags:void 0},T.prototype.getConfigEscape=function(e){return e&&"object"==typeof e&&!h(e)?e.escape:void 0};var M={name:"mustache.js",version:"4.2.0",tags:["{{","}}"],clearCache:void 0,escape:void 0,parse:void 0,render:void 0,Scanner:void 0,Context:void 0,Writer:void 0,set templateCache(e){P.templateCache=e},get templateCache(){return P.templateCache}},P=new T;M.clearCache=function(){return P.clearCache()},M.parse=function(e,t){return P.parse(e,t)},M.render=function(e,t,o,n){if("string"!=typeof e)throw new TypeError('Invalid template! Template should be a "string" but "'+(h(r=e)?"array":typeof r)+'" was given as the first argument for mustache#render(template, view, partials)');var r;return P.render(e,t,o,n)},M.escape=function(e){return String(e).replace(/[&<>"'`=\/]/g,(function(e){return b[e]}))},M.Scanner=x,M.Context=E,M.Writer=T;const L=M;class V{constructor(e,t){this.template=e,this.state=t,this.ast=L.parse(e)}getValue(){return void 0===this.value&&(this.value=L.render(this.template,this.state)),this.value}onChange(e){const t=[];for(const o of this.getUsedVariables().values())t.push(this.state.onVariableChange(o).subscribe((()=>{const t=L.render(this.template,this.state);t!==this.value&&(this.value=t,e(this.value))})));return{unsubscribe:()=>{for(const e of t)e.unsubscribe()}}}isPureString(){return 0===this.ast.length||1===this.ast.length&&"text"===this.ast[0][0]}getUsedVariables(){const e=new Set;return this.recursiveGetUsedVariables(this.ast,e),e}recursiveGetUsedVariables(e,t){for(const o of e){const e=o[0],n=o[1],r=o[4];["name","&","#","^"].includes(e)&&t.add(n),void 0!==r&&"string"!=typeof r&&this.recursiveGetUsedVariables(r,t)}}}async function k(){var e;const t=await c();for(const[o,n]of t.entries()){const t=null!==(e=n.properties)&&void 0!==e?e:[];for(const e of t){if("int"===e.type||"bool"===e.type||"object"===e.type||"string"!=typeof e.value)continue;const t=new V(e.value,WA.state);if(t.isPureString())continue;const n=t.getValue();_(o,e.name,n),t.onChange((t=>{_(o,e.name,t)}))}}}function _(e,t,o){WA.room.setProperty(e,t,o),"visible"===t&&(o?WA.room.showLayer(e):WA.room.hideLayer(e))}const j="https://unpkg.com/@workadventure/scripting-api-extra@1.1.1/dist";let B,G,U=0,Z=0;function O(e){if(WA.state[e.name]){let t=e.properties.mustGetString("openLayer");for(const e of t.split("\n"))WA.room.showLayer(e);t=e.properties.mustGetString("closeLayer");for(const e of t.split("\n"))WA.room.hideLayer(e)}else{let t=e.properties.mustGetString("openLayer");for(const e of t.split("\n"))WA.room.hideLayer(e);t=e.properties.mustGetString("closeLayer");for(const e of t.split("\n"))WA.room.showLayer(e)}}function R(e){return e.map((e=>B.get(e))).filter((e=>"tilelayer"===(null==e?void 0:e.type)))}function z(e){const t=u(R(e)),o=32*((t.right-t.left)/2+t.left),n=32*((t.bottom-t.top)/2+t.top);return Math.sqrt(Math.pow(U-o,2)+Math.pow(Z-n,2))}function D(e){WA.state.onVariableChange(e.name).subscribe((()=>{WA.state[e.name]?function(e){const t=e.properties.getString("openSound"),o=e.properties.getNumber("soundRadius");let n=1;if(o){const t=z(e.properties.mustGetString("openLayer").split("\n"));if(t>o)return;n=1-t/o}t&&WA.sound.loadSound(t).play({volume:n})}(e):function(e){const t=e.properties.getString("closeSound"),o=e.properties.getNumber("soundRadius");let n=1;if(o){const t=z(e.properties.mustGetString("closeLayer").split("\n"));if(t>o)return;n=1-t/o}t&&WA.sound.loadSound(t).play({volume:n})}(e),O(e)})),O(e)}function I(e,t,o,n){const r=e.name;let i,s,a=!1;const c=o.getString("zone");if(!c)throw new Error('Missing "zone" property on doorstep layer "'+r+'"');const l=o.getString("tag");let p=!0;l&&!WA.player.tags.includes(l)&&(p=!1);const g=!!l;function h(){var e;i&&i.remove(),i=WA.ui.displayActionMessage({message:null!==(e=o.getString("closeTriggerMessage"))&&void 0!==e?e:"Press SPACE to close the door",callback:()=>{WA.state[t.name]=!1,f()}})}function f(){var e;i&&i.remove(),i=WA.ui.displayActionMessage({message:null!==(e=o.getString("openTriggerMessage"))&&void 0!==e?e:"Press SPACE to open the door",callback:()=>{WA.state[t.name]=!0,h()}})}function d(){s&&(WA.room.website.delete(s.name),s=void 0)}WA.room.onEnterZone(c,(()=>{a=!0,o.getBoolean("autoOpen")&&p?WA.state[t.name]=!0:WA.state[t.name]||(!g||p)&&g||!o.getString("code")&&!o.getString("codeVariable")?p&&(WA.state[t.name]?h():f()):function(e){const o=u(R(t.properties.mustGetString("closeLayer").split("\n")));s=WA.room.website.create({name:"doorKeypad"+e,url:n+"/keypad.html#"+encodeURIComponent(e),position:{x:32*o.right,y:32*o.top,width:96,height:128},allowApi:!0})}(r)})),WA.room.onLeaveZone(c,(()=>{a=!1,o.getBoolean("autoClose")&&(WA.state[t.name]=!1),i&&i.remove(),d()})),WA.state.onVariableChange(t.name).subscribe((()=>{a&&(o.getBoolean("autoClose")||!0!==WA.state[t.name]||h(),s&&!0===WA.state[t.name]&&d(),o.getBoolean("autoOpen")||!1!==WA.state[t.name]||f())}))}function N(e){void 0===WA.state[e.name]&&(WA.state[e.name]=0),WA.state.onVariableChange(e.name).subscribe((()=>{WA.state[e.name]&&function(e){const t=e.properties.mustGetString("bellSound"),o=e.properties.getNumber("soundRadius");let n=1;if(o){const t=Math.sqrt(Math.pow(e.x-U,2)+Math.pow(e.y-Z,2));if(t>o)return;n=1-t/o}WA.sound.loadSound(t).play({volume:n})}(e)}))}function $(e,t){let o;const n=t.mustGetString("zone"),r=t.getString("bellPopup");WA.room.onEnterZone(n,(()=>{var n;r?o=WA.ui.openPopup(r,"",[{label:null!==(n=t.getString("bellButtonText"))&&void 0!==n?n:"Ring",callback:()=>{WA.state[e]=WA.state[e]+1}}]):WA.state[e]=WA.state[e]+1})),WA.room.onLeaveZone(n,(()=>{o&&(o.close(),o=void 0)}))}async function q(e){e=null!=e?e:j;const t=await i();B=await c();for(const e of t.values())e.properties.get("door")&&D(e),e.properties.get("bell")&&N(e);for(const o of B.values()){const r=new n(o.properties),i=r.getString("doorVariable");if(i&&"tilelayer"===o.type){const n=t.get(i);if(void 0===n)throw new Error('Cannot find variable "'+i+'" referred in the "doorVariable" property of layer "'+o.name+'"');I(o,n,r,e)}const s=r.getString("bellVariable");s&&$(s,r)}WA.player.onPlayerMove((e=>{U=e.x,Z=e.y}))}function X(e){const t=e.getString("bindVariable");if(t){const o=e.getString("zone");if(!o)throw new Error('A layer with a "bindVariable" property must ALSO have a "zone" property.');!function(e,t,o,n,r,i){i&&!WA.player.tags.includes(i)||(void 0!==o&&WA.room.onEnterZone(t,(()=>{r||(WA.state[e]=o)})),void 0!==n&&WA.room.onLeaveZone(t,(()=>{WA.state[e]=n})))}(t,o,e.get("enterValue"),e.get("leaveValue"),e.getString("triggerMessage"),e.getString("tag"))}}function F(e,t){let o;const n=t.getString("zone");if(!n)throw new Error('Missing "zone" property');const r=t.getString("openConfigAdminTag");let i=!0;function s(){WA.nav.closeCoWebSite()}r&&!WA.player.tags.includes(r)&&(i=!1),WA.room.onEnterZone(n,(()=>{const n=t.getString("openConfigTrigger");var r;i&&(n&&"onaction"===n?(o&&o.remove(),o=WA.ui.displayActionMessage({message:null!==(r=t.getString("openConfigTriggerMessage"))&&void 0!==r?r:"Press SPACE or touch here to configure",callback:()=>H(e)})):H(e))})),WA.room.onLeaveZone(n,(()=>{o?(o.remove(),s()):s()}))}function H(e){const t=e?"#"+e:"";WA.nav.openCoWebSite(j+"/configuration.html"+t,!0)}function J(){return WA.onInit().then((()=>{q().catch((e=>console.error(e))),async function(){const e=await c();for(const t of e.values())X(new n(t.properties))}().catch((e=>console.error(e))),async function(e){const t=await WA.room.getTiledMap();e=null!=e?e:j,G=await c();const o=t.layers.find((e=>"configuration"===e.name));if(o){const t=new n(o.properties).getString("tag");t&&!WA.player.tags.includes(t)||WA.ui.registerMenuCommand("Configure the room",(()=>{WA.nav.openCoWebSite(e+"/configuration.html",!0)}));for(const e of G.values()){const t=new n(e.properties),o=t.getString("openConfig");o&&"tilelayer"===e.type&&F(o,t)}}}().catch((e=>console.error(e))),k().catch((e=>console.error(e)))}))}},607:function(e,t,o){var n=this&&this.__awaiter||function(e,t,o,n){return new(o||(o=Promise))((function(r,i){function s(e){try{c(n.next(e))}catch(e){i(e)}}function a(e){try{c(n.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?r(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(s,a)}c((n=n.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const r=o(733);let i;(0,r.bootstrapExtra)().catch((e=>console.error(e)));const s=new Date,a=new Date("December 16, 2021 16:30:00"),c=new Date("December 16, 2021 18:30:00"),l=s.getHours()+":"+s.getMinutes(),p=s.getTime(),u=a.getTime();c.getTime(),WA.onInit().then((()=>n(void 0,void 0,void 0,(function*(){const e=(u-p)/36e5;for(let t=5;t>0;t--)e<t&&WA.room.hideLayer(`countdown/${t}`);WA.ui.registerMenuCommand("Preise",{iframe:"shop.html"}),WA.room.onEnterZone("nyan2",(()=>{i=WA.ui.openPopup("clockPopup","It's "+l,[])})),WA.room.onLeaveZone("nyan2",(function(){void 0!==i&&(i.close(),i=void 0)})),WA.room.onEnterZone("communityspace",(()=>{WA.chat.sendChatMessage("Join the GCXMAS Quiz! https://sli.do/v5B13dcujvVXbgmabj6rgN","Santa")})),WA.room.onEnterZone("secret_trigger",(()=>{WA.room.hideLayer("secret_door_outside")})),WA.room.onLeaveZone("secret_trigger",(()=>{setTimeout((()=>{WA.room.showLayer("secret_door_outside")}),2e3)}));const t=["elevator_door_1","elevator_door_2","meeting_door_1","meeting_door_2","meeting_door_3","main_door_1"];for(const e of t)WA.room.onEnterZone(e,(()=>{WA.room.hideLayer(`level/${e}`)})),WA.room.onLeaveZone(e,(()=>{WA.room.showLayer(`level/${e}`)}));const o=!WA.room.id.match(/\.json/gi);if(WA.room.onEnterZone("gotoholzmarkt",(()=>{(WA.player.name.match(/giga/gi)||p>=u)&&(o?WA.nav.goToRoom("/@/grandcentrix/grandcentrix/holzmarkt"):WA.nav.goToRoom("holzmarkt.json"))})),o){const e=yield(0,r.getLayersMap)();for(const t of e.values()){const e=new r.Properties(t.properties).getString("exitUrlProd");e&&WA.room.setProperty(t.name,"exitUrl",e)}}}))))}},t={};function o(n){var r=t[n];if(void 0!==r)return r.exports;var i=t[n]={exports:{}};return e[n].call(i.exports,i,i.exports,o),i.exports}o.d=(e,t)=>{for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o(607)})();
//# sourceMappingURL=script.js.map