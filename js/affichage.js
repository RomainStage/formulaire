var affichage = {};//objet pour afficher les entreprise
var archive = {};//objet qui affiche les entreprises archivées
var action = {}; //objet qui contient les fonctions pour archiver, désarchiver
var objet = {};//objet envoyé dans le router pour recevoir ensuite l'action




/********************************affichage seulement******************************************************************/

//affichage pour envoyer l'action recevoir et qui recupere TOUTE la db Dans un Tableau
affichage.start = function(){
	document.addEventListener("click", affichage.on_click);
	$("#recevoir-info").trigger("click");
};

affichage.on_click = function(ev){
	var src = ev.target;
	if (src.id == "recevoir-info")//pour le bouton voir les formulaire
		{
			objet.action = "recevoir";
			affichage.post(objet, affichage.log_callback);
		}
	else if(src.id == "recevoir-info-archive")//pour le bouton voir les archives
		{
			objet.action = "recevoir-archive";
			archive.post(objet, archive.log_callback);
		}
	else if(src.has_class("delete-class"))//pour le bouton croix
		{
			$('.info-class').popover('hide');
			$(ev.target).popover('show');
		}
	else if (src.has_class("confirmation-btn"))//pour la validation
		{
			$('.info-class').popover('hide');
			var id = (src.id).split("-");
			objet.action="archiver";
			objet.id=id[1];
			action.post(objet, action.log_callback);
		}
	else if (src.has_class("info-class"))//pour le bouton info
		{
			$('.delete-class').popover('hide');
			$(ev.target).popover('show');	
		}

	else//permet de fermer les popover si on clique ailleur
		{
			$('.delete-class').popover('hide');
			$('.info-class').popover('hide');
		}
};


affichage.post = function (data, callback) {
	document.getElementById("display-results").innerHTML='<img class="col-md-offset-6" src="../css/ajax-loader.gif" width="30" height="30" />';
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/");
    xhr.onreadystatechange = callback;
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(data));
};

affichage.log_callback = function () {

	if (this.readyState == 4 && this.status == 200) {
	
		var r = JSON.parse(this.responseText);
		tabRecu = new Array();
		for (i in r){
			tabRecu.push(r[i]);
		}
		affichage.affichage_resultat_HTML(tabRecu);
	}
};

