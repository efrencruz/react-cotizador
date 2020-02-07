export function obtenerDiferenciaYear(year) {
    return new Date().getFullYear() - year;
}

export function calcularMarca(marca) {
    let incremento;

    switch (marca) {
        case 'americano':
            incremento = 1.15;
            break;
        case 'europeo':
            incremento = 1.3;
            break;
        case 'asiatico':
            incremento = 1.05;
            break;
        default:
            break;
    }

    return incremento;
}

export function calcularPlan(plan) {
    let incremento;
    switch (plan) {
        case 'basico':
            incremento = 1.2;
            break;
        case 'completo':
            incremento = 1.5;
            break;
        default:
            break;
    }

    return incremento;
}

export function primeraMayuscula(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
}
