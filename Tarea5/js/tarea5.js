//Declaracion de las variables del documento
var ced_persona = document.getElementById("ced_txt");
var nom_persona = document.getElementById("nom_txt");
var ap_persona = document.getElementById("ap_txt");
var tel_persona = document.getElementById("tel_txt");
var si_rdbtn = document.getElementById("si_rdbtn");
var nv_button = document.getElementById("nv_button");
var sv_button = document.getElementById("sv_button");
var ed_button = document.getElementById("ed_button");
var tb_persona = document.getElementById("tb_persona");
var tb_insert_persona = document.getElementById("tb_insert_persona");
var cam = document.getElementById("camera_take");
var src = null;
var width = 320;
var height = 0;
var streaming = false;
var video = null;
var canvas = null;
var photo = null;
var photo_button = null;
var dataPersona = [];
var index = 0;
//Constructores
function persona(ced,nom,ap,tel,ft){
  this.cedula = ced;
  this.nombre = nom;
  this.apellido = ap;
  this.tel = tel;
  this.ft = ft;
}
//Funciones
function dce(e){
  return document.createElement(e);
}
function addPersona(){
  var ced = ced_persona.value;
  var nom = nom_persona.value;
  var ap = ap_persona.value;
  var tel = tel_persona.value;
  var ph = src;

  if(ced != '' && nom != '' && ap != '' && tel !='' &&ph != null){
    personas = new persona(ced,nom,ap,tel,ph);
    dataPersona.push(personas);

    output();
    limpiarCampos();
    disableFields();
    save();
    location.reload();
  }
  else{
    alert("Hay campos vacios intente denuevo");
  }

}
function deletePersona(btn){
  tr = btn.parentNode.parentNode;
  tr.setAttribute("class","danger");
  if(confirm("Seguro que desea eliminar esta fila")){
    indx = tr.getAttribute("index");
    tarr = [];
    for(i=0; i < dataPersona.length; i++){
      if(i != indx){
        tarr.push(dataPersona[i]);
      }
    }
      dataPersona = tarr;
      tr.parentNode.removeChild(tr);
      save();
      limpiarCampos();
      location.reload();
  }
  tr.setAttribute("class","");
  output();

}
function save(){
var datos = JSON.stringify(dataPersona);
localStorage.setItem("registroPersona",datos);
}
function loadInfo(){
  var datos = localStorage.getItem("registroPersona");
  if(datos != null){
    dataPersona = JSON.parse(datos);
    output();
  }

}
function nuovo(){
  enableFields();
  limpiarCampos();
  ed_button.disabled = true;

}
function limpiarCampos(){
fields = document.getElementsByTagName('input');
for (var i = 0; i < fields.length; i++) {
  fields[i].value = '';
}

}
function enableFields(){
  ced_persona.readOnly = false;
  nom_persona.readOnly = false;
  ap_persona.readOnly = false;
  tel_persona.readOnly = false;
  si_rdbtn.disabled = false;

}
function disableFields(){
  ced_persona.readOnly = true;
  nom_persona.readOnly = true;
  ap_persona.readOnly = true;
  tel_persona.readOnly = true;
  si_rdbtn.disabled = true;

}
function output(){
  destino = tb_insert_persona;
  for (var i = index; i < dataPersona.length; i++) {
    var registro = dataPersona[i];
    row = destino.insertRow();
    row.setAttribute("index",i);
    row.id = "pers_row"+i;
    cell = row.insertCell(-1);
    cell.id = "pers_ced_cell"+i;
    cell.innerHTML = registro.cedula;

    cell = row.insertCell(-1);
    cell.id = "pers_nombre__cell"+i;
    cell.innerHTML = registro.nombre;

    cell = row.insertCell(-1);
    cell.id = "pers_apellido_cell"+i;
    cell.innerHTML = registro.apellido;

    cell = row.insertCell(-1);
    cell.id = "pers_tel_cell"+i;
    cell.innerHTML = registro.tel;

    cell = row.insertCell(-1);
    img = dce("img");
    img.setAttribute("src",registro.ft);
    img.setAttribute("alt","tu foto");
    img.id = "img_persona"+i;
    img.setAttribute("onclick","popupImage(this)");
    img.style.height="25px"
    img.style.width="25px";
    cell.id="img_cell"+i;
    cell.appendChild(img);


    cell = row.insertCell(-1);
    ed_btn = dce("button");
    ed_btn.id="ed_btn_pers"+i;
    ed_btn.setAttribute("class", "btn btn-primary");
    ed_btn.setAttribute("type", "button");
    ed_btn.innerHTML = "editar";
    ed_btn.setAttribute("onclick","actualizarPersona(this)");
    cell.appendChild(ed_btn);

    cell = row.insertCell(-1);
    dlt_btn = dce("button");
    dlt_btn.id = "dlt_btn_pers"+i;
    dlt_btn.innerHTML="X";
    dlt_btn.setAttribute("class","btn btn-danger");
    dlt_btn.setAttribute("type", "button");
    dlt_btn.setAttribute("onclick","deletePersona(this)");
    cell.appendChild(dlt_btn);


  }
  index = i;

}
function actualizarPersona(btn){
  tr = btn.parentNode.parentNode;

  canvas = document.getElementById('canvas');

  if(confirm("Seguro que deseas editar la fila?")){
    tr.setAttribute("class","warning");
    var len = tb_persona.getElementsByTagName("tbody")[0].getElementsByTagName("tr").length;
    for(var i = 0; i < len; i++){
      var ed_btn_pers = document.getElementById("ed_btn_pers"+i);
      var dlt_btn_pers = document.getElementById("dlt_btn_pers"+i);
      ed_btn_pers.disabled = true;
      dlt_btn_pers.disabled = true;
    }
    ed_button.style.display = "inline-block";
    sv_button.disabled = true;
    nv_button.disabled = true;
    indx = tr.getAttribute("index");
    ced_persona.value = dataPersona[indx].cedula;
    nom_persona.value = dataPersona[indx].nombre;
    ap_persona.value = dataPersona[indx].apellido;
    tel_persona.value = dataPersona[indx].tel;
    var img = document.getElementById("img_persona"+indx);
    src = img.src;

    ed_button.setAttribute("onclick","svDataedit(this)");

    enableFields();

  }


}
function svDataedit(btn){
  var ced = ced_persona.value;
  var nom = nom_persona.value;
  var ap = ap_persona.value;
  var tel = tel_persona.value;
  var ph = src;

  var len = tb_persona.getElementsByTagName("tbody")[0].getElementsByTagName("tr").length;
  for(var i = 0; i < len; i++){
    var ed_btn_pers = document.getElementById("ed_btn_pers"+i);
    var dlt_btn_pers = document.getElementById("dlt_btn_pers"+i);
    ed_btn_pers.disabled = false;
    dlt_btn_pers.disabled = false;
  }
  if(ced != '' && nom != '' && ap != '' && tel !='' &&ph != null){
    personas = new persona(ced,nom,ap,tel,ph);
    nv_button.disabled = false;
    sv_button.disabled = false;
    btn.style.display = "none";
    btn.disabled = true;
    for(var i =0; i < dataPersona.length;i++){
      if( i == indx){
        dataPersona[i] = personas;
      }
    }
    save();
    disableFields();
    limpiarCampos();
    location.reload();
  }
  else{
    alert("Hay campos vacios intente denuevo");
  }





}
function popupImage(img){
  tr = img.parentNode.parentNode;
  index = tr.getAttribute('index');
  img.style.borderRadius = "5px";
  img.style.cursor = "pointer";
  img.style.transition = "0.3s";

  var modal = document.getElementById('popup');
  var modalImg = document.getElementById("img01");
  var captionText = document.getElementById("caption");

  modal.style.display = "block";
  modalImg.src = img.src;
  captionText.innerHTML = "<p>"+img.getAttribute("alt")+"</p>";

  var span = document.getElementsByClassName("close")[0];

  span.onclick = function(){
    modal.style.display = "none";
  }


}
function tomarFoto(){
  cam.style.display="inline-block";
  disableFields();
  video = document.getElementById('video');
  canvas = document.getElementById('canvas');
  photo = document.getElementById('photo');
  photo_button = document.getElementById('photo_button');
  return_btn = document.getElementById('return_btn');
  return_btn.disabled = true;
  if(!sv_button.disabled){
    sv_button.disabled = true;
  }

  ed_button.disabled = true;
  navigator.mediaDevices.getUserMedia({video:true, audio:false})
    .then(function(stream){
    video.srcObject = stream;
    video.play();})
    .catch(function(err){
      console.log("An error occured! " + err);
      photo.setAttribute("src","images/pers.png");
      alert("Se le asigno una imagen por defecto");
      src = "images/pers.png";
      $("#camera_take").hide("slow");
      enableFields();
      si_rdbtn.disabled = true;
      sv_button.disabled = false;
      ed_button.disabled = false;
    });


  video.addEventListener('canplay', function(ev){
      if (!streaming) {
        height = video.videoHeight / (video.videoWidth/width);

        video.setAttribute('width', width);
        video.setAttribute('height', height);
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        streaming = true;
      }
    }, false);

    photo_button.addEventListener('click', function(ev){
      takePic();
      return_btn.disabled = false;
      ev.preventDefault();
    }, false);
return_btn.addEventListener('click',function(ev){
  ev.preventDefault();
  $("#camera_take").fadeOut("slow");
  enableFields();

  si_rdbtn.disabled = true;
  if(!ed_button.disabled || ed_button.style.display=="none"){
    sv_button.disabled = false;
  }

  ed_button.disabled = false;

},false);
clearPhoto();
}
 function clearPhoto(){
   var context = canvas.getContext('2d');
   context.fillstyle = "#AAA";
   context.fillRect(0,0,canvas.width, canvas.height);

   var data = canvas.toDataURL('image/png');
   src = data;
   photo.setAttribute('src',data);
 }
 function takePic(){
   var context = canvas.getContext('2d');
   if(width && height){
     canvas.width = width;
     canvas.height = height;
     context.drawImage(video,0,0, width,height);

     var data = canvas.toDataURL('image/png');
     photo.setAttribute('src', data);
     src = data;

   }
   else{
     clearPhoto();
   }
 }
//Eventos
window.addEventListener("load",loadInfo);
nv_button.addEventListener("click",nuovo);
sv_button.addEventListener("click",addPersona);
si_rdbtn.addEventListener("click",tomarFoto);
