(this.webpackJsonpbrainfuckinterpreter=this.webpackJsonpbrainfuckinterpreter||[]).push([[0],{103:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),c=t(11),l=t.n(c),o=t(58),i=t.n(o),u=t(68),m=t(14),s=t(34),p=t(131),d=t(146),h=t(158),b=t(157),f=t(132),g=t(163),E=t(147),v=t(60),O=t(148),j=t(149),y=t(161),C=t(150),k=t(164),x=t(153),w=t(159),I=t(154),S=t(155),N=t(156),D=t(55);function A(e){var a=e.children,t=e.value,n=e.index,c=Object(D.a)(e,["children","value","index"]);return t===n?r.a.createElement(h.a,c,a):""}var z=t(72),P=t.n(z),B=Object(p.a)((function(e){return{input:{display:"none"}}}));function R(e){var a=e.accept,t=e.children,c=e.color,l=e.variant,o=e.onChange,i=Object(D.a)(e,["accept","children","color","variant","onChange"]),u=B();return r.a.createElement(n.Fragment,null,r.a.createElement("input",Object.assign({accept:a,className:u.input,onChange:o,id:"contained-button-file",type:"file"},i)),r.a.createElement("label",{htmlFor:"contained-button-file"},r.a.createElement(f.a,{variant:l,color:c,startIcon:r.a.createElement(P.a,null),component:"span"},t)))}var F=t(133),M=t(134),L=t(135),W=t(136),J=t(137),T=t(138),U=t(139),V=[{character:">",meaning:"Increment the data pointer (to point to the next cell to the right)."},{character:"<",meaning:"Decrement the data pointer (to point to the next cell to the left)."},{character:"+",meaning:"Increment (increase by one) the byte at the data pointer."},{character:"-",meaning:"Decrement (decrease by one) the byte at the data pointer."},{character:".",meaning:"Output the byte at the data pointer."},{character:",",meaning:"Accept one byte of input, storing its value in the byte at the data pointer."},{character:"[",meaning:"If the byte at the data pointer is zero, then instead of moving the instruction pointer forward to the next command, jump it forward to the command after the matching ] command"},{character:"]",meaning:"If the byte at the data pointer is nonzero, then instead of moving the instruction pointer forward to the next command, jump it back to the command after the matching [ command."}];function q(){return r.a.createElement(F.a,{component:M.a},r.a.createElement(L.a,{size:"small"},r.a.createElement(W.a,null,r.a.createElement(J.a,null,r.a.createElement(T.a,null,"Character"),r.a.createElement(T.a,{align:"center"},"Meaning"))),r.a.createElement(U.a,null,V.map((function(e){return r.a.createElement(J.a,{key:e.character},r.a.createElement(T.a,{component:"th",scope:"row"},e.character),r.a.createElement(T.a,{align:"center"},e.meaning))})))))}var G=t(162),Y=t(141),$=t(142),H=t(143),K=t(145);function Q(e){var a=e.open,t=e.onClose,c=e.onInputAccept,l=Object(n.useState)(""),o=Object(m.a)(l,2),i=o[0],u=o[1];return r.a.createElement(G.a,{open:a,onClose:t,"aria-labelledby":"input-dialog-title"},r.a.createElement(Y.a,{id:"input-dialog-title"},"Input"),r.a.createElement($.a,null,r.a.createElement(H.a,null,"Input required"),r.a.createElement(b.a,{autoFocus:!0,value:i,onChange:function(e){""!==i&&""!==e.target.value||u(e.target.value)},margin:"dense",label:"Input",fullWidth:!0})),r.a.createElement(K.a,null,r.a.createElement(f.a,{onClick:t,color:"primary"},"Cancel"),r.a.createElement(f.a,{onClick:function(){c(i),u("")},color:"primary"},"Ok")))}var X=t(75),Z=t.n(X),_=t(76),ee=t.n(_),ae=t(77),te=t.n(ae),ne=t(74),re=t.n(ne),ce=t(78),le=t(151),oe=t(152),ie=Object(p.a)((function(e){var a;return{root:Object(s.a)({display:"flex",height:"100%"},e.breakpoints.down("sm"),{flexDirection:"column",paddingBottom:e.spacing(8)}),editorPanel:{margin:e.spacing(1),display:"flex",flexDirection:"column",flex:"3 1 75%","&>*":{margin:e.spacing(1)}},sidePanel:Object(s.a)({margin:e.spacing(1),flexDirection:"column",display:"flex",flex:"1 1 25%"},e.breakpoints.down("sm"),{display:"none"}),buttons:(a={display:"flex",width:"100%"},Object(s.a)(a,e.breakpoints.down("sm"),{display:"none"}),Object(s.a)(a,"&>*",{marginRight:e.spacing(2)}),a),fab:Object(s.a)({position:"fixed",display:"none",bottom:e.spacing(8),right:e.spacing(2)},e.breakpoints.down("sm"),{display:"flex",alignItems:"center"}),options:{display:"flex",flexDirection:"column","&>*":{margin:e.spacing(1)}},bottomNavigation:Object(s.a)({alignItems:"center",display:"none",position:"fixed",bottom:0,width:"100%",zIndex:e.zIndex.appBar},e.breakpoints.down("sm"),{display:"flex"})}}));function ue(e){return""!==e?e.match(/[<>+-.,[\]]/g).join(""):""}function me(){var e=Object(d.a)("(prefers-color-scheme: dark)"),a=Object(n.useState)(e),t=Object(m.a)(a,2),c=t[0],l=t[1],o=Object(n.useMemo)((function(){return Object(ce.a)({palette:{type:e||c?"dark":"light",primary:{main:"#03a9f4"},secondary:{main:"#4caf50"}},shape:{borderRadius:0},overrides:{MuiCssBaseline:{"@global":{html:{overflowY:"scroll"}}}}})}),[e,c]),s=ie(),p=Object(d.a)(o.breakpoints.down("sm")),D=Object(n.useState)(""),z=Object(m.a)(D,2),P=z[0],B=z[1],F=Object(n.useState)(""),M=Object(m.a)(F,2),L=M[0],W=M[1],J=Object(n.useState)(""),T=Object(m.a)(J,2),U=T[0],V=T[1],G=Object(n.useState)(!0),Y=Object(m.a)(G,2),$=Y[0],H=Y[1],K=Object(n.useState)(!0),X=Object(m.a)(K,2),_=X[0],ae=X[1],ne=Object(n.useState)(3e4),me=Object(m.a)(ne,2),se=me[0],pe=me[1],de=Object(n.useState)(0),he=Object(m.a)(de,2),be=he[0],fe=he[1],ge=Object(n.useState)(0),Ee=Object(m.a)(ge,2),ve=Ee[0],Oe=Ee[1],je=Object(n.useState)(15),ye=Object(m.a)(je,2),Ce=ye[0],ke=ye[1],xe=Object(n.useState)(8),we=Object(m.a)(xe,2),Ie=we[0],Se=we[1],Ne=Object(n.useState)(!1),De=Object(m.a)(Ne,2),Ae=De[0],ze=De[1],Pe=Object(n.useCallback)((function(){""!==P&&(_&&P.match(/,/g)&&P.match(/,/g).length-L.length>0?ze(!0):V(function(e,a,t){for(var n=function(e){for(var a=[],t={},n=0;n<e.length;n++){var r=e.charAt(n);if("["===r&&a.push(n),"]"===r){var c=a.pop();t[c]=n,t[n]=c}}return t}(e),r=[0],c=0,l=0,o=0,i="";l<e.length;){var u=e.charAt(l);">"===u&&(c+=1,-1!==a&&c>=a?c=0:c>=r.length&&r.push(0)),"<"===u&&(c<=0?c=0:c-=1),"+"===u&&(r[c]<255?r[c]+=1:r[c]=0),"-"===u&&(r[c]>0?r[c]-=1:r[c]=255),"["===u&&0===r[c]&&(l=n[l]),"]"===u&&0!==r[c]&&(l=n[l]),"."===u&&(i=i.concat(String.fromCharCode(r[c]))),","===u&&t.charAt(o)&&(r[c]=t.charCodeAt(o),o+=1),l+=1}return i}(P,$?-1:se,L)))}),[P,L,se,_,$]);Object(n.useEffect)((function(){Ae&&(ze(!1),Pe())}),[L,Ae,Pe]);var Be=r.a.createElement(h.a,{className:s.editorPanel},r.a.createElement(b.a,{rows:Ce,multiline:!0,value:P,onChange:function(e){return B(ue(e.target.value))},variant:"outlined",helperText:"Insert code here"}),r.a.createElement(b.a,{label:"Input",value:L,onChange:function(e){return W(e.target.value)},variant:"outlined"}),r.a.createElement(h.a,{className:s.buttons},r.a.createElement(f.a,{color:"primary",variant:"contained",onClick:Pe},"Run"),r.a.createElement(f.a,{color:"primary",variant:"contained",onClick:function(){return V("")}},"Clear output"),r.a.createElement(R,{color:"primary",variant:"contained",accept:"text/*",onChange:function(e){var a=e.target.files[0];if(a){var t=new FileReader;t.onload=function(){var e=Object(u.a)(i.a.mark((function e(a){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:B(ue(a.target.result));case 1:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}(),t.readAsText(a)}}},"Upload file")),r.a.createElement(b.a,{label:"Output",variant:"outlined",rows:Ie,multiline:!0,value:U,InputProps:{readOnly:!0}}),r.a.createElement(g.a,{title:"Run","aria-label":"run"},r.a.createElement(E.a,{color:"primary",onClick:Pe,className:s.fab},r.a.createElement(re.a,null)))),Re=r.a.createElement(h.a,{className:s.options},r.a.createElement(v.a,{variant:"h6"},"General options"),r.a.createElement(O.a,null),r.a.createElement(j.a,{control:r.a.createElement(y.a,{checked:$,color:"primary",onChange:function(e){return H(e.target.checked)}}),label:"Dynamic memory"}),r.a.createElement(b.a,{label:"Max cells",disabled:$,value:se,onChange:function(e){return pe(e.target.value)},type:"number",variant:"outlined"}),r.a.createElement(j.a,{control:r.a.createElement(y.a,{checked:_,color:"primary",onChange:function(e){return ae(e.target.checked)}}),label:"Prompt for input"}),r.a.createElement(v.a,{variant:"h6"},"Editor options"),r.a.createElement(O.a,null),r.a.createElement(j.a,{control:r.a.createElement(C.a,{checked:c,onChange:function(e){return l(e.target.checked)},color:"primary"}),label:"Use dark theme"}),r.a.createElement(v.a,null,"Input field size"),r.a.createElement(k.a,{defaultValue:15,valueLabelDisplay:"auto",step:1,marks:!0,min:5,max:20,value:Ce,onChange:function(e,a){return ke(a)}}),r.a.createElement(v.a,null,"Output field size"),r.a.createElement(k.a,{defaultValue:8,marks:!0,valueLabelDisplay:"auto",step:1,min:2,max:20,value:Ie,onChange:function(e,a){return Se(a)}})),Fe=p?[Be,r.a.createElement(q,null),Re][ve]:Be;return r.a.createElement(le.a,{theme:o},r.a.createElement(oe.a,null),r.a.createElement(x.a,{className:s.root},Fe,r.a.createElement(h.a,{className:s.sidePanel},r.a.createElement(w.a,{indicatorColor:"primary",value:be,onChange:function(e,a){fe(a)}},r.a.createElement(I.a,{label:"Options"}),r.a.createElement(I.a,{label:"Commands"})),r.a.createElement(A,{value:be,index:0},Re),r.a.createElement(A,{value:be,index:1},r.a.createElement(q,null)))),r.a.createElement(S.a,{showLabels:!0,className:s.bottomNavigation,value:ve,onChange:function(e,a){Oe(a)}},r.a.createElement(N.a,{label:"Editor",icon:r.a.createElement(Z.a,null)}),r.a.createElement(N.a,{label:"Commands table",icon:r.a.createElement(ee.a,null)}),r.a.createElement(N.a,{label:"Options",icon:r.a.createElement(te.a,null)})),r.a.createElement(Q,{open:Ae,onClose:function(){return ze(!1)},onInputAccept:function(e){return W(L.concat(e))}}))}Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(me,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},92:function(e,a,t){e.exports=t(103)}},[[92,1,2]]]);
//# sourceMappingURL=main.813f3c8a.chunk.js.map