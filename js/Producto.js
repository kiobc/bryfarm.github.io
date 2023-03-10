$(document).ready(function(){
    var funcion;
    $('.select2').select2();
    rellenar_laboratorios();
    rellenar_tipos();
    rellenar_presentaciones();
    buscar_producto();
function rellenar_laboratorios(){
    funcion="rellenar_laboratorios";
    $.post('../controlador/laboratoriocontroler.php',{funcion},(Response)=>{
        const laboratorios =JSON.parse(Response);
        let template='';
        laboratorios.forEach(laboratorio => {
            template+=`
                <option value="${laboratorio.id}">${laboratorio.nombre}</option>
            `;
        });
        $('#laboratorio').html(template);;
    })
}

function rellenar_tipos(){
    funcion="rellenar_tipos";
    $.post('../controlador/tipocontroler.php',{funcion},(Response)=>{
        const tipos =JSON.parse(Response);
        let template='';
        tipos.forEach(tipo => {
            template+=`
                <option value="${tipo.id}">${tipo.nombre}</option>
            `;
        });
        $('#tipo').html(template);;
    })
}

function rellenar_presentaciones(){
    funcion="rellenar_presentaciones";
    $.post('../controlador/presentacioncontroler.php',{funcion},(Response)=>{
        const presentaciones =JSON.parse(Response);
        let template='';
        presentaciones.forEach(presentacion => {
            template+=`
                <option value="${presentacion.id}">${presentacion.nombre}</option>
            `;
        });
        $('#presentacion').html(template);;
    })
}
$('#form-crear-producto').submit(e=>{
    let nombre =$('#nombre_producto').val();
    let concentracion =$('#concentracion').val();
    let adicional =$('#adicional').val();
    let precio =$('#precio').val();
    let laboratorio =$('#laboratorio').val();
    let tipo =$('#tipo').val();
    let presentacion =$('#presentacion').val();
funcion="crear";
$.post('../controlador/productocontroler.php',{funcion,nombre,concentracion,adicional,precio,laboratorio,tipo,presentacion},(Response)=>{
if(Response=='add'){
    $('#add').hide('slow');
    $('#add').show(2000);
    $('#add').hide(2500);
    $('#form-crear-producto').trigger('reset');
    buscar_producto();
}
if(Response=='noadd'){
    $('#noadd').hide('slow');
    $('#noadd').show(2000);
    $('#noadd').hide(2500);
    $('#form-crear-producto').trigger('reset');
    buscar_producto();
}
});
e.preventDefault();
});
    function buscar_producto(consulta){
        funcion="buscar"; 
        $.post('../controlador/productocontroler.php',{consulta,funcion},(Response)=>{
          const productos = JSON.parse(Response) ;
          let template='';
          productos.forEach(producto =>{
            template+=`
            <div prodId="${producto.id}"prodStock="${producto.stock}" prodNombre="${producto.nombre}" prodPrecio="${producto.precio}" prodConcentracion="${producto.concentracion}" prodAdicional="${producto.adicional}" prodLaboratorio="${producto.laboratorio}" prodTipo="${producto.tipo}"  prodPresentacion="${producto.presentacion}" prodAvatar="${producto.avatar}"   class="col-12 col-sm-6 col-md-4 d-flex align-items-stretch">
              <div class="card bg-light">
                <div class="card-header text-muted border-bottom-0">
                <i class="fas fa-lg fa-cubes mr-1"></i>${producto.stock}
                </div>
                <div class="card-body pt-0">
                  <div class="row">
                    <div class="col-7">
                      <h2 class="lead"><b>${producto.nombre}</b></h2>
                      <h4 class="lead"><b><i class="fas fa-lg fa-dollar-sign mr-1"></i>${producto.precio}</b></h4>

                      <ul class="ml-4 mb-0 fa-ul text-muted">
                        <li class="small"><span class="fa-li"><i class="fas fa-lg fa-mortar-pestle"></i></span> Concentraci??n: ${producto.concentracion}</li>
                        <li class="small"><span class="fa-li"><i class="fas fa-lg fa-prescription-bottle-alt"></i></span> Adicional: ${producto.adicional}</li>
                        <li class="small"><span class="fa-li"><i class="fas fa-lg fa-flask"></i></span> Laboratorio: ${producto.laboratorio}</li>
                        <li class="small"><span class="fa-li"><i class="fas fa-lg fa-copyright"></i></span> Tipo: ${producto.tipo}</li>
                        <li class="small"><span class="fa-li"><i class="fas fa-lg fa-pills"></i></span> Presentaci??n: ${producto.presentacion}</li>
                        </ul>
                    </div>
                    <div class="col-5 text-center">
                      <img src="${producto.avatar}" alt="" class="img-circle img-fluid">
                    </div>
                  </div>
                </div>
                <div class="card-footer">
                  <div class="text-right">
                    <button  class="avatar btn btn-sm bg-teal">
                      <i class="fas fa-image"></i>
                    </button>
                    <button  class=" editar btn btn-sm btn-success">
                      <i class="fas fa-pencil-alt"></i>
                    </button>
                    <button  class="lote btn btn-sm btn-primary">
                      <i class="fas fa-plus-square"></i>
                    </button>
                    <button  class="borrar btn btn-sm btn-danger">
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            `;
          });
          $('#productos').html(template);
        });
    }
    $(document).on('keyup','#buscar-producto',function(){
        let valor = $(this).val();
        if(valor!=""){
            buscar_producto(valor);
        }
        else{
            buscar_producto();
        }

    });
    $(document).on('click','.avatar',(e)=>{
        funcion="cambiar_avatar";
        const elemento= $(this)[0].activeElement.parentElement.parentElement.parentElement.parentElement;
        const id = $(elemento).attr('prodId');
        const avatar =$(elemento).attr('prodAvatar');
        console.log(id+' '+avatar);

    });
})