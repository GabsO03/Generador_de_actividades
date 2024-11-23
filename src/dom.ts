import { Activity } from "./activity.interface";
import { consigueActividad, consigueImagen, sacarRandom } from "./funciones";



export function inicio():void {
  document.querySelector('#app')!.innerHTML = `<div class="flex flex-col items-center text-white">
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
      </div> `;
      const btnGenerar = document.getElementById('generarActividad');
      if (btnGenerar) {
        btnGenerar.addEventListener('click', () => procesarActividad(true));
      }
}

let type:string;
let participants:string;
let numParticipans:number;
let procede:boolean;

function procesarActividad(newActivity:boolean = false) {
  if(newActivity) {
    type = (document.getElementById('type') as HTMLSelectElement).value;
    participants = (document.getElementById('participants') as HTMLSelectElement).value;
    const tiposValidos = ['education', 'recreational', 'social', 'charity', 'cooking', 'relaxation', 'busywork'];
  
    if(tiposValidos.includes(type) && !isNaN(parseInt(participants))) {
      numParticipans = parseInt(participants);
      if(numParticipans > 0 && numParticipans < 9) {
  
        if(document.getElementById('error')) document.getElementById('error')!.textContent = '';
  
        procede = true;
      }
    }
    else {
      document.getElementById('error')!.textContent = 'Primero selecciona tus preferencias 🫣';
    }
  }


  if(procede) {
    consigueActividad(numParticipans, type)
    .then((actividades:Activity[]) => {
      const posActividadRandom:number = sacarRandom(actividades.length);
      const actividad:Activity = actividades[posActividadRandom];
      consigueImagen(actividad.activity, type)
      .then((imagenUrl:string) => {
        muestraActividad(actividad, imagenUrl, actividades.length === 1);
      })
    })
    .catch(() => {
      inicio();
      document.getElementById('error')!.textContent = 'Se agotaron las peticiones 😣 vuelve luego 👌';
    })
  }
}

//Esto solo pinta la actividad
function muestraActividad(actividad:Activity, imagenUrl:string, soloHayUnaActividad:boolean):void {
  document.querySelector('#app')!.innerHTML = `
  <div class="w-full max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow">
    <a href="` + (actividad.link? actividad.link:'#') + `">
        <img class="p-8 rounded-t-lg" src="` + imagenUrl + `" alt="product image" />
    </a>
    <div class="px-8 pb-5">
        <a href="` + (actividad.link? actividad.link:'#') + `">
            <h5 class="text-xl font-semibold tracking-tight text-gray-900 mb-4">` +
            actividad.activity + `</h5>
        </a>
        <div class="flex flex-wrap mb-5">
          <div class="flex items-center mt-2.5  ml-1">
            <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">Accesibilidad: ` +
            actividad.accessibility + `</span>
          </div>
          <div class="flex items-center mt-2.5 mx-1">
            <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">Costo ` +
            (actividad.price*100) + `%</span>
          </div>
          <div class="flex items-center mt-2 mx-1">
            <span class="flex flex-row bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
              <p>` + actividad.participants + `</p>
            </span>
          </div>
          <div class="flex items-center mt-2 mr-1">
            <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">Tipo: ` + actividad.type  + `</span>
          </div>
        </div>
        
        <div class="w-full my-2">
            <button type='button' id='volver' class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center">Volver atrás</button>

            <button type='button' id='generarActividad' class="text-white ` + (soloHayUnaActividad?`bg-slate-700`:`bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300`) + ` font-medium rounded-lg text-lg px-5 py-2.5 text-center">Generar otra</button>
        </div>` + 
        (soloHayUnaActividad?`<p class="text-white">A veces solo existe una actividad así que no se puede generar otra 😔</p>`:``) + `
      </div>
    </div>
  `;

  const btnGenerar = document.getElementById('generarActividad');
  if(btnGenerar) {
    btnGenerar.addEventListener('click', () => procesarActividad())
  }

  const volver = document.getElementById('volver');
  if (volver) {
    volver.addEventListener('click', inicio);
  }
}