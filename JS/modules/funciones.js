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


//Funciones Orador

    let oradorId;
    let oradores = [];
    let oradorActual;

    const setId = (id) => {
        oradorId = id;
        const orador = oradores.find(o => o.id === id);
        oradorActual = orador;
        

        document.getElementById('nombreActualizar').value = oradorActual.nombre;
        document.getElementById('apellidoActualizar').value = oradorActual.apellido;
        document.getElementById('mailActualizar').value = oradorActual.mail;
        document.getElementById('temaActualizar').value = oradorActual.tema;
    }

    const setOradores = (nuevosOradores) => {
        oradores = nuevosOradores;
    }

    const actualizarOrador = () => {
        //debugger;
        if(!oradorActual) {
            return;
        }
        const nombre = document.getElementById('nombreActualizar').value;
        const apellido = document.getElementById('apellidoActualizar').value;
        const mail = document.getElementById('mailActualizar').value;
        const tema = document.getElementById('temaActualizar').value;
                
        const orador = {
            nombre,
            apellido,
            mail,
            tema
        };

        //put al servidor
        //1 preparo la peticion
        const respuesta = fetch(`http://localhost:8080/web-app/api/orador?id=${oradorActual.id}`,{
            method: 'PUT',
            body: JSON.stringify(orador)
        });

        //2 intento reosolver la promesa
        respuesta
            .then(response => response)//solo recibe la confirmacion de ok y con eso lanza el alert
            .then(respuesta => {
                //debugger;
                //actualizar el div del html con la informacion
                alert(`Se ha actualizado el orador id: ${oradorActual.id}`);

                //cerrar el modal
                document.getElementById('btnCerrar').click()
                listarOradores();
            })
            .catch(error => console.log(error))
    }

    try {
        document.getElementById('btnActualizar').addEventListener('click', actualizarOrador);
        document.getElementById('btnListado').addEventListener('click', listarOradores);
    } catch { }
    


    const nuevoOrador =(nombreId, apellidoId, emailId, temaId) => { 
        // debugger;
         const nombre = document.getElementById(nombreId).value;
         const apellido = document.getElementById(apellidoId).value;
         const mail = document.getElementById(emailId).value;
         const tema = document.getElementById(temaId).value;
     
         const orador = {
             nombre,
             apellido,
             mail,
             tema
         };
     
         //post al servidor
         //1 preparo la peticion
         const respuesta = fetch('http://localhost:8080/web-app/api/orador',{
             method: 'POST',
             body: JSON.stringify(orador)
         });
     
         //2 intento reosolver la promesa
         respuesta
             .then(response => response.json())
             .then(respuesta => {
                 //actualizar el div del html con la informacion
                 alert(`Se ha dado de alta el orador id ${respuesta.id}: ${respuesta.nombre} ${respuesta.apellido}`);
             })
             .catch(error => console.log(alert('El email ya se encuentra registrado') + error), )
     }
     
     

const eliminarOrador = (id) => {
   // debugger;
    if (!confirm(`Esta seguro de eliminar el registro: ${id} ?`)) { 
        return;
    }
    const respuesta = fetch(`http://localhost:8080/web-app/api/orador?id=${id}`, {
        method: 'DELETE',
    });

    //2 intento reosolver la promesa
    respuesta
        .then(response => response)
        .then(respuesta => {
            //actualizar el div del html con la informacion
            alert(`Se ha eliminado el orador id: ${id}`);
            listarOradores();
        })
        .catch(error => console.log(error))}



function listarOradores() {

    //1 preparo la peticion
    const respuesta = fetch('http://localhost:8080/web-app/api/orador');
    
    //2 intento reosolver la promesa
    respuesta
        .then(response => response.json())
        .then(users => {
            //actualizar el div del html con la informacion
            dibujarTabla(users)
            setOradores(users);
        })  
        .catch(error => console.log(error))
}

function dibujarTabla(data) {
    const rows = dibujarFilas(data);

    try { document.getElementById('usersRows').innerHTML = rows; }

    catch { }   
    
}

function dibujarFilas(oradores) {
    let rows = ``;
    for (let orador of oradores) {//ctrl+d ctr+f2
        //console.log(user)
        rows += `
    <tr>
        <th scope="row">${orador.id}</th>
        <td>${orador.nombre}</td>
        <td>${orador.apellido}</td>
        <td>${orador.tema}</td>
        <td>${orador.mail}</td>
        <td>
            <button onClick="eliminarOrador(${orador.id})"><i class="fas fa-trash"></i></button>
            <button type="button" class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick="setId(${orador.id})">Editar</button>
        </td>
        
    </tr>
    `
    }
    return rows;
}



// function limpiarInputOradores(){
//     nombre.value="";
//     apellido.value="";
//     mail.value="";
//     tema.value="";
// }



//Evento automático
window.addEventListener("load", (event) => {
    listarOradores();
});

export {calcular_descuentos, validarDatos, agregarResultado};

window.borrar = borrar;
window.setId= setId;
window.nuevoOrador = nuevoOrador;
window.eliminarOrador= eliminarOrador;


