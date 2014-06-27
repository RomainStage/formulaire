var signin = {};//objet pour afficher les entreprise

var objet = {};//objet envoyé dans le router pour recevoir ensuite l'action

signin.start = function(){
	document.addEventListener("click", signin.on_click);
	document.addEventListener("keydown", signin.on_key);
};

signin.on_click = function(ev){
	
	var src = ev.target;
	if (src.id == "signin-btn")//
		{
			document.getElementById("chargement").innerHTML='<img class="col-md-offset-6" src="../css/ajax-loader.gif" width="30" height="30" />';
			objet.action = "signin";
			objet.login = document.getElementById("log-input").value;
			objet.pwd =  document.getElementById("pwd-input").value;
			objet.rememberme = document.getElementById("remenberme").checked;
			signin.post(objet, signin.log_callback);
		}
};

signin.on_key = function(ev){
	if (ev.keyCode == 13){
			document.getElementById("chargement").innerHTML='<img class="col-md-offset-6" src="../css/ajax-loader.gif" width="30" height="30" />';
			objet.action = "signin";
			objet.login = document.getElementById("log-input").value;
			objet.pwd =  document.getElementById("pwd-input").value;
			objet.rememberme = document.getElementById("remenberme").checked;
			signin.post(objet, signin.log_callback);
	}
};


signin.post = function (data, callback) {
	
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/");
    xhr.onreadystatechange = callback;
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(data));
};

signin.log_callback = function () {

	if (this.readyState == 4 && this.status == 200) {
		var r = JSON.parse(this.responseText);
		console.log(r);
		if (r.message == "ok"){
			window.location="./affichage.html";
		}else{
			document.getElementById("chargement").innerHTML='<div class="btn btn-lg btn-primary btn-block" type="" id="signin-btn" >Sign in</div>  <div id="erreur" class="text-danger"></div>';
			document.getElementById("erreur").innerHTML="Erreur de login ou de mot de passe.";
		}
	}
};

window.onload = function(){
	signin.start();
};