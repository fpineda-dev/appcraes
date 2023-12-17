(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function s(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(o){if(o.ep)return;o.ep=!0;const n=s(o);fetch(o.href,n)}})();class P{constructor({id:t,idMentioned:s,names:r,surnames:o,telephone:n,petition:a,baptized:c,Status:i,created:l,updated:p}){this.id=t,this.idMentioned=s,this.names=r,this.surnames=o,this.telephone=n,this.petition=a,this.baptized=c,this.Status=i,this.created=l,this.updated=p}}const B=e=>{const{id:t,id_mentioned:s,names:r,surnames:o,telephone:n,petition:a,baptized:c,status:i,created:l,updated:p}=e;return new P({id:t,idMentioned:s,names:r,surnames:o,telephone:n,petition:a,baptized:c,Status:i,created:l,updated:p})},w=async(e=1)=>{const t=new Date,s=t.getFullYear();let r=t.getMonth()+1,o=t.getDate();o<10&&(o="0"+o),r<10&&(r="0"+r);const n=o+"/"+r+"/"+s,a=`https://f970-177-93-4-21.ngrok-free.app/users?_page=${e}&created=${n}`;return(await(await fetch(a)).json()).map(B)},d={currentPage:0,users:[]},N=async()=>{const e=await w(d.currentPage+1);e.length!==0&&(d.currentPage+=1,d.users=e)},T=async()=>{if(d.currentPage===1)return;const e=await w(d.currentPage-1);d.users=e,d.currentPage-=1},M=e=>{let t=!1;d.users=d.users.map(s=>s.id===e.id?(t=!0,e):s),d.users.length<10&&!t&&d.users.push(e)},S=async()=>{const e=await w(d.currentPage);if(e.length===0){await T();return}d.users=e},u={loadNextPage:N,loadPreviousPage:T,onUserChanged:M,reloadPage:S,getUsers:()=>[...d.users],getCurrentPage:()=>d.currentPage};let g;const E=()=>{const e=document.createElement("table"),t=document.createElement("thead");t.innerHTML=`
      <tr>
        <th>Nombres</th>
        <th>Apellidos</th>
        <!--<th>Telefono</th>
         <th>Acciones</th> -->
      </tr>
    `;const s=document.createElement("tbody");return e.append(t,s),e},y=e=>{const t=u.getUsers();g||(g=E(),e.append(g));let s="";t.forEach(r=>{s+=`
        <tr>
           <td>${r.names}</td>
           <td>${r.surnames}</td>
           <!--<td>${r.telephone}</td>
            <td>
               <a href="#/" data-id="${r.id}">Select</a>
               |
               <a href="#/" data-id="${r.id}">Delete</a>
           </td> -->
      </tr>
        `}),g.querySelector("tbody").innerHTML=s},$=e=>{const{id:t,idMentioned:s,names:r,surnames:o,telephone:n,petition:a,baptized:c,Status:i,created:l,updated:p}=e;return{id:t,id_mentioned:s,names:r,surnames:o,telephone:n,petition:a,baptized:c,status:i,created:l,updated:p}},z=async e=>{const t=new P(e);if(!t.names||!t.surnames)throw"Full names and Last Name are required";const s=$(t);if(t.id)throw"No implementada la actualización";return await U(s)},U=async e=>{const r=await(await fetch("https://f970-177-93-4-21.ngrok-free.app/users",{method:"POST",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}})).json();return console.log({newUser:r}),r},A=e=>{const t=document.createElement("button");t.innerText=" Next >";const s=document.createElement("button");s.innerText="< Prev ";const r=document.createElement("span");r.id="current-page",r.innerText=u.getCurrentPage(),e.append(s,r,t),t.addEventListener("click",async()=>{await u.loadNextPage(),r.innerText=u.getCurrentPage(),y(e)}),s.addEventListener("click",async()=>{await u.loadPreviousPage(),r.innerText=u.getCurrentPage(),y(e)})},C=async e=>{await u.loadNextPage(),y(e),A(e)};class D extends HTMLElement{constructor(){super();let t=this.getAttribute("fullName"),s=this.getAttribute("fullLastName"),r=this.getAttribute("telephone"),o=this.getAttribute("petition");this.attachShadow({mode:"open"}),this.render(t,s,r,o)}get style(){return`
       
       form {
           position: absolute;
           left: 0;
           display: flex;
           justify-content: center;
           align-items: center;
           flex-direction: column;
           width: 100%;
           gap: 15px;
           transition: 0.5s;
       }

       form h2 {
           position: relative;
           color: #fff;
           font-size: 1.5em;
           letter-spacing: 0.1em;
           text-transform: uppercase;
           font-weight: 500;
           margin-bottom: 10px;
       }

       form .inputBox {
          position: relative;
          width: 70%;
          display: flex;
          justify-content: space-between;
       }

       form .app {
        align-items: center;
       }

       form .app button {
        margin: 10px;

        bottom:2em;
        right:2em;        
        border-radius:0.3em;
        color:white;
        background-color: transparent;
        text-decoration: none;
        font-weight: bold;
        border-style: solid;
        border: 1px solid #ffffff;        
        font-family: 'Raleway', sans-serif;        
        padding:0.8em 2em;
        cursor: pointer;
        font-size: 11px;
       }

       form .app #current-page {
          font-size: 1.3rem;
          color: white !important;
       }

       form .inputBox input, textarea
       {
          width: 100%;
          outline: none;
          border: 1px solid rgba(255,255,255,0.25);
          background: rgba(0,0,0,0.15);
          padding: 6px 15px;
          border-radius: 4px;
          font-size: 0.85em;
          color: #fff;
       }

       form .inputBox input::placeholder, textarea::placeholder
       {
           color: rgba(255,255,255,0.5);
       }

       form .inputBox input[type="submit"]
       {
         background: #02ccfe;
         font-weight: 500;
         cursor: pointer;
       } 
        
       #visitorsform
       {
         left: -100%;
       }

       #group #visitors
       {
        bottom:4em;
        right:4em;        
        border-radius:0.3em;
        color:white;
        text-decoration: none;
        font-weight: bold;
        border-style: solid;
        border: 1px solid #ffffff;
        font-family: 'Raleway', sans-serif;
        text-transform:uppercase;
        padding:0.8em 2em;
        cursor: pointer;
        font-size: 14px;

       }

       #group {        
        display: flex;
        justify-content: center;        
       }

       #group a {
        font-weight: 500;
        color: #fff;
        text-decoration: none;
       }

       table, th, td {
        border: 1px solid;
      }


     `}render(t,s,r,o){this.shadowRoot.innerHTML=`
        <style>${this.style}</style>       
              <form action="" class="form" id="mainForm">
                <h2 class="form__title">Visitas</h2>            
                    <div class="inputBox">
                        <input type="text" name="names" placeholder="${t}" />
                    </div>
                    <div class="inputBox">
                       <input type="text"  name="surnames" placeholder="${s}" />
                    </div>
                    <div class="inputBox">
                       <input type="text" name="telephone" placeholder="${r}" /> 
                    </div>
                    <div class="inputBox">
                       <textarea name="petition" id="petition" cols="30" rows="10" placeholder="${o}"></textarea>
                    </div> 
                    <div class="inputBox" id="group">
                        <a href="#" id="person">Mostrar</a>
                    </div>
                    <div class="inputBox">
                        <input type="submit" id="Report" value="Reportar">                        
                    </div>
              </form> 
              
              <!-- Ready to show visitors in the church -->

              <form action="" id="visitorsform">
                <h2 class="form__title">Almas para Cristo</h2>            
                    
                    <div class="app">                       
                    </div> 
                    <div class="inputBox" id="group">
                        <a href="#" id="visitors">Agregar</a>
                    </div>                    
              </form>              
           `;const n=this.shadowRoot.querySelector(".app");C(n);const a=this.shadowRoot.querySelector("#mainForm");a.addEventListener("submit",async c=>{c.preventDefault();const i={},l=new FormData(a);for(const[f,b]of l){if(f==="id"){i[f]=+b;continue}if(f==="baptized"||f==="status"){i[f]=b===1;continue}const x=new Date,L=x.getFullYear();let m=x.getMonth()+1,h=x.getDate();h<10&&(h="0"+h),m<10&&(m="0"+m);const v=h+"/"+m+"/"+L;i.idMentioned=1,i[f]=b,i.baptized=!1,i.Status=!1,i.created=v,i.updated=v}console.log(i),a==null||a.reset();const p=await z(i);u.onUserChanged(p),y()})}}customElements.define("form-body",D);
