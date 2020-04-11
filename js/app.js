//Constructor que recolecta los datos del form
function Seguro(marca, anio, tipo) {
    this.marca = marca;
    this.anio = anio;
    this.tipo = tipo;
}

Seguro.prototype.cotizarSeguro = function () {
    /*
    1= americano 1.15
    2= asiatico 1.05
    3= europeo 1.35
    */
    let cantidad;
    const base = 2000;
    switch (this.marca) {
        case '1':
            cantidad = base * 1.15;
            break;
        case '2':
            cantidad = base * 1.05;
            break;
        case '3':
            cantidad = base * 1.35;
            break;
    }
    //Leer el dato del campo año y nos regresa la diferencia de tiempo
    //Entre la fecha del sistema tomada con el metodo getFullYear y el valor de la variable anio
    const diferencia = new Date().getFullYear() - this.anio;
    //Cada año de diferencia reduciremos 3% del valor del seguro
    //Osea cada año atras partiendo de la fecha actual, se reducirá 3% menos.
    cantidad -= ((diferencia * 3) * cantidad) / 100;

    /* 
    Si el seguro es de tipo básico se multiplica por 30% +
    Y si es completo se multiplica por 50% +*/
    if (this.tipo === 'basico') {
        cantidad *= 1.30;
    } else {
        cantidad *= 1.50;
    }

    return cantidad;
}


//Todo el contenido que se momstrará
function Interfaz(){}
//Mensaje de erro al no llenar los campos, esta funcion solo esta disponible para le objeto Intefaz
Interfaz.prototype.mostrarMensaje = function (mensaje, tipo) {
    const div = document.createElement('div');
    if (tipo === 'error') {
        div.classList.add('mensaje', 'error');
    } else {
        div.classList.add('mensaje', 'correcto');
    }
    div.innerHTML = `${mensaje}`;
    formulario.insertBefore(div, document.querySelector(".form-group"));
    setTimeout(function () {
        document.querySelector('.mensaje').remove();
    }, 3000);
}





//Imprime el resultado de la cotización
Interfaz.prototype.mostrarResultado = function (seguro, total) {
    //seleccionamos el id del div donde se mostraram los resultados
    const resultado = document.getElementById('resultado');
    let marca;
    switch (seguro.marca) {
        case '1':
            marca = 'Americano';
            break;
        case '2':
            marca = 'Asiatico';
            break;
        case '3':
            marca = 'Europeo';
            break;
    }
    //Creamos el div y lo llenamos con la info que ya tenemos
    const div = document.createElement('div');
    //Insertamos la info
    div.innerHTML= `
    <p class="header">Tu cotización es:</p>
    <p>Marcar: ${marca}</p>
    <p>Año: ${seguro.anio}</p>
    <p>Tipo: ${seguro.tipo}</p>
    <p<Total ${total}</p>`;

    //Agregamos el spinner en el form, cuando realizemos una cotización
    //Y definimos el tiempo el cual se mostrará.
    const spinner = document.querySelector('#cargando img');
    spinner.style.display= 'block';
    setTimeout(function(){
        spinner.style.display='none';
        resultado.appendChild(div);
    }, 3000);
}




//EventListener al precionar el boton cotizar
const formulario = document.getElementById('cotizar-seguro');
formulario.addEventListener('submit', function (e) {
    e.preventDefault();
    //leer la marca seleccionada del select
    const marca = document.getElementById('marca');
    const marcaSeeccionada = marca.options[marca.selectedIndex].value;

    //Leer el año seleccionado del select
    const anio = document.getElementById('anio');
    const anioSeleccionado = anio.options[anio.selectedIndex].value;

    //lee el valor del radio buttom
    const tipo = document.querySelector('input[name="tipo"]:checked').value;


    //Instancia de una interface
    const interfaz = new Interfaz();
    //Revizamos que los campos del form no esten vacios
    if (marcaSeeccionada === '' || anioSeleccionado === '' || tipo
        === '') {
        interfaz.mostrarMensaje('Faltan datos', 'error');
    } else {
        //Limpiamos los resultados anteriores, manteniendo solo un div en el form
        const resultados= document.querySelector('#resultado div');
        if(resultados != null){
            resultados.remove();
        }
        //Instanciamos seguro y mostramos los datos
        const seguro = new Seguro(marcaSeeccionada, anioSeleccionado, tipo);
        //Cotizar el seguro con un prototype que pertenecerá solo a Seguro
        const cantidad = seguro.cotizarSeguro();
        //Mostrar el resultado
        interfaz.mostrarResultado(seguro, cantidad);
        //Mostramos un mensaje de procesamiento de la operación
        interfaz.mostrarMensaje('Cotizando...', 'Proceso correcto');
    }

});

const max = new Date().getFullYear(),
    min = max - 20;

const selectAnios = document.getElementById('anio');
for (let i = max; i > min; i--) {
    let option = document.createElement('option');
    option.value = i;
    option.innerHTML = i;
    selectAnios.appendChild(option);
}
