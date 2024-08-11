"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[893],{5893:(e,n,s)=>{s.r(n),s.d(n,{default:()=>y});var t=s(5043),r=s(6446),a=s(5865),l=s(6042),i=s(1906),o=s(9650),c=s(3336),d=s(1806),x=s(4882),h=s(8076),j=s(2420),A=s(1079),g=s(7392),u=s(279),v=s(4600),p=s(1337),m=s(5473),b=s(6213),C=s(579);const D=e=>{let{kolId:n,handleBackClick:s}=e;const[v,D]=(0,t.useState)([]),[y,f]=(0,t.useState)(null),[k,S]=(0,t.useState)(0),[w,E]=(0,t.useState)(10);(0,t.useEffect)((()=>{(async()=>{try{const e=await b.A.get("".concat("http://localhost:8080","/api/allevents"),{params:{kolId:n}});D(e.data)}catch(e){console.error("Error fetching all events:",e)}})()}),[n]);const N=v.map(((e,n)=>({id:"".concat(e["Event ID"],"-").concat(n),participationDate:e["Start Date"],eventCountry:e["Event Country"],conferenceName:e["Conference Name"],sessionName:e["Session Name; Topic Title"],sponsorName:e["Sponsor Name"],role:e.Role,eventDetails:{startDate:e["Event Start Date"],endDate:e["Event End Date"],location:e["Event Location"],city:e["Event City"],state:e["Event State"],abstract:e.Abstract,sessionType:e["Session Type"]}})));return(0,C.jsxs)(C.Fragment,{children:[(0,C.jsxs)(r.A,{sx:{display:"flex",justifyContent:"space-between",alignItems:"center",mb:2},children:[(0,C.jsx)(a.A,{variant:"h6",gutterBottom:!0,color:"primary",children:"All Events"}),(0,C.jsx)(l.A,{component:"div",count:v.length,page:k,onPageChange:(e,n)=>{S(n)},rowsPerPage:w,onRowsPerPageChange:e=>{E(+e.target.value),S(0)},rowsPerPageOptions:[10,25,50]}),(0,C.jsx)(i.A,{variant:"contained",onClick:s,sx:{backgroundColor:"#7091E6"},children:"Back"})]}),(0,C.jsx)(o.A,{component:c.A,id:"scrollable-table",sx:{maxHeight:"70vh",overflow:"auto"},children:(0,C.jsxs)(d.A,{stickyHeader:!0,"aria-label":"collapsible table",children:[(0,C.jsx)(x.A,{sx:{backgroundColor:"#54C1DF"},children:(0,C.jsxs)(h.A,{children:[(0,C.jsx)(j.A,{}),(0,C.jsx)(j.A,{children:(0,C.jsx)("strong",{children:"Participation Date"})}),(0,C.jsx)(j.A,{children:(0,C.jsx)("strong",{children:"Event Country"})}),(0,C.jsx)(j.A,{children:(0,C.jsx)("strong",{children:"Conference Name"})}),(0,C.jsx)(j.A,{children:(0,C.jsx)("strong",{children:"Session Name"})}),(0,C.jsx)(j.A,{children:(0,C.jsx)("strong",{children:"Sponsor Name"})}),(0,C.jsx)(j.A,{children:(0,C.jsx)("strong",{children:"Role"})})]})}),(0,C.jsx)(A.A,{children:N.slice(k*w,k*w+w).map(((e,n)=>(0,C.jsxs)(t.Fragment,{children:[(0,C.jsxs)(h.A,{sx:{"&:hover":{backgroundColor:"#F0F0F0"}},children:[(0,C.jsx)(j.A,{children:(0,C.jsx)(g.A,{"aria-label":"expand row",size:"small",onClick:()=>(e=>{f(y===e?null:e)})(n),children:y===n?(0,C.jsx)(m.A,{}):(0,C.jsx)(p.A,{})})}),(0,C.jsx)(j.A,{children:e.participationDate}),(0,C.jsx)(j.A,{children:e.eventCountry}),(0,C.jsx)(j.A,{children:e.conferenceName}),(0,C.jsx)(j.A,{children:e.sessionName}),(0,C.jsx)(j.A,{children:e.sponsorName}),(0,C.jsx)(j.A,{children:e.role})]}),(0,C.jsx)(h.A,{children:(0,C.jsx)(j.A,{style:{paddingBottom:0,paddingTop:0},colSpan:7,children:(0,C.jsx)(u.A,{in:y===n,timeout:"auto",unmountOnExit:!0,children:(0,C.jsxs)(r.A,{sx:{margin:1},children:[(0,C.jsx)(a.A,{variant:"h6",gutterBottom:!0,component:"div",children:"Event Details"}),(0,C.jsxs)(a.A,{variant:"body2",children:[(0,C.jsx)("strong",{children:"Dates:"})," ",e.eventDetails.startDate," - ",e.eventDetails.endDate]}),(0,C.jsxs)(a.A,{variant:"body2",children:[(0,C.jsx)("strong",{children:"Location:"})," ",e.eventDetails.location,", ",e.eventDetails.city,", ",e.eventDetails.state]}),(0,C.jsxs)(a.A,{variant:"body2",children:[(0,C.jsx)("strong",{children:"Session Type:"})," ",e.eventDetails.sessionType]}),(0,C.jsxs)(a.A,{variant:"body2",style:{marginTop:"0.5rem"},children:[(0,C.jsx)("strong",{children:"Abstract:"})," ",e.eventDetails.abstract]})]})})})})]},e.id)))})]})})]})},y=e=>{let{kolId:n}=e;const[s,y]=(0,t.useState)([]),[f,k]=(0,t.useState)(0),[S,w]=(0,t.useState)(10),[E,N]=(0,t.useState)(null),[P,F]=(0,t.useState)(null),[B,T]=(0,t.useState)(null),[I,L]=(0,t.useState)("main"),[R,H]=(0,t.useState)(0),[z,O]=(0,t.useState)(10),[M,G]=(0,t.useState)("");(0,t.useEffect)((()=>{(async()=>{try{const e=(await b.A.get("".concat("http://localhost:8080","/api/events"),{params:{kolId:n}})).data;y(e)}catch(e){console.error("Error fetching Events:",e)}})()}),[n]);const q=s.filter((e=>e.conferenceName.toLowerCase().includes(M.toLowerCase()))),J=e=>{T(B===e?null:e)},K=()=>{L("main"),N(null),F(null),T(null)};return(0,C.jsx)(r.A,{sx:{flexGrow:1,width:"100%",p:2,overflow:"hidden",height:"100vh"},children:"main"===I?(0,C.jsxs)(C.Fragment,{children:[(0,C.jsxs)(r.A,{sx:{display:"flex",alignItems:"center",justifyContent:"space-between"},children:[(0,C.jsx)(a.A,{variant:"h6",gutterBottom:!0,color:"#3D52A0",children:"List of Events"}),(0,C.jsxs)(r.A,{sx:{display:"flex",alignItems:"center"},children:[(0,C.jsx)(v.A,{label:"Search Conferences",variant:"outlined",size:"small",value:M,onChange:e=>G(e.target.value),sx:{marginRight:"16px",width:"300px"}}),(0,C.jsx)(l.A,{component:"div",count:q.length,page:f,onPageChange:(e,n)=>{k(n)},rowsPerPage:S,onRowsPerPageChange:e=>{w(+e.target.value),k(0)},rowsPerPageOptions:[10,25,50]})]}),(0,C.jsx)(i.A,{variant:"contained",onClick:()=>{L("all"),N(null),F(null),T(null)},sx:{backgroundColor:"#7091E6"},children:"All"})]}),0===q.length?(0,C.jsx)(a.A,{variant:"body1",children:"No events found."}):(0,C.jsx)(o.A,{component:c.A,id:"scrollable-table",sx:{maxHeight:"70vh",overflow:"auto"},children:(0,C.jsxs)(d.A,{stickyHeader:!0,"aria-label":"collapsible table",children:[(0,C.jsx)(x.A,{sx:{backgroundColor:"#54C1DF"},children:(0,C.jsxs)(h.A,{children:[(0,C.jsx)(j.A,{children:(0,C.jsx)("strong",{children:"Sl No"})}),(0,C.jsx)(j.A,{children:(0,C.jsx)("strong",{children:"Conference Name"})}),(0,C.jsx)(j.A,{children:(0,C.jsx)("strong",{children:"Session Count"})})]})}),(0,C.jsx)(A.A,{children:q.slice(f*S,f*S+S).map((e=>(0,C.jsxs)(h.A,{sx:{"&:hover":{backgroundColor:"#F0F0F0",cursor:"pointer"}},onClick:()=>(e=>{P===e.id?F(null):(N(e),F(e.id),L("details"))})(e),children:[(0,C.jsx)(j.A,{children:e.slNo}),(0,C.jsx)(j.A,{children:e.conferenceName}),(0,C.jsx)(j.A,{children:e.sessionCount})]},e.id)))})]})})]}):"all"===I?(0,C.jsx)(C.Fragment,{children:(0,C.jsx)(D,{kolId:n,handleBackClick:K})}):(0,C.jsxs)(C.Fragment,{children:[(0,C.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[(0,C.jsx)(a.A,{variant:"h6",gutterBottom:!0,color:"#3D52A0",children:"Detailed Information"}),(0,C.jsx)(l.A,{component:"div",count:E?E.eventDetails.length:0,page:R,onPageChange:(e,n)=>{H(n)},rowsPerPage:z,onRowsPerPageChange:e=>{O(+e.target.value),H(0)},rowsPerPageOptions:[10,25,50]}),(0,C.jsx)(i.A,{variant:"contained",onClick:K,sx:{backgroundColor:"#7091E6"},children:"Back"})]}),(0,C.jsx)(r.A,{sx:{mt:4},children:(0,C.jsx)(o.A,{component:c.A,id:"scrollable-table",sx:{maxHeight:"70vh",overflow:"auto"},children:(0,C.jsxs)(d.A,{stickyHeader:!0,"aria-label":"detailed table",children:[(0,C.jsx)(x.A,{sx:{backgroundColor:"#54C1DF"},children:(0,C.jsxs)(h.A,{children:[(0,C.jsx)(j.A,{children:(0,C.jsx)("strong",{children:"Participation Date"})}),(0,C.jsx)(j.A,{children:(0,C.jsx)("strong",{children:"Event Country"})}),(0,C.jsx)(j.A,{children:(0,C.jsx)("strong",{children:"Conference Name"})}),(0,C.jsx)(j.A,{children:(0,C.jsx)("strong",{children:"Session Name"})}),(0,C.jsx)(j.A,{children:(0,C.jsx)("strong",{children:"Sponsor Name"})}),(0,C.jsx)(j.A,{children:(0,C.jsx)("strong",{children:"Role"})}),(0,C.jsx)(j.A,{})]})}),(0,C.jsx)(A.A,{children:E.eventDetails.slice(R*z,R*z+z).map(((e,n)=>(0,C.jsxs)(t.Fragment,{children:[(0,C.jsxs)(h.A,{sx:{"&:hover":{backgroundColor:"#F0F0F0",cursor:"pointer"}},onClick:()=>J(n),children:[(0,C.jsx)(j.A,{children:e.participationDate}),(0,C.jsx)(j.A,{children:e.eventCountry}),(0,C.jsx)(j.A,{children:E.conferenceName}),(0,C.jsx)(j.A,{children:e.sessionName}),(0,C.jsx)(j.A,{children:e.sponsorName}),(0,C.jsx)(j.A,{children:e.role}),(0,C.jsx)(j.A,{children:(0,C.jsx)(g.A,{"aria-label":"expand row",size:"small",onClick:()=>J(n),children:B===n?(0,C.jsx)(m.A,{}):(0,C.jsx)(p.A,{})})})]}),(0,C.jsx)(h.A,{children:(0,C.jsx)(j.A,{style:{paddingBottom:0,paddingTop:0},colSpan:10,children:(0,C.jsx)(u.A,{in:B===n,timeout:"auto",unmountOnExit:!0,children:(0,C.jsxs)(r.A,{margin:1,children:[(0,C.jsx)(a.A,{variant:"h6",gutterBottom:!0,component:"div",children:"Event Details"}),(0,C.jsxs)(a.A,{variant:"body2",children:[(0,C.jsx)("strong",{children:"Start Date:"})," ",e.eventDetails.startDate,(0,C.jsx)("br",{}),(0,C.jsx)("strong",{children:"End Date:"})," ",e.eventDetails.endDate,(0,C.jsx)("br",{}),(0,C.jsx)("strong",{children:"Location:"})," ",e.eventDetails.location,(0,C.jsx)("br",{}),(0,C.jsx)("strong",{children:"City:"})," ",e.eventDetails.city,(0,C.jsx)("br",{}),(0,C.jsx)("strong",{children:"State:"})," ",e.eventDetails.state,(0,C.jsx)("br",{}),(0,C.jsx)("strong",{children:"Abstract:"})," ",e.eventDetails.abstract,(0,C.jsx)("br",{}),(0,C.jsx)("strong",{children:"Session Type:"})," ",e.eventDetails.sessionType]})]})})})})]},n)))})]})})})]})})}},5473:(e,n,s)=>{var t=s(4994);n.A=void 0;var r=t(s(39)),a=s(579);n.A=(0,r.default)((0,a.jsx)("path",{d:"m12 8-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"}),"ExpandLess")},1337:(e,n,s)=>{var t=s(4994);n.A=void 0;var r=t(s(39)),a=s(579);n.A=(0,r.default)((0,a.jsx)("path",{d:"M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"}),"ExpandMore")}}]);
//# sourceMappingURL=893.396e7334.chunk.js.map