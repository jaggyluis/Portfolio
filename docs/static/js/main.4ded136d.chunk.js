(this.webpackJsonpportfolio=this.webpackJsonpportfolio||[]).push([[0],{22:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAACFElEQVRoge3ay2oUQRTG8d8kGlDxgppt0IWILpMggiBIHsGVZCmCvoDgzqcQFBQRwSdQhIBbwcsmYjYi6CLgRjcuzGSEcVGdGNuZrpqLPd2m/1CLmTqn5nxzuk5VVze/WcQzdNCteOtksS7IsYzNCgQ4aGtnsW9noo4idoqZn8Z9nM6nqEZMY64lXG97JhzMqHRaQnpqz9SkAxgXjZCqkTrJf+AJ3uMwlnDhXwU1LLE6vY4TPfxuJviW2aIG1wr+hHcVENBFN2WOfCzoW0vwL4UUIRf7fD+Dc2OMZWRiadvA5ZzPQTxM8C2tDbKyr2EVR4SN5vFEv1JotihVY1cJWRQuwV7tXs62n10LbzObLlZwFWdxCPswJxSVR8KtxcDEKsJf98U7uJuzLeKNsMVJKdmn8DIhtoEWxHHxHOfxKsH2Ay5lPsmUlZHWIEFlHMXnhBhLzcgwZf4bbqcYTrJqzSTaPcaXmFHZQo7hAb4LxzifcEs4CelHBy9SBi9rjuzF6z6/cSfieyMWZ5kZuSKsSb24Lqwp/ViPDV6mkKWCvlak/2ts8DKFnByhfyM2eJlC9kf6D4wy+K7aNNaCRkjVaIRUjUZI1WiEVI2U5yNnCvpmc5+LtvyxLcpsgX9RDGhOGqvHfyXk56SDGAOdKeH4su6sECpFWwUe1gzZ2pjfUrRcUzF/vOa0xQKeqscrT5tZrNuZ+AXHMw1CLndRNAAAAABJRU5ErkJggg=="},36:function(e,t,n){e.exports=n(49)},41:function(e,t,n){},42:function(e,t,n){},43:function(e,t,n){},44:function(e,t,n){},45:function(e,t,n){},46:function(e,t,n){},47:function(e,t,n){},48:function(e,t,n){},49:function(e,t,n){"use strict";n.r(t);var i=n(0),o=n.n(i),a=n(21),s=n.n(a),r=(n(41),n(2)),l=n(3),d=n(5),h=n(4),c=n(6),u=(n(42),n(8)),p=function(e,t,n){return u.c().tile((function(e,i,o,a,s){u.d(e,0,0,t,n);var r=!0,l=!1,d=void 0;try{for(var h,c=(e.children||[])[Symbol.iterator]();!(r=(h=c.next()).done);r=!0){var p=h.value;p.x0=i+p.x0/t*(a-i),p.x1=i+p.x1/t*(a-i),p.y0=o+p.y0/n*(s-o),p.y1=o+p.y1/n*(s-o)}}catch(y){l=!0,d=y}finally{try{r||null==c.return||c.return()}finally{if(l)throw d}}}))(u.a(e).sum((function(e){return function(e){return void 0!==e.weight?e.weight:e.content?3:1}(e)})).sort((function(e,t){return(t.value||0)-(e.value||0)})))},y=n(22),f=n.n(y),g=function(e){return void 0!==e.data.content},v=function(e){return void 0!==e.data.src},m=function(e){return e.data.label||""},k=function(e){return"dir"===e.data.type},C=(n(43),function(e){function t(){var e,n;Object(r.a)(this,t);for(var i=arguments.length,o=new Array(i),a=0;a<i;a++)o[a]=arguments[a];return(n=Object(d.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(o)))).state={src:null},n}return Object(c.a)(t,e),Object(l.a)(t,[{key:"getMobilePath",value:function(e){if(e){var t=e.split(".");return t[0]+"_m."+t[1]}return""}},{key:"getIconPath",value:function(e){if(e){var t=e.split(".");return t[0]+"_i."+t[1]}return""}},{key:"getPlaceholderPath",value:function(e){if(e){var t=e.split(".");return t[0]+"_s."+t[1]}return""}},{key:"getPath",value:function(){var e=this.props.node.data.src||"",t=this.props.width;return this.props.contain||(t=this.getNodeWidth()/2),t<300?e=this.getIconPath(e):t<600&&(e=this.getMobilePath(e)),e}},{key:"getNodeWidth",value:function(){return this.props.width*(this.props.node.x1-this.props.node.x0)}},{key:"shouldComponentUpdate",value:function(e,t){return e.contain!==this.props.contain||e.width!==this.props.width||t.src!==this.state.src}},{key:"componentWillMount",value:function(){this.updateSrc()}},{key:"componentDidUpdate",value:function(){this.updateSrc()}},{key:"updateSrc",value:function(){}},{key:"getClassName",value:function(){var e=["layout-image"];return this.props.contain&&e.push("contain"),e.join(" ")}},{key:"render",value:function(){return i.createElement("img",{className:this.getClassName(),src:this.getPath(),alt:"layout-node"})}}]),t}(i.Component)),b=(n(44),function(e){function t(){return Object(r.a)(this,t),Object(d.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(c.a)(t,e),Object(l.a)(t,[{key:"getImage",value:function(){if(v(this.props.node))return i.createElement(C,{node:this.props.node,contain:this.props.nodeState.selected,width:this.props.width})}},{key:"getLabel",value:function(){if(g(this.props.node))return i.createElement("div",{className:"layout-label"},m(this.props.node))}},{key:"getText",value:function(){if(g(this.props.node))return(e=this.props.node,e.data.content||[""]).map((function(e,t){return i.createElement("div",{className:"layout-text",key:t},e)}));var e}},{key:"getButton",value:function(){if(this.props.nodeState.selected)return i.createElement("div",{className:"layout-btn",onClick:this.onButtonClick.bind(this)},"x")}},{key:"onButtonClick",value:function(e){this.props.onNodeClick&&(this.props.onNodeClick(null),e.stopPropagation())}},{key:"getClassName",value:function(){var e=["layout-content"];return g(this.props.node)&&e.push("text-node"),e.join(" ")}},{key:"render",value:function(){return i.createElement("div",{className:this.getClassName()},this.getImage(),this.getLabel(),this.getText(),this.getButton())}}]),t}(i.PureComponent)),S=(n(45),function(e){function t(){return Object(r.a)(this,t),Object(d.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(c.a)(t,e),Object(l.a)(t,[{key:"shouldComponentUpdate",value:function(e){return this.props.nodeState.selected!==e.nodeState.selected}},{key:"getClassName",value:function(){var e=["layout-draw-lines"];return this.props.nodeState.selected&&e.push("hidden"),e.join(" ")}},{key:"render",value:function(){return i.createElement("div",{className:this.getClassName()},i.createElement("div",{className:"line horizontal top",key:"top"}),i.createElement("div",{className:"line horizontal bottom",key:"bottom"}),i.createElement("div",{className:"line vertical top",key:"left"}))}}]),t}(i.Component)),w=function(e){function t(){return Object(r.a)(this,t),Object(d.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(c.a)(t,e),Object(l.a)(t,[{key:"shouldComponentUpdate",value:function(e){return this.props.selected!==e.selected||this.props.small!==e.small}},{key:"getLabel",value:function(){var e=m(this.props.node);return this.props.small||this.props.selected||(e="/ "+e),e}},{key:"onNodeClick",value:function(e){this.props.onNodeClick&&(this.props.onNodeClick(this.props.node),e.stopPropagation())}},{key:"getStyle",value:function(){var e=this.props.small?25:30,t=Math.ceil(e/5),n=e-this.props.depth*t,i=42-n;return{fontSize:n+"px",paddingTop:this.props.small&&!this.props.selected?i+"px":""}}},{key:"getClassName",value:function(){var e=["layout-header-node"];return this.props.selected||e.push("sibling"),e.join(" ")}},{key:"render",value:function(){return i.createElement("div",{className:this.getClassName(),onClick:this.onNodeClick.bind(this),key:this.props.node.data.id+"-sibling",style:this.getStyle()},this.getLabel())}}]),t}(i.Component),N=function(e){return e.width<600},E=(n(46),function(e){function t(){return Object(r.a)(this,t),Object(d.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(c.a)(t,e),Object(l.a)(t,[{key:"shouldComponentUpdate",value:function(e){return this.props.expanded!==e.expanded||(this.props.width!==e.width||(this.props.nodeState.selected!==e.nodeState.selected||this.props.nodeSiblingSelectedId!==e.nodeSiblingSelectedId))}},{key:"getSiblingNodes",value:function(){var e=this;return this.props.nodeSiblings.map((function(t){return t.data.id!==e.props.node.data.id?i.createElement(w,{key:t.data.id+"-header-label",node:t,depth:e.props.nodeDepth,selected:!1,small:N(e.props),onNodeClick:e.props.onNodeClick}):void 0}))}},{key:"getPrimaryNode",value:function(){return i.createElement(w,{key:this.props.node.data.id+"-header-label",node:this.props.node,depth:this.props.nodeDepth,selected:!0,small:N(this.props),onNodeClick:this.props.onNodeClick})}},{key:"onButtonClick",value:function(e){this.props.onButtonClick&&(this.props.onButtonClick(),e.stopPropagation())}},{key:"getButton",value:function(){if(this.props.nodeSiblings.length)return i.createElement("div",{key:this.props.node.data.id+"-btn",className:"layout-btn",onClick:this.onButtonClick.bind(this)},this.props.expanded?"-":"+")}},{key:"getStyle",value:function(){var e=N(this.props)?25:30,t=Math.ceil(e/5),n=42-(e-this.props.nodeDepth*t),i=this.props.nodeState.selected?"flex":"none",o=n+"px";return N(this.props)&&this.props.nodeState.selected&&(i=""),{display:i,marginBottom:o}}},{key:"getClassName",value:function(){var e=["layout-header"];return this.props.expanded&&e.push("expanded"),this.props.nodeState.selected&&e.push("selected"),N(this.props)&&e.push("small"),e.join(" ")}},{key:"render",value:function(){return i.createElement("div",{className:this.getClassName(),style:this.getStyle()},this.getPrimaryNode(),this.getSiblingNodes(),this.getButton())}}]),t}(i.Component)),j=(n(47),function(e){function t(){return Object(r.a)(this,t),Object(d.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(c.a)(t,e),Object(l.a)(t,[{key:"shouldComponentUpdate",value:function(e){return this.props.width!==e.width}},{key:"getImage",value:function(){if(v(this.props.node))return i.createElement(C,{key:this.props.node.data.id+"-overlay-image",node:this.props.node,contain:this.props.nodeState.selected,width:this.props.width})}},{key:"getLabelStyle",value:function(){var e=N(this.props)?25:30,t=Math.ceil(e/5);return{fontSize:e-this.props.nodeDepth*t+"px"}}},{key:"getLabel",value:function(){return i.createElement("div",{className:"layout-label",style:this.getLabelStyle()},m(this.props.node))}},{key:"render",value:function(){return i.createElement("div",{className:"layout-overlay"},this.getImage(),i.createElement("div",{className:"layout-color"}),i.createElement("div",{className:"layout-lslider"},i.createElement("div",{className:"layout-tslider"},this.getLabel())))}}]),t}(i.Component)),x=(n(48),[]),O=function(e){function t(){var e,n;Object(r.a)(this,t);for(var i=arguments.length,o=new Array(i),a=0;a<i;a++)o[a]=arguments[a];return(n=Object(d.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(o)))).container=null,n.layout=p(n.props.node.data,n.props.width,n.props.height),n.state={selectedChildId:null,headerExpanded:!1,transitionDuration:400,transitioning:!1},n}return Object(c.a)(t,e),Object(l.a)(t,[{key:"componentWillMount",value:function(){this.update(this.props)}},{key:"componentWillUpdate",value:function(e){this.update(e)}},{key:"shouldComponentUpdate",value:function(e,t){return this.props.width!==e.width||(this.props.nodeState.selected!==e.nodeState.selected||(this.props.nodeSiblingSelectedId!==e.nodeSiblingSelectedId||(this.state.selectedChildId!==t.selectedChildId||(this.state.transitioning!==t.transitioning||this.state.headerExpanded!==t.headerExpanded))))}},{key:"update",value:function(e){this.state.headerExpanded=!1,e.width===this.props.width&&e.height===this.props.height||(this.layout=p(e.node.data,e.width,e.height)),e.nodeState.selected||(this.state.selectedChildId=null)}},{key:"getChildState",value:function(e){return{selected:this.isChildSelected(e)}}},{key:"isChildSelected",value:function(e){return this.state.selectedChildId===e.data.id}},{key:"areNoChildrenSelected",value:function(){return null===this.state.selectedChildId}},{key:"setSelectedChild",value:function(e){var t=this;this.setState({selectedChildId:e.data.id,transitioning:!0}),setTimeout((function(){t.setState({transitioning:!1})}),this.state.transitionDuration)}},{key:"clearSelectedChildren",value:function(){var e=this;this.setState({selectedChildId:null,transitioning:!0}),setTimeout((function(){e.setState({transitioning:!1})}),this.state.transitionDuration)}},{key:"onChildClick",value:function(e){e?e.data.content||this.setSelectedChild(e):this.clearSelectedChildren()}},{key:"getChildTop",value:function(e){return this.isChildSelected(e)?"0%":100*e.y0+"%"}},{key:"getChildLeft",value:function(e){return this.isChildSelected(e)?"0%":100*e.x0+"%"}},{key:"getChildWidth",value:function(e){return this.isChildSelected(e)?"100%":this.areNoChildrenSelected()?100*(e.x1-e.x0)+"%":"0%"}},{key:"getChildHeight",value:function(e){return this.isChildSelected(e)?"100%":this.areNoChildrenSelected()?100*(e.y1-e.y0)+"%":"0%"}},{key:"getChildZIndex",value:function(e){return this.isChildSelected(e)||this.areNoChildrenSelected()?2:0}},{key:"getChildDisplay",value:function(e){if(!this.isChildSelected(e)&&!this.areNoChildrenSelected())return"none"}},{key:"__getChildTransform",value:function(e){if(this.isChildSelected(e))return"translate(0%, 0%)";return"translate("+100*e.x0+"%, "+100*e.y0+"%)"}},{key:"getChildTransform",value:function(e){return this.isChildSelected(e),"translate3d(0,0,0)"}},{key:"getChildStyle",value:function(e){return{position:"absolute",top:this.getChildTop(e),left:this.getChildLeft(e),height:this.getChildHeight(e),width:this.getChildWidth(e),transform:this.getChildTransform(e),transition:this.state.transitionDuration+"ms",willChange:"top, left, height, width, transform"}}},{key:"getChildrenStyle",value:function(){return{position:"relative",height:this.state.headerExpanded?"0":"100%",overflow:this.state.headerExpanded?"hidden":"visible",width:"100%",display:this.props.nodeState.selected?"":"none"}}},{key:"getChildren",value:function(){var e=this;return i.createElement("div",{key:this.props.node.data.id+"-children",className:"layout-children",style:this.getChildrenStyle()},(this.layout.children||x).map((function(n){return i.createElement("div",{key:n.data.id,className:"layout-child-position",style:e.getChildStyle(n)},i.createElement(t,{width:e.props.width,height:e.props.height,parent:e.props.node,parentState:e.props.nodeState,node:n,nodeState:e.getChildState(n),nodeDepth:e.props.nodeDepth+1,nodeSiblings:e.layout.children||x,nodeSiblingSelectedId:e.state.selectedChildId,onNodeClick:e.onChildClick.bind(e)}))})))}},{key:"getOverlayStyle",value:function(){return{position:"absolute",width:"100%",height:"100%",pointerEvents:this.props.nodeState.selected?"none":void 0,display:this.props.nodeState.selected?"none":""}}},{key:"getOverlay",value:function(){if(k(this.props.node))return i.createElement("div",{className:"layout-overlay-position",style:this.getOverlayStyle()},i.createElement(j,Object.assign({key:this.props.node.data.id+"-overlay"},this.props)))}},{key:"getContent",value:function(){if("data"===this.props.node.data.type)return i.createElement(b,Object.assign({key:this.props.node.data.id+"-content"},this.props))}},{key:"getDrawLines",value:function(){return i.createElement(S,Object.assign({key:this.props.node.data.id+"-lines"},this.props))}},{key:"onHeaderNodeClick",value:function(e){e&&e.data.id!==this.props.node.data.id?this.props.onNodeClick&&this.props.onNodeClick(e):this.clearSelectedChildren()}},{key:"onHeaderButtonClick",value:function(){this.setState({headerExpanded:!this.state.headerExpanded})}},{key:"getHeader",value:function(){if(k(this.props.node))return i.createElement(E,Object.assign({key:this.props.node.data.id+"-header"},this.props,{expanded:this.state.headerExpanded,onNodeClick:this.onHeaderNodeClick.bind(this),onButtonClick:this.onHeaderButtonClick.bind(this)}))}},{key:"onNodeClick",value:function(e){this.props.onNodeClick&&(this.props.onNodeClick(this.props.node),e.stopPropagation())}},{key:"getClassName",value:function(){var e=["layout"];return this.props.nodeState.selected&&e.push("selected"),this.state.transitioning&&e.push("transitioning"),e.join(" ")}},{key:"render",value:function(){var e=this;return i.createElement("div",{className:this.getClassName(),ref:function(t){return e.container=t},onClick:this.onNodeClick.bind(this)},this.getHeader(),this.getOverlay(),this.getChildren(),this.getContent(),this.getDrawLines())}}]),t}(i.Component);var A=function(e){function t(){var e,n;Object(r.a)(this,t);for(var i=arguments.length,o=new Array(i),a=0;a<i;a++)o[a]=arguments[a];return(n=Object(d.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(o)))).state={selected:!1,width:window.innerWidth,height:window.innerHeight},n}return Object(c.a)(t,e),Object(l.a)(t,[{key:"onNodeClick",value:function(){this.setState({selected:!0})}},{key:"componentDidMount",value:function(){var e=this;window.addEventListener("resize",function(e){var t;return function(n){t&&clearTimeout(t),t=setTimeout(e,500,n)}}((function(){e.setState({width:window.innerWidth,height:window.innerHeight})})))}},{key:"render",value:function(){var e=p(this.props.data,this.state.width,this.state.height);return e.data.label="Luis Jaggy",o.a.createElement("div",{className:"Wrapper",style:{width:"100%",height:"100%",overflow:"hidden",position:"absolute"}},o.a.createElement("div",{className:"App",onClick:this.onNodeClick.bind(this),style:{height:"calc(100% - 50px)",width:"95%",position:"absolute",marginTop:"10px",marginLeft:"2.5%"}},o.a.createElement(O,{width:this.state.width,height:this.state.height,node:e,nodeState:{selected:this.state.selected},nodeDepth:0,nodeSiblings:[],nodeSiblingSelectedId:this.state.selected?e.data.id:null,parent:null,parentState:null})),o.a.createElement("div",{className:"Menu",style:{height:"40px",position:"absolute",bottom:"0",left:"2.5%",width:"95%",display:"flex"}},o.a.createElement("img",{alt:"linkedIn",onClick:function(){window.open("https://www.linkedin.com/in/jaggyluis/","mywindow")},style:{height:"calc(100% - 20px)",objectFit:"contain",margin:"10px",opacity:.5},src:f.a})))}}]),t}(o.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));u.b("data.json").then((function(e){e&&s.a.render(o.a.createElement(A,{data:e}),document.getElementById("root"))})),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[36,1,2]]]);
//# sourceMappingURL=main.4ded136d.chunk.js.map