"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[316],{9316:(t,e,a)=>{a.r(e),a.d(e,{default:()=>u});var o=a(5043),r=a(6213),s=a(6058),i=a(7658),n=a(2110),l=a(6494),d=a(5865),c=a(579);i.t1.register(i.Bs,i.m_,i.s$);const u=t=>{let{kolDetails:e}=t;const[a,i]=(0,o.useState)([]),[u,b]=(0,o.useState)(null),[h,p]=(0,o.useState)(!0),[f,C]=(0,o.useState)(null),g=["#4ce1f9","#7a7a7a","#567fb3","#eb716c","#fbcc3e","#84cfae","#e9a246","#c2c6c9","#278a5e","#0185cd"],v=["#ffffff"];if((0,o.useEffect)((()=>{const t=async()=>{try{const t=await r.A.get("".concat("http://localhost:8080","/api/keywords"));i(t.data.keywords)}catch(t){console.error("Error fetching keywords:",t),C("Error fetching keywords")}},a=async()=>{if(e&&e["KOL ID"])try{const t=await r.A.get("".concat("http://localhost:8080","/api/associations/").concat(e["KOL ID"]));b(t.data)}catch(t){t.response&&404===t.response.status?(console.warn("Association data not found:",t),b(null)):(console.error("Error fetching association data:",t),C("Error fetching association data"))}};(async()=>{p(!0),await Promise.all([t(),a()]),p(!1)})()}),[e]),h)return(0,c.jsx)("div",{children:"Loading..."});if(f)return(0,c.jsx)("div",{children:f});if(!e)return(0,c.jsx)("div",{children:"No KOL details available"});const m=function(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";const o=a,r=o.map((a=>{const o="".concat(t).concat(a);return e[o]||0}));return{labels:o,datasets:[{label:"Count",data:r,backgroundColor:g,borderColor:v,borderWidth:1}]}},x={plugins:{legend:{display:!0,position:"right",labels:{generateLabels:t=>{const e=t.data;return e.labels.length&&e.datasets.length?e.labels.map(((t,a)=>e.datasets[0].data[a]>0?{text:"".concat(t),fillStyle:e.datasets[0].backgroundColor[a],strokeStyle:e.datasets[0].borderColor[a],lineWidth:e.datasets[0].borderWidth,hidden:!1,index:a}:null)).filter((t=>null!==t)):[]}}},tooltip:{callbacks:{label:function(t){const e=t.label||"",a=t.raw||0;return"".concat(e,": ").concat(a)}}}},maintainAspectRatio:!1},y=m("PUBS_"),P=m("CT_"),k=m(""),w={labels:["First Author Pubs Count","Co-Author Pubs Count"],datasets:[{label:"Publications Count",data:[e["First Author Pubs Count"]||0,(e["Key topic Pubs Count"]||0)-(e["First Author Pubs Count"]||0)],backgroundColor:g,borderColor:v,borderWidth:1}]},A={labels:["Principal Investigator","Investigator"],datasets:[{label:"Trials Count",data:[e["Principal Investigator"]||0,(e["Key topic Trials Count"]||0)-(e["Principal Investigator"]||0)],backgroundColor:g,borderColor:v,borderWidth:1}]},j={labels:["Board Member","Chair Person","Committee Member","President","Secretary"],datasets:[{label:"Count",data:[(null===u||void 0===u?void 0:u["Board Member"])||0,(null===u||void 0===u?void 0:u["Chair Person"])||0,(null===u||void 0===u?void 0:u["Committee Member"])||0,(null===u||void 0===u?void 0:u.President)||0,(null===u||void 0===u?void 0:u.Secretary)||0],backgroundColor:g,borderColor:v,borderWidth:1}]};return(0,c.jsx)("div",{className:"pie-charts-row",children:[{title:"Publications",data:y},{title:"Clinical Trials",data:P},{title:"Conferences",data:k},{title:"Investigation Roles",data:A},{title:"Publication Roles",data:w},{title:"Association Roles ",data:j}].map(((t,e)=>{let{title:a,data:o}=t;return!(t=>t.datasets[0].data.every((t=>"0"===t||0===t)))(o)&&(0,c.jsx)(n.A,{className:"pie-chart-container",sx:{margin:"5px",width:"350px",height:"300px",mx:0,border:"solid 2px #3D52A0"},children:(0,c.jsxs)(l.A,{children:[(0,c.jsx)(d.A,{variant:"h6",component:"div",gutterBottom:!0,sx:{display:"flex",justifyContent:"center",fontWeight:"bold"},children:a}),(0,c.jsx)("div",{style:{height:"200px",position:"relative"},children:(0,c.jsx)(s.Fq,{data:o,options:x})})]})},e)}))})}}}]);
//# sourceMappingURL=316.68bcd1bb.chunk.js.map