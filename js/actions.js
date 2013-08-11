$(function() {
    document.addEventListener("deviceready", function(){
		$('#cBtn').tap(function(){
		var nom = $('#cName').val();
		var ema = $('#cMail').val();
		var tel = $('#cTel').val();
			
			if(nom!='' && ema!='' && tel!='')
				crearContacto(nom,ema,tel);
		});
	$('#btnListar').tap(function(){
		listarContacto();
	});
    },false);    
});

function listarContactos(){
	function onSuccess(contacts) {
		$('#lista').html('');
    for(i=0;i<contacts.length;i++){
	 	$('<li class="forward"><a href="tel:'+contacts[i].phoneNumbers[0].value+'">'+contacts[i].name.formatted+'</a></li>').appendTo('#lista');
	}
};

function onError(contactError) {
    alert('onError!');
};

var options      = new ContactFindOptions();
	options.filter ="";
	options.multiple = true;
	var fields       = ["*"];
	navigator.contacts.find(fields, onSuccess, onError, options);
}
function crearContacto(nom,ema,tel){
	//Crear contacto
var myContact = navigator.contacts.create();
	//Asignarle un nombre
	myContact.displayname =nom;
	myContact.nickname =nom;
	//Asignar nombre de contacto
	var nombre = new ContactName();
	nombre.givenName = nom;
	myContact.name = nombre;
	//Asignar Email
	var email =[];
	email[0] = new ContactField("home",ema, true);
	email[1] = new ContactField("Work",joshua@algo.com, false);
	myContact.emails = email;
	//Asignar Telefono
	var telefono = [];
	telefono[0] = new ContactField("Home",tel,false);
	telefono[1] = new ContactField("Work",224-4444,true);
	myContact.phoneNumbers = telefono;
	//Guardar Contacto
	myContact.save(function(){
		$('#cName').val('');
		$('#cMail').val('');
		$('#cTel').val('');
navigator.notification.alert("Contacto Guardadoooo",null,function(){window.location.href="#home";},"Felicidades","Aceptar");
	},	function(err){
        alert(err.code);
		});

} 