affichage.affichage_resultat_HTML = function(tab){
tab=tab.reverse();//pour mettre du plus récent au plus vieux
document.getElementById("display-results").innerHTML="";
{
var newLine = document.createElement('tr');//on crée une nouvelle ligne
newLine.style.height = "30px";	
newLine.style.border = "solid grey 1px";
var titleName = document.createElement('th');//on crée 1 cellules avec NOM
titleName.style.border = "solid grey 1px";
var titleMail = document.createElement('th');//on crée 1 cellules avec MAIL FAX NUM
titleMail.style.border = "solid grey 1px";
var titleNote = document.createElement('th');//on crée 1 cellules avec NOTE
titleNote.style.border = "solid grey 1px";
var titleAction = document.createElement('th');//on crée 1 cellules avec Action
titleAction.style.border = "solid grey 1px";
var titleDate = document.createElement('th');//on crée 1 cellules avec DATE
titleDate.style.border = "solid grey 1px";



titleName.appendChild(document.createTextNode("Nom"));
titleMail.appendChild(document.createTextNode("Mail / Fax / Numero"));
titleNote.appendChild(document.createTextNode("note générée par le simulateur :"));
titleAction.appendChild(document.createTextNode("Cliquer pour avoir plus d'infos ou archiver"));
titleDate.appendChild(document.createTextNode("Date de soumission"));


newLine.appendChild(titleName);
newLine.appendChild(titleMail);
newLine.appendChild(titleNote);
newLine.appendChild(titleAction);
newLine.appendChild(titleDate);
document.getElementById("display-results").appendChild(newLine);
}//juste pour afficher le titre du tableau
for(i in tab){//pour afficher les donées
if (tab[i]){
		var newLine = document.createElement('tr');//on crée une nouvelle ligne
		//traitement de la date
		var date = tab[i].date;
		date += '';
		date = date.split("-");
		date1 = date[2].split("T");
		//resoor la date dans 2 variable differente
		newLine.style.height = "30px";	
	
		var newDataName = document.createElement('td');//on crée 1 cellules
		var newDataMail = document.createElement('td');//on crée 1 cellules
			
		var newDataNote = document.createElement('td');//on crée 1 cellules
		var newDataDate = document.createElement('td');//on crée 1 cellules		
		var newDataArchiver = document.createElement('td');//on crée 1 cellules
		
		//pour affichage de la croix
		var remove = document.createElement('span');//pour ajouter la croix 
		remove.className="glyphicon glyphicon-remove-sign col-md-offset-1 text-danger delete-class btn";
		remove.style.fontSize="25px";
		
		//pour affichage de l'autre popover
		var showInfo = document.createElement('span');
		showInfo.className="glyphicon glyphicon-info-sign col-md-offset-1 text-success info-class btn";
		showInfo.style.fontSize="25px";
		
		
		
		newDataArchiver.appendChild(showInfo);
		newDataArchiver.appendChild(remove);
		//fin
	
		newDataName.style.border = "solid grey 1px";
		newDataMail.style.border = "solid grey 1px";
		newDataArchiver.style.border = "solid grey 1px";
		newDataNote.style.border = "solid grey 1px";
		newDataDate.style.border = "solid grey 1px";
	
		newDataName.appendChild(document.createTextNode(tab[i].nomEntreprise));//on écrit les donnée
		newDataMail.appendChild(document.createTextNode(tab[i].howToJoin+" : "+tab[i].email));
		newDataNote.appendChild(document.createTextNode(tab[i].note));
		newDataDate.appendChild(document.createTextNode(date1[0]+"/"+date[1]+"/"+date[0]));
			
		newLine.appendChild(newDataName);
		newLine.appendChild(newDataMail);
		newLine.appendChild(newDataNote);
		newLine.appendChild(newDataArchiver);
		newLine.appendChild(newDataDate);	
		document.getElementById("display-results").appendChild(newLine);
		
		//pour le popover -- afficher oui ou non
		$(remove).popover({
			placement: 'right',
			toggle: 'popover',
			trigger: 'manual',
			content: 'Etes vous sur?</br><btn class="btn btn-primary confirmation-btn" id="delete-'+tab[i].email+'">oui</btn>  <btn class="btn btn-danger">non</btn>',
			html: true
		});
		
		$(showInfo).popover({
			placement: 'bottom',
			toggle: 'popover',
			trigger: 'manual',
			content: 'Année de création : '+tab[i].anneeDeCreation+'</br>Forme Juridique : '+tab[i].formeJuri+'</br>Nombre d\'employés actuellemnt : '+tab[i].employeNow+'</br>Fort potentiel r&d : '+tab[i].rechercheDevel+'</br></br><strong>Bilan (en k€)</strong></br>CA n-1 : '+tab[i].bilanChiffreAffaireNmoins1+'</br>CA n-2 : '+tab[i].bilanChiffreAffaireNmoins2+'</br>Résultat Net n-1 : '+tab[i].bilanResultatNetNmoins1+'</br>Résultat Net n-2 : '+tab[i].bilanResultatNetNmoins2+'</br></br><strong>Objectifs (en k€)</strong></br>CA n : '+tab[i].chiffreAffaireObj0+'</br>CA n+1 : '+tab[i].chiffreAffaireObj1+'</br>CA n+2 : '+tab[i].chiffreAffaireObj2+'</br>Resultat Net n : '+tab[i].resultatNetObj0+'</br>Résultat Net n+1 : '+tab[i].resultatNetObj1+'</br>Résultat Net n+2 : '+tab[i].resultatNetObj2+'</br></br><strong>Besoins de Fonds Propres pour (en k€)</strong></br>n : '+tab[i].fondPropreN0+'</br>n+1 : '+tab[i].fondPropreN1+'</br>n+2 : '+tab[i].fondPropreN2+'</br></br><strong>Besoins d"emprunts bancaires pour (en k€)</strong></br>n : '+tab[i].financementInvestissement0+'</br>n+1 : '+tab[i].financementInvestissement1+'</br>n+2 : '+tab[i].financementInvestissement2+'',
			title:'<strong>Informations Supplémentaires</strong><span class="btn glyphicon glyphicon-remove text-primary"> </span>',
			html: true
		});
	}
}

};
/**************************************pour le bouton receoivr archiver**********************************************/
archive.post = function (data, callback) {
	document.getElementById("display-results").innerHTML='<img class="col-md-offset-6" src="../css/ajax-loader.gif" width="30" height="30" />';
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/");
    xhr.onreadystatechange = callback;
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(data));
};

