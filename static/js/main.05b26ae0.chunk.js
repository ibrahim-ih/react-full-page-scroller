/*! For license information please see main.05b26ae0.chunk.js.LICENSE.txt */
(this["webpackJsonpreact-full-page-scroller-example"]=this["webpackJsonpreact-full-page-scroller-example"]||[]).push([[0],[,,function(e,t,n){e.exports=n(11)},function(e,t,n){},,,,,,,function(e,t,n){},function(e,t,n){"use strict";n.r(t);n(3);var r=n(0),o=n.n(r),a=n(1),i=n.n(a);function c(e,t){return e(t={exports:{}},t.exports),t.exports}var l="function"===typeof Symbol&&Symbol.for,s=l?Symbol.for("react.element"):60103,u=l?Symbol.for("react.portal"):60106,p=l?Symbol.for("react.fragment"):60107,f=l?Symbol.for("react.strict_mode"):60108,d=l?Symbol.for("react.profiler"):60114,y=l?Symbol.for("react.provider"):60109,g=l?Symbol.for("react.context"):60110,m=l?Symbol.for("react.async_mode"):60111,v=l?Symbol.for("react.concurrent_mode"):60111,h=l?Symbol.for("react.forward_ref"):60112,b=l?Symbol.for("react.suspense"):60113,S=l?Symbol.for("react.suspense_list"):60120,w=l?Symbol.for("react.memo"):60115,x=l?Symbol.for("react.lazy"):60116,P=l?Symbol.for("react.block"):60121,E=l?Symbol.for("react.fundamental"):60117,C=l?Symbol.for("react.responder"):60118,j=l?Symbol.for("react.scope"):60119;function O(e){if("object"===typeof e&&null!==e){var t=e.$$typeof;switch(t){case s:switch(e=e.type){case m:case v:case p:case d:case f:case b:return e;default:switch(e=e&&e.$$typeof){case g:case h:case x:case w:case y:return e;default:return t}}case u:return t}}}function T(e){return O(e)===v}var N={AsyncMode:m,ConcurrentMode:v,ContextConsumer:g,ContextProvider:y,Element:s,ForwardRef:h,Fragment:p,Lazy:x,Memo:w,Portal:u,Profiler:d,StrictMode:f,Suspense:b,isAsyncMode:function(e){return T(e)||O(e)===m},isConcurrentMode:T,isContextConsumer:function(e){return O(e)===g},isContextProvider:function(e){return O(e)===y},isElement:function(e){return"object"===typeof e&&null!==e&&e.$$typeof===s},isForwardRef:function(e){return O(e)===h},isFragment:function(e){return O(e)===p},isLazy:function(e){return O(e)===x},isMemo:function(e){return O(e)===w},isPortal:function(e){return O(e)===u},isProfiler:function(e){return O(e)===d},isStrictMode:function(e){return O(e)===f},isSuspense:function(e){return O(e)===b},isValidElementType:function(e){return"string"===typeof e||"function"===typeof e||e===p||e===v||e===d||e===f||e===b||e===S||"object"===typeof e&&null!==e&&(e.$$typeof===x||e.$$typeof===w||e.$$typeof===y||e.$$typeof===g||e.$$typeof===h||e.$$typeof===E||e.$$typeof===C||e.$$typeof===j||e.$$typeof===P)},typeOf:O},$=(c((function(e,t){0})),c((function(e){e.exports=N})),Object.getOwnPropertySymbols),A=Object.prototype.hasOwnProperty,k=Object.prototype.propertyIsEnumerable;function _(e){if(null===e||void 0===e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}(function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},n=0;n<10;n++)t["_"+String.fromCharCode(n)]=n;if("0123456789"!==Object.getOwnPropertyNames(t).map((function(e){return t[e]})).join(""))return!1;var r={};return"abcdefghijklmnopqrst".split("").forEach((function(e){r[e]=e})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},r)).join("")}catch(o){return!1}})()&&Object.assign;var I="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";function R(e,t,n,r,o){}R.resetWarningCache=function(){0};Function.call.bind(Object.prototype.hasOwnProperty);function M(){}function B(){}B.resetWarningCache=M;var L=c((function(e){e.exports=function(){function e(e,t,n,r,o,a){if(a!==I){var i=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw i.name="Invariant Violation",i}}function t(){return e}e.isRequired=e;var n={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:B,resetWarningCache:M};return n.PropTypes=n,n}()})),F=function(e){var t=e.goToPage,n=e.navButtons;return o.a.createElement("div",{className:"page-nav"},function(){var e=[];return n.map((function(n,r){e.push(o.a.createElement("div",{className:""+(n.className||"page-nav-button"),onClick:function(){return t(n.index)},style:n.style,key:r},n.title))})),e}())};function D(){return(D=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}F.propTypes={navButtons:L.array,goToPage:L.func},F.defaultProps={navButtons:[],goToPage:function(){}};var W=function(e){var t=D({},e),n=t.style,r=t.children,a=D({},n),i=D({height:"100vh",width:"100vw"},function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(a,["height","width"]));console.log(r.type),console.log(r);var c=r.props.children;return o.a.createElement("div",{className:((r||{}).props||{}).className,style:D({},((r||{}).props||{}).style,i)},c)},q=function(e){var t=e.goToPage,n=e.pageIndex,r=e.active,a=e.indicatorStyle,i=e.indicatorStyleActive,c=o.a.useState({}),l=c[0],s=c[1];return o.a.useMemo((function(){var e=a;r&&(e=D({},a,i)),s(e)}),[a,i]),o.a.createElement("div",{style:l,onClick:function(){return t(n)}})};q.propTypes={goToPage:L.func,pageIndex:L.number,active:L.bool,indicatorStyle:L.object,indicatorStyleActive:L.object},q.defaultProps={pageIndex:1,active:!1,indicatorStyle:{height:"8px",width:"8px",margin:"10px",borderRadius:"4px",backgroundColor:"white",transition:"width 500ms ease"},indicatorStyleActive:{width:"20px"}};var z=function(e){var t=e.pageCount,n=e.activePage,r=e.goToPage,a=e.style,i=e.indicatorStyle,c=e.indicatorStyleActive,l=D({},a,{height:"100vh",position:"fixed",display:"flex",flexDirection:"column",justifyContent:"center"});return o.a.createElement("div",{style:l},function(){for(var e=t,a=[],l=0;l<e;l++){var s=l===n;a.push(o.a.createElement(q,{active:s,pageIndex:l,goToPage:r,key:l,indicatorStyle:i,indicatorStyleActive:s&&c}))}return a}())};q.propTypes={goToPage:L.func,pageCount:L.number,activePage:L.number,style:L.object},q.defaultProps={goToPage:function(){},pageCount:1,activePage:1,style:{}};var H=function(e){var t,n;function r(t){var n;return(n=e.call(this,t)||this).componentDidMount=function(){var e,t=n.props.children;n.setState({children:(e=t,o.a.Children.toArray(e).filter((function(e){return o.a.isValidElement(e)})))}),window.addEventListener("scroll",n.handleScroll)},n.componentWillUnmount=function(){window.removeEventListener("scroll",n.handleScroll)},n.handleScroll=function(){var e=n.state.scrollPos,t=n.state.pageIndex,r=window.innerHeight;n.state.scrollAgain?document.body.getBoundingClientRect().top>e?t-1>=0&&n.scroll(r,t-1):t+1<=n.pages-1&&n.scroll(r,t+1):window.scrollTo(0,t*r)},n.scroll=function(e,t){window.scrollTo(0,e*t),n.scrollLocker=setTimeout((function(){n.setState({scrollAgain:!0})}),1e3),n.setState({scrollPos:document.body.getBoundingClientRect().top,pageIndex:t,scrollAgain:!1})},n.goToPage=function(e){n.scroll(window.innerHeight,e)},n.renderChildren=function(){var e,t,r=[],a=[],i=[],c=0,l=n.state.children;return l&&l.length>0&&o.a.Children.map(l,(function(n,o){if(n.type===W){if(n.props.pageNav&&n.props.pageNav.length>0){var l=n.props.pageNav[c],s=l.title,u=l.className,p=l.style;s&&a.push({index:c,title:s,className:u||null,style:p||{}})}c++,r.push(n)}else if(n.type===z){if(n.props.indicatorStyle||n.props.indicatorStyleActive){var f=n.props,d=f.indicatorStyle,y=f.indicatorStyleActive;i.push({indicatorStyle:d,indicatorStyleActive:y})}e=n}else n.type===F&&(t=n)})),n.pages=c,e&&r.push(o.a.cloneElement(e,{pageCount:n.pages,activePage:n.state.pageIndex,goToPage:n.goToPage,indicatorArray:i})),t&&r.push(o.a.cloneElement(t,{goToPage:n.goToPage,navButtons:a})),r},n.state={scrollPos:0,pageIndex:0,scrollAgain:!0,children:null},n.pages=0,n.scrollLocker=function(){},n}return n=e,(t=r).prototype=Object.create(n.prototype),t.prototype.constructor=t,t.__proto__=n,r.prototype.render=function(){return o.a.createElement("div",this.props,this.renderChildren())},r}(o.a.Component),U=function(e){var t=e.pageNav,n=e.indicatorStyle,r=e.indicatorStyleActive,a=e.children;return"undefined"!==typeof window?o.a.createElement(H,{style:{display:"flex",flexDirection:"column"}},t&&t.length>0&&o.a.createElement(F,null),n&&o.a.createElement(z,{indicatorStyle:n,indicatorStyleActive:r}),o.a.Children.toArray(a).map((function(e,n){return o.a.createElement(W,{key:"react-full-page-"+n,pageNav:t},e)}))):null};U.propTypes={children:L.node.isRequired,indicatorStyle:L.object,pageNav:L.array},U.defaultProps={indicator:null,pageNav:null};var V=U,J=(n(10),function(){return o.a.createElement(V,{pageNav:[{id:1,title:"title 1",className:"page-nav-button",style:{width:"100%"}},{id:2,title:"title 2",className:"page-nav-button",style:{width:"100%"}},{id:3,title:"title 3",className:"page-nav-button",style:{width:"100%"}}],indicatorStyle:{height:"8px",width:"8px",margin:"10px",borderRadius:"4px",backgroundColor:"white",transition:"width 500ms ease"},indicatorStyleActive:{width:"20px"}},o.a.createElement("div",{className:"bg-blue",style:{display:"flex",alignItems:"center",justifyContent:"center"}},o.a.createElement("h1",{className:"page-number"},"1")),o.a.createElement("div",{className:"bg-green",style:{display:"flex",alignItems:"center",justifyContent:"center"}},o.a.createElement("h1",{className:"page-number"},"2")),o.a.createElement("div",{className:"bg-red",style:{display:"flex",alignItems:"center",justifyContent:"center"}},o.a.createElement("h1",{className:"page-number"},"3")))});i.a.render(o.a.createElement(J,null),document.getElementById("root"))}],[[2,1,2]]]);
//# sourceMappingURL=main.05b26ae0.chunk.js.map