function borrar(){
    var element = document.getElementById("formTickets");
    var resultado = document.getElementById("totalAPagar");
    
     element.reset();
     resultado.innerHTML = "";
  }

function calcular_descuentos(cantidad,precio,categoria){ 
    
    const descuento = { sindescuento : 1.0,
        estudiante: 0.2,
        trainee: 0.5,
        junior: 0.85};

    if ( Object.keys(descuento).includes(categoria)){

        return cantidad * precio * descuento[categoria];

    } else { 
        
        throw new Error('Err. calcular_descuentos(): categoria invalida'); 

    }; 
};

//Creo función que valide datos de compra ingresados




function validarDatos (cantidad, categoria){

    return cantidad > 0 && categoria != "seleccione";

} 



//Hago función para pasar el resultado al html

function agregarResultado(resultado) {

    let parrafo = document.getElementById("totalAPagar");
   
    parrafo.innerHTML = `<span class="montoTotal">Total a pagar $ ${resultado}</span>`;

}

export {calcular_descuentos, validarDatos, agregarResultado};

window.borrar = borrar;

