document.addEventListener('DOMContentLoaded',function(){

    // resultado
    const resultado = document.querySelector('#resultado');
    resultado.classList.remove("fondo__resultado");
    
    // creando objeto ciudades
    const ciudades = {"1":"Amazona",
                      "2":"Áncash",
                      "3":"Apurímac",
                      "4":"Arequipa",
                      "5":"Ayacucho",
                      "6":"Cajamarca",
                      "7":"Cusco",
                      "8":"Huancavelica",
                      "9":"Huánuco",
                      "10":"Ica",
                      "11":"Junín",
                      "12":"La Libertad",
                      "13":"Lambayeque",
                      "14":"Lima",
                      "15":"Loreto",
                      "16":"Madre de Dios",
                      "17":"Moquegua",
                      "18":"Pasco",
                      "19":"Piura",
                      "20":"Puno",
                      "21":"San Martín",
                      "22":"Tacna",
                      "23":"Tumbes",
                      "24":"Ucayali"}, provincias = {'1':{"1":"Chachapoyas",
                                                            "2":"Bagua",
                                                            "3":"Bongará",
                                                            "4":"Condorcanqui",
                                                            "5":"Luya",
                                                            "6":"Rodríguez de Mendoza",
                                                            "7":"Utcubamba"},
                                                        '2':{ "1":"Aija",
                                                            "2":"Antonio Raymondi",
                                                            "3":"Asunción",
                                                            "4":"Bolognesi",
                                                            "5":"Carhuaz"},
                                                        '3':{"1":"Abancay",
                                                            "2":"Antabamba",
                                                            "3":"Aymaraes",
                                                            "4":"Cotabambas",
                                                            "5":"Grau",
                                                            "6":"Chincheros",
                                                            "7":"Andahuaylas"},
                                                        '4':{"1":"Arequipa",
                                                              "2":"Camaná",
                                                              "3":"Caravelí",
                                                              "4":"Castilla",
                                                              "5":"Caylloma",
                                                              "6":"Condesuyos",
                                                              "7":"Islay",
                                                              "8":"La Unión"},
                                                        '5':{"1":"Cangallo",
                                                            "2":"Huanta",
                                                            "3":"Huamanga",
                                                            "4":"Huanca Sancos",
                                                            "5":"La Mar",
                                                            "6":"Lucanas"}};

    agregarCiudad(ciudades);

    // funcion para buscar ciudades
    function agregarCiudad(datos){
        
        let lugarNacido = document.querySelector('#cbxCiudades');
    
        for(valor in datos){
            opcion = document.createElement('option');
            opcion.value = valor;
            opcion.text = datos[valor];
            lugarNacido.add(opcion);
        }

    }

    // funcion para agregar provincias
    function agregarProvincias(datos){
        
        let provincia = document.querySelector('#cbxProvincias');
        
        for(let i=provincia.options.length;i>=1;i--){
            provincia.remove(i);
        }
        
        for(valor in datos){
            opcion = document.createElement('option');
            opcion.value = valor;
            opcion.text = datos[valor];
            provincia.add(opcion);
        }

    }

    // seleccionar provincias
    const cbxCiudades = window.document.querySelector('#cbxCiudades');
    cbxCiudades.onchange = function(){
        let provinciaSeleccionado = this.value;
        agregarProvincias(provincias[provinciaSeleccionado]);
    }

    // botón para consultar
    const btn = document.querySelector('#btnConsultar');
        btn.addEventListener('click',imprimirDatos);
    function imprimirDatos(evento){
        
        // evitar recarga de pantalla
        evento.preventDefault();

        // opteniendo datos
        let txtNombres = (document.querySelector('#txtnombres').value).trim(),
        txtApellidos =  (document.querySelector('#txtApellidos').value).trim(),
        cbxGenero = document.querySelector('#cbxGenero').value, 
        cbxLugarNacimiento = document.querySelector('#cbxCiudades').value,
        cbxProvincias = document.querySelector('#cbxProvincias').value,
        txtEstatura = (document.querySelector('#txtEstatura').value).trim();
        
        // validar estatura
        let estatura = '', genero='', provinciano = '';

        // validación de ingreso de datos
        if(txtNombres.length != 0 && txtApellidos.length != 0 && txtEstatura.length != 0 && cbxLugarNacimiento !=''){

            // validacion de genero
            switch (cbxGenero){
                
                case 'F':
                    genero = 'Femenino';

                    if(txtEstatura<=1.65){
                        estatura = 'Pequeña';
                    }else if(txtEstatura<=2.5){
                        estatura = 'Alta';
                    }else{
                        estatura = 'Gigante';
                    }

                    if(cbxLugarNacimiento != '' && cbxProvincias != ''){
                        provinciano = 'Provinciana';
                    }else{
                        provinciano='Capitalina';
                    }

                break;

                case 'M':
                    
                    genero = 'Masculino';

                    if(txtEstatura <=1.70){
                        estatura = 'Pequeño';
                    }else if(txtEstatura <= 2.5){
                        estatura = 'Alto';
                    }else{
                        estatura = 'Gigante';
                    }

                    if(cbxLugarNacimiento != '' && cbxProvincias != ''){
                        provinciano = 'Provinciano';
                    }else{
                        provinciano='Capitalino';
                    }

                break;

            } 

            // Creando objeto persona para imprimir
            const persona = {
                nombres:txtNombres,
                apellidos:txtApellidos,
                genero:genero,
                provinciano:provinciano,
                estatura:estatura
            }

            // Resultado
            resultado.classList.add("fondo__resultado");
            resultado.innerHTML = '';
            resultado.innerHTML = `<p>NOMBRES: ${persona.nombres +' '+ persona.apellidos}</p>`;
            resultado.innerHTML += `<p>GÉNERO: <b>${persona.genero}</b></p>`;
            resultado.innerHTML += `<p>ERES: <b>${persona.provinciano}</b></p>`;
            resultado.innerHTML += `<p>ESTATURA: <b>${persona.estatura}</b></p>`;
            
            setTimeout(function(){
                resultado.classList.remove("fondo__resultado");
                resultado.innerHTML = '';
            },10000);
            
        }else{
            resultado.classList.remove("fondo__resultado");
            resultado.innerHTML = '';
            alert('ATENCION: ¡Hay campos obligatorios vacíos!');

        }
        
        
    }

});