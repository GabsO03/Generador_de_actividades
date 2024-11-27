import { Activity } from "./activity.interface";
import { Imagenes } from "./imagen.interface";

export async function consigueActividad(participants:number, type:string):Promise<Activity[]> {
    return await new Promise<Activity[]>((resolve, reject) => {
        fetch('https://bored-api.appbrewery.com/filter?participants=' + participants + '&type=' + type)
        .then((response) => response.json())
        .then((data) => {
            resolve(data);
        })
        .catch((error) => reject(error.message));
    })
}

export function sacarRandom(cantidad:number):number {
    return Math.floor(Math.random() * cantidad);
}

export async function consigueImagen(activityTittle:string, category:string) {
    let actualCategory:string;
    switch(category) {
        case 'education':
            actualCategory = ['science', 'education', 'industry', 'computer'][sacarRandom(4)];
            break;
        case 'recreational':
            actualCategory = ['backgrounds', 'fashion', 'feelings', 'animals', 'sports', 'travel', 'music'][sacarRandom(7)];
            break;
        case 'social':
            actualCategory = ['people', 'fashion', 'religion', 'sports','music', 'places'][sacarRandom(3)];
            break;
        case 'charity':
            actualCategory = ['feelings', 'religion'][sacarRandom(2)];
            break;
        case 'cooking':
            actualCategory = 'food';
            break;
        case 'relaxation':
            actualCategory = ['nature', 'feelings', 'health', 'travel'][sacarRandom(4)];
            break;
        case 'busywork':
            actualCategory = ['business', 'computer'][sacarRandom(2)];
            break;
    }
    return await new Promise<string>((resolve, reject) => {
        const tituloSeparado:string[] = activityTittle.split(' ');
        const tituloReformado:string = tituloSeparado.join('+');
        fetch('https://pixabay.com/api/?key=47162172-27cc10e523dc3dbed5a4f21d6&image_type=photo&category=' + actualCategory + '&q=' + tituloReformado.substring(0, 100) + '&lang=en&orientation=horizontal')
        .then((response) => response.json())
        .then((imagenes:Imagenes) => {
            resolve(imagenes.hits[sacarRandom(imagenes.hits.length/2)].webformatURL);
        })
        .catch((error) => reject(error.message));
    })
}

