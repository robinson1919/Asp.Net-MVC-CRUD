
listar();
function listar() {
    $.get("Crud/listar", function (data) {
        //console.log(data);
        var arrayColumns = [];
        arrayColumns = Object.keys(data[0]);
        crearListado(arrayColumns, data);
    })
}

function crearListado(arrayColumns, data){
    var contenido = '';
    contenido += '<table class="table">';
    contenido += '<thead>';
    contenido += '<th scope="col">ID</th>';
    contenido += '<th scope="col">Nombre</th>';
    contenido += '<th scope="col">Apellido</th>';
    contenido += '<th scope="col">Edad</th>';
    contenido += '<th scope="col">Aciones</th>';
    contenido += '</tr>';
    contenido += '</thead>';
    contenido += '<tbody>';
    var nData = data.length;
    var nArrayColumns = arrayColumns.length;
    for (var i = 0; i < nData; i++) {
        contenido += '<tr>';
        for (var j = 0; j < nArrayColumns; j++) {
            var countArrayColumns = arrayColumns[j];
            contenido += '<td>' + data[i][countArrayColumns] + '</td>';
            
        }
        var id = data[i].id;
        contenido += '<td><button class="btn btn-warning" onClick="openModal(' + id +')" data-toggle="modal" data-target="#exampleModal">Editar</button>&nbsp&nbsp';
        contenido += '<button class="btn btn-danger" onClick="eliminar(' + id +')">Eliminar</button></td>';
    }
    
    contenido += '</tr>';
    contenido += '</tbody>';
    contenido += '</table>';

    document.querySelector('#table').innerHTML = contenido;


}

function openModal(id) {
    if (id === 0) {
        borrarInputs();
    } else {
        $.get("Crud/recuperarInfo/?id=" + id, function (data) {
            console.log(data);
            var id = data[0].id;
            var nombre = data[0].firstName;
            var apellido = data[0].lastName;
            var edad = data[0].age;

            document.querySelector('#id').value = id;
            document.querySelector('#nombre').value = nombre;
            document.querySelector('#apellido').value = apellido;
            document.querySelector('#edad').value = edad;

        });
    }
}

function borrarInputs() {
    var inputs = document.querySelectorAll('.form-control');
    var nInputs = inputs.length;
    for (var i = 0; i < nInputs; i++) {
        inputs[i].value = '';
    }
}

function agregar() {
    var datos = new FormData();
    var id = document.querySelector('#id').value;
    var nombre = document.querySelector('#nombre').value;
    var apellido = document.querySelector('#apellido').value;
    var edad = document.querySelector('#edad').value;

    datos.append('id', id);
    datos.append('firstName', nombre);
    datos.append('lastName', apellido);
    datos.append('age', edad);
    datos.append('active', 1);

    $.ajax({
        type: 'POST', 
        url: 'Crud/save',
        data: datos,
        contentType: false,
        processData: false,
        success: function (response) {
            console.log(response);
            listar();
            document.querySelector('.close').click();
        }
    })
}

function eliminar(id) {
    $.get("Crud/eliminar/?id=" + id, function (data) {
        listar();
    })
}