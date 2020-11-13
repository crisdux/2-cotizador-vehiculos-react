//diferencia de años
export const obtenerDiferenciaYear = (year) => new Date().getFullYear()-year;

//calcula el total a pagar segun la marca
export  const calcularMarca = marca => {
    let incremento;
    switch(marca){
        case 'europeo':
            incremento= 1.30;
            break;
        case 'americano':
            incremento= 1.15;
            break;
        case 'asiatico':
            incremento= 1.05;
            break;
        default:
            break;
    }
    return incremento;
}

//calcular el oprcentaje correspondinete segun el plan: basico => 20% | completo=> 50%

export const obtenerPlan = plan => (plan === 'basico')  ? 1.20 : 1.50;

export const primeraLetraMayuscula = (palabra) => {
    return palabra.charAt(0).toUpperCase() + palabra.slice(1);
}