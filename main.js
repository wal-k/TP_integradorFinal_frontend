import { calcular_descuentos } from "./modules/funciones.js";
import { validarDatos } from "./modules/funciones.js";
import { agregarResultado } from "./modules/funciones.js";



function enviar(){

    let nombre = document.getElementById('campo_nombre').value;
    let apellido = document.getElementById('campo_apellido').value;
    alert("Tu mensaje ha sido enviado " + nombre + " " + apellido + "!");

}


//Linkeo el botón que voy a usar

const button = document.getElementById('resumen1');

//Traigo los datos desde el formulario de la web

const precio = 200;


//Creo la función que une la otra función para calcular monto y mostrar en pantalla de la web

function resumen() {

    const cantidad = document.getElementById('cant_input').value;

    const categoria = document.getElementById('categoria_input').value;


    if(validarDatos(cantidad, categoria)){
      

        let resultado = calcular_descuentos(cantidad, precio, categoria);


        agregarResultado(resultado);

} else {
    alert("Verifique los datos ingresados");
}
}


window.enviar = enviar;
window.resumen = resumen;