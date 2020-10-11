import { saveAs } from 'file-saver'


export async function kirimData(url,data) {
    try {
        const result = await fetch(url,{
            method : 'POST',
            headers : {
                'content-type' : 'application/json',
            },
            body : JSON.stringify(data),
        }).then( _ => _.ok ? _.json() : new Error(_.message));
        return result;
    } catch(err) {
        console.error(err);
    }
}

export async function ambilData(url) {
    try {
        const result = await fetch(url,{
            method : 'GET',
            headers : {
                'content-type' : 'application/json',
            }
        }).then( _ => _.ok ? _.json() : _.message);
        return result;
    } catch(err) {
        console.error(err);
    }
}

export async function unduhKode(url,data) {
    try {
        const result = await fetch(url,{
            method : 'POST',
            headers :  {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify(data),
        }).then( _ => _.ok ? _.blob() : null)
          .then( blob => blob ? saveAs(blob, `${new Date().getTime()}-kode.png`) : null);
          return result;
    } catch(err) {
        console.error(err);
    }
}


export function buatUrl(baseUrl,query) {
    let url = baseUrl+'?';
    query.forEach( (q,index) => {
        url += `${q.name}=${q.value}${ index == query.length-1 ? "" : "&"}`;
    })
    return url;
}