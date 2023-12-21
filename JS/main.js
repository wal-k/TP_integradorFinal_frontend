import { calcular_descuentos } from "./modules/funciones.js";
import { validarDatos } from "./modules/funciones.js";
import { agregarResultado } from "./modules/funciones.js";




function enviar(){
        //debugger;
        let nombre = document.getElementById('campo_nombre').value;
        let apellido = document.getElementById('campo_apellido').value;
        let mail = document.getElementById('campo_email').value;
        let tema = document.getElementById('mje').value;

        
        const orador = {
            nombre,
            apellido,
            mail,
            tema
        };
        


        alert("Tu mensaje ha sido enviado " + nombre + " " + apellido + "!");
        //post al servidor
        //1 preparo la peticion
        const respuesta = fetch(`http://localhost:8080/web-app/api/orador`, {
            method: 'POST',
            body: JSON.stringify(orador)
        });

        //2 intento reosolver la promesa
        respuesta
            .then(response => response.json())
            .then(respuesta => {
                //actualizar el div del html con la informacion
                alert(`Se ha dado de alta el orador id: ${respuesta.id}`);
                listarOradores();
                limpiarInputOradores();
            })
            .catch(error => console.log(error))

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

//Funciones Backend