archive.log_callback = function () {

	if (this.readyState == 4 && this.status == 200) {
	
		var r = JSON.parse(this.responseText);
		tabRecu = new Array();
		for (i in r){
			tabRecu.push(r[i]);
		}
		archive.affichage_resultat_HTML(tabRecu);
	}
};
archive.affichage_resultat_HTML = function(tab){
tab=tab.reverse();//pour mettre du plus récent au plus vieux
document.getElementById("display-results").innerHTML="";
{
var newLine = document.createElement('tr');//on crée une nouvelle ligne
newLine.style.height = "30px";	
newLine.style.border = "solid grey 1px";
var titleName = document.createElement('th');//on crée 1 cellules avec NOM
titleName.style.border = "solid grey 1px";
var titleMail = document.createElement('th');//on crée 1 cellules avec MAIL FAX NUM
titleMail.style.border = "solid grey 1px";
var titleNote = document.createElement('th');//on crée 1 cellules avec NOTE
titleNote.style.border = "solid grey 1px";
//var titleAction = document.createElement('th');//on crée 1 cellules avec Action
//titleAction.style.border = "solid grey 1px";
var titleDate = document.createElement('th');//on crée 1 cellules avec DATE
titleDate.style.border = "solid grey 1px";



titleName.appendChild(document.createTextNode("Nom"));
titleMail.appendChild(document.createTextNode("Mail / Fax / Numero"));
titleNote.appendChild(document.createTextNode("note générée par le simulateur :"));
//titleAction.appendChild(document.createTextNode("Cliquer pour archiver"));
titleDate.appendChild(document.createTextNode("Date de soumission"));


newLine.appendChild(titleName);
newLine.appendChild(titleMail);
newLine.appendChild(titleNote);
//newLine.appendChild(titleAction);
newLine.appendChild(titleDate);
document.getElementById("display-results").appendChild(newLine);
}//juste pour afficher le titre du tableau
for(i in tab){//pour afficher les donées
if (tab[i]){
		var newLine = document.createElement('tr');//on crée une nouvelle ligne
		//traitement de la date
		var date = tab[i].date;
		date += '';
		date = date.split("-");
		date1 = date[2].split("T");
		//resoor la date dans 2 variable differente
		newLine.style.height = "30px";	
	
		var newDataName = document.createElement('td');//on crée 1 cellules
		var newDataMail = document.createElement('td');//on crée 1 cellules
			
		var newDataNote = document.createElement('td');//on crée 1 cellules
		var newDataDate = document.createElement('td');//on crée 1 cellules		
		//var newDataArchiver = document.createElement('td');//on crée 1 cellules
		
		/*
		//pour affichage de la croix
		var remove = document.createElement('span');//pour ajouter la croix 
		remove.className="glyphicon glyphicon-remove-sign col-md-offset-5 text-danger delete-class btn azeaze";
		remove.style.fontSize="50px";
		//reglage popover
		*/
		
		
		
		//newDataArchiver.appendChild(remove);
		//fin
	
		newDataName.style.border = "solid grey 1px";
		newDataMail.style.border = "solid grey 1px";
		//newDataArchiver.style.border = "solid grey 1px";
		newDataNote.style.border = "solid grey 1px";
		newDataDate.style.border = "solid grey 1px";
	
		newDataName.appendChild(document.createTextNode(tab[i].nomEntreprise));//on écrit les donnée
		newDataMail.appendChild(document.createTextNode(tab[i].email));
		newDataNote.appendChild(document.createTextNode(tab[i].note));
		newDataDate.appendChild(document.createTextNode(date1[0]+"/"+date[1]+"/"+date[0]));
			
		newLine.appendChild(newDataName);
		newLine.appendChild(newDataMail);
		newLine.appendChild(newDataNote);
		//newLine.appendChild(newDataArchiver);
		newLine.appendChild(newDataDate);	
		document.getElementById("display-results").appendChild(newLine);
		
		//pour le popover -- afficher oui ou non
		/*$(remove).popover({
			placement: 'left',
			toggle: 'popover',
			content: 'Etes vous sur?</br><btn class="btn btn-primary confirmation-btn" id="delete-'+tab[i].email+'">oui</btn>  <btn class="btn btn-danger">non</btn>',
			html: true
		});*/
	}
}

};
/************************************************************************************************************/

/***************************************FONCTION POUR ARCHIVER ou DESARCHIVER******************************************************/
action.post = function (data, callback) {
	document.getElementById("display-results").innerHTML='<img class="col-md-offset-6" src="../css/ajax-loader.gif" width="30" height="30" />';
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/");
    xhr.onreadystatechange = callback;
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(data));
};
action.log_callback = function () {

	if (this.readyState == 4 && this.status == 200) {
		
		var r = JSON.parse(this.responseText);
		tabRecu = new Array();
		for (i in r){
			tabRecu.push(r[i]);
		}
		affichage.affichage_resultat_HTML(tabRecu);
	}
};
/************************************************************************************************************/

HTMLElement.prototype.has_class = function (c) {
	return (this.className.indexOf(c) >= 0);
};

window.onload = function(){
	affichage.start();
};