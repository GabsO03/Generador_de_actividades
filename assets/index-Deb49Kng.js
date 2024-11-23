(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();async function g(t,n){return await new Promise((o,i)=>{fetch("/api/filter?participants="+t+"&type="+n).then(e=>e.json()).then(e=>{o(e)}).catch(e=>i(e.message))})}function s(t){return Math.floor(Math.random()*t)}async function b(t,n){let o;switch(n){case"education":o=["science","education","industry","computer"][s(4)];break;case"recreational":o=["backgrounds","fashion","feelings","animals","sports","travel","music"][s(7)];break;case"social":o=["people","fashion","religion","sports","music","places"][s(3)];break;case"charity":o=["feelings","religion"][s(2)];break;case"cooking":o="food";break;case"relaxation":o=["nature","feelings","health","travel"][s(4)];break;case"busywork":o=["business","computer"][s(2)];break}return await new Promise((i,e)=>{const l=t.split(" ").join("+");fetch("https://pixabay.com/api/?key=47162172-27cc10e523dc3dbed5a4f21d6&image_type=photo&category="+o+"&q="+l.substring(0,100)+"&lang=en&orientation=horizontal").then(a=>a.json()).then(a=>{i(a.hits[s(a.hits.length/2)].webformatURL)}).catch(a=>e(a.message))})}function p(){document.querySelector("#app").innerHTML=`<div class="flex flex-col items-center text-white">
        <p class="text-xl">Bienvenido</p>
        <h1 class="text-5xl font-bold">Encuentra tu actividad</h1>
        <p class="text-lg mt-1">Selecciona los parámetros de tu preferencia</p>
        <section class="mt-5">
          <form class="max-w-sm mx-auto">
            <div class="flex justify-between">
              <select id="participants" class="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 mr-1">
                <option selected>Nro participantes</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
              </select>
              <select id="type" class="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3">
                <option selected>Tipo de actividad</option>
                <option value="education">Education</option>
                <option value="recreational">Recreational</option>
                <option value="social">Social</option>
                <option value="charity">Charity</option>
                <option value="cooking">Cooking</option>
                <option value="relaxation">Relaxation</option>
                <option value="busywork">Busywork</option>
              </select>
            </div>
            <button type="button" id='generarActividad' class="w-full text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 my-4">Generar actividad</button>
            <p id="error"></p>
          </form>
        </section>
      </div> `;const t=document.getElementById("generarActividad");t&&t.addEventListener("click",()=>m(!0))}let c,d,u,f;function m(t=!1){t&&(c=document.getElementById("type").value,d=document.getElementById("participants").value,["education","recreational","social","charity","cooking","relaxation","busywork"].includes(c)&&!isNaN(parseInt(d))?(u=parseInt(d),u>0&&u<9&&(document.getElementById("error")&&(document.getElementById("error").textContent=""),f=!0)):document.getElementById("error").textContent="Primero selecciona tus preferencias 🫣"),f&&g(u,c).then(n=>{const o=s(n.length),i=n[o];b(i.activity,c).then(e=>{x(i,e,n.length===1)})}).catch(n=>{console.log(n),p(),document.getElementById("error").textContent="Se agotaron las peticiones 😣 vuelve luego 👌"})}function x(t,n,o){document.querySelector("#app").innerHTML=`
  <div class="w-full max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow">
    <a href="`+(t.link?t.link:"#")+`">
        <img class="p-8 rounded-t-lg" src="`+n+`" alt="product image" />
    </a>
    <div class="px-8 pb-5">
        <a href="`+(t.link?t.link:"#")+`">
            <h5 class="text-xl font-semibold tracking-tight text-gray-900 mb-4">`+t.activity+`</h5>
        </a>
        <div class="flex flex-wrap mb-5">
          <div class="flex items-center mt-2.5  ml-1">
            <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">Accesibilidad: `+t.accessibility+`</span>
          </div>
          <div class="flex items-center mt-2.5 mx-1">
            <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">Costo `+t.price*100+`%</span>
          </div>
          <div class="flex items-center mt-2 mx-1">
            <span class="flex flex-row bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
              <p>`+t.participants+`</p>
            </span>
          </div>
          <div class="flex items-center mt-2 mr-1">
            <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">Tipo: `+t.type+`</span>
          </div>
        </div>
        
        <div class="w-full my-2">
            <button type='button' id='volver' class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center">Volver atrás</button>

            <button type='button' id='generarActividad' class="text-white `+(o?"bg-slate-700":"bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300")+` font-medium rounded-lg text-lg px-5 py-2.5 text-center">Generar otra</button>
        </div>`+(o?'<p class="text-white">A veces solo existe una actividad así que no se puede generar otra 😔</p>':"")+`
      </div>
    </div>
  `;const i=document.getElementById("generarActividad");i&&i.addEventListener("click",()=>m());const e=document.getElementById("volver");e&&e.addEventListener("click",p)}document.addEventListener("DOMContentLoaded",()=>{p()});
