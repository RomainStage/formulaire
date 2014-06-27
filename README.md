Formulaire
==========

#1) Fonctions de base d'analyse du formulaire :
Fonctions qui prennent en parametre une valeur, champs du formulaire et retourne un note
##a) Fonctions pour la partie information : 
###- Fonction pour l'annee de creation
Elle prend en parametre un string et retourne :
- 0 si la date entree == 0 ce qui equivaut Ã  ne pas choisir d'annee dans le listing
- 1 si annee de creation < 3
- 2 si annee de creation >= 3

par exemple, pour 2014, 2011 return 3 et 2012 return 2

```JavaScript
//pour obtenir l'annee
	{
	var d = new Date();
	d +="";
	d = d.split(" ");
	d = parseInt(d[3]);
	}
	// si le champ est vide, on indique qu'il est vide
	if (anneeCrea == "0"){
		document.getElementById("annee-creation-control").innerHTML="Selectionner la date SVP";
		self.location.href="#annee-creation-control";
		return 0;						
	}else if (parseInt(anneeCrea)>=(d-2)){
		document.getElementById("annee-creation-control").innerHTML="";
		return 2;
	}else{
		document.getElementById("annee-creation-control").innerHTML="";
		return 3;
	}
};
```

###- Fonction pour la forme juridique
Elle prend en parametre un string et retourne :
- 0 si parametre different de SA ou SAS ou SARL
- 2 si parametre = SAS ou SARL
- 3 si parametre = SA

```JavaScript
index.forme_juridique = function (forme){
	if (forme.toLowerCase() == "sarl" || forme.toLowerCase() == "sas" ){
		document.getElementById("forme-juridique-control").innerHTML="";
		return 2;
	}else if (forme.toLowerCase() != "sa"){
		document.getElementById("forme-juridique-control").innerHTML="Entrer une forme juridique correcte SVP";
		self.location.href="#forme-juridique-control";
		return 0;
	}else if (forme.toLowerCase() == "sa"){
		document.getElementById("forme-juridique-control").innerHTML="";
		return 3;
	}
};
```

##b) Fonctions pour la partie bilan
###- Fonction le nombre d'employe
Elle prend en parametre un string et retourne :
- 0 si le nombre d'employe entre est vide ou non nombre
- 2 si le nombre d'employe est inferieur stricte Ã  5
- 3 si le nombre d'employe superieur ou egale Ã  5
```JavaScript
index.nombre_employe_now = function (nombre){
	var reg = new RegExp('^[0-9]+$');
	
	if (reg.test(nombre)){
		if (parseInt(nombre) < 5){
			document.getElementById("nombre-employe-now-control").innerHTML = "";
			return 2;
		}else{
			document.getElementById("nombre-employe-now-control").innerHTML = "";
			return 3;
		 }
	 }else{
	 	document.getElementById("nombre-employe-now-control").innerHTML = "Saisir le nombre d'employes SVP";
		self.location.href="#nombre-employe-now-control";
		return 0;
	 }
};
```

###- Fonction pour le chiffre d'affaire
Elle prend en parametre DEUX string param(chiffre affaire n-1, chiffre affaire n-2) et retourne :
- 0 -> si non rempli ou faute (lettre par exemple)
- 2 -> rempli mais pas en progression
- 3 -> rempli et en progression

```JavaScript
index.bilan_chiffre_affaire = function (nombre1, nombre2){
var reg = new RegExp('^[0-9]+$');
if (reg.test(nombre1) && reg.test(nombre2)){
	document.getElementById("bilan-ca-control").innerHTML="";
	nombre1 = parseInt(nombre1);
	nombre2 = parseInt(nombre2);
	if (nombre1 > nombre2){
		return 3;
	}else{
		return 2;
	}
}else{
	document.getElementById("bilan-ca-control").innerHTML="Entrer des chiffres valides SVP, mettre 0 si vide";
	self.location.href="#bilan-ca-control";
	return 0;
}
};
```

###- Fonction pour le Resultat net
Elle prend en parametre DEUX string param(resultat net n-1, resultat net n-2) et retourne :
- 0 -> si non rempli
- 2 -> rempli mais pas en progression
- 3 -> rempli et en progression

```JavaScript
index.bilan_resultat_net = function (nombre1, nombre2){
var reg = new RegExp('^[0-9]+$');
if (reg.test(nombre1) && reg.test(nombre2)){
	document.getElementById("bilan-rn-control").innerHTML="";
	nombre1 = parseInt(nombre1);
	nombre2 = parseInt(nombre2);
	if (nombre1 > nombre2){
		return 3;
	}else{
		return 2;
	}
}else{
	document.getElementById("bilan-rn-control").innerHTML="Entrer des chiffres valides SVP, mettre 0 si vide";
	self.location.href="#bilan-rn-control";
	return 0;
}
};
```
###- Fonction pour le capital social
Elle prend en parametre 4 string param(capital social,resultat net n, resultat net n-1, resultat net n-2) et retourne :
- 0 ->pas rempli 
- 2 ->somme < 37k
- 3 ->somme >= 37K

```JavaScript
index.bilan_capital_social = function (cs,rn,rn1,rn2){
	var reg = new RegExp('^[0-9]+$');	
	if (reg.test(cs) && reg.test(rn) && reg.test(rn1) && reg.test(rn2)){
		if (parseInt(cs)+parseInt(rn)+parseInt(rn1)+parseInt(rn2) < 37000){
			document.getElementById("bilan-cs-control").innerHTML = "";
			return 2;
		}else{
			document.getElementById("bilan-cs-control").innerHTML = "";
			return 3;
		}
	}else{
		document.getElementById("bilan-cs-control").innerHTML = "Entrer des chiffres valides ou 0 si vide";
		self.location.href="#bilan-cs-control";
		return 0;
	}	
};
```

##c) Fonction pour la partie objectifs
###- Fonction pour le nombre d'employe
Elle prend en parametre DEUX strings param(employe actuel du bilan, employe dans le futur) et retourne :
- 0 si le nombre d'employe entre est vide ou non nombre
- 2 si le nombre d'employe est inferieur ou egal Ã  l'ancien
- 3 si le nombre d'employe superieur Ã  l'ancien

```JavaScript
index.nombre_employe_obj = function (nombre, nombre1){
	var reg = new RegExp('^[0-9]+$');
	
	if (reg.test(nombre)){
		if (parseInt(nombre) <= parseInt(nombre1)){
			document.getElementById("nombre-employe-obj-control").innerHTML = "";
			return 2;
		}else{
			document.getElementById("nombre-employe-obj-control").innerHTML = "";
			return 3;
		 }
	 }else{
	 	document.getElementById("nombre-employe-obj-control").innerHTML = "Saisir le nombre d'employes SVP";
		self.location.href="#nombre-employe-obj-control";
		return 0;
	 }
};
```

###- Fonction pour le Chiffre d'affaire
Elle prend en parametre TROIS string param(annee n, annee n+1, annee n+2) et retourne :
- 0 -> si non rempli
- 2 -> rempli mais pas en progression
- 3 -> rempli et en progression

```JavaScript
index.obj_chiffre_affaire = function (nombre, nombre1, nombre2){
var reg = new RegExp('^[0-9]+$');
if (reg.test(nombre1) && reg.test(nombre2) && reg.test(nombre)){
	document.getElementById("obj-ca-control").innerHTML="";
	nombre = parseInt(nombre);
	nombre1 = parseInt(nombre1);
	nombre2 = parseInt(nombre2);
	if (nombre < nombre1 && nombre1 < nombre2){//si croissance du ca dans le futur
		return 3;
	}else{//sinon
		return 2;
	}
}else{
	document.getElementById("obj-ca-control").innerHTML="Entrer des chiffres valides SVP, mettre 0 si vide";
	self.location.href="#obj-ca-control";
	return 0;
}
};
```

###- Fonction pour le Resultat net
Elle prend en parametre TROIS string param(annee n, annee n+1, annee n+2) et retourne :
- 0 -> si non rempli
- 2 -> rempli mais pas en progression
- 3 -> rempli et en progression

```JavaScript
index.obj_resultat_net = function (nombre, nombre1, nombre2){
var reg = new RegExp('^[0-9]+$');
if (reg.test(nombre1) && reg.test(nombre2) && reg.test(nombre)){
	document.getElementById("obj-rn-control").innerHTML="";
	nombre = parseInt(nombre);
	nombre1 = parseInt(nombre1);
	nombre2 = parseInt(nombre2);
	if (nombre < nombre1 && nombre1 < nombre2){//si croissance du ca dans le futur
		return 3;
	}else{//sinon
		return 2;
	}
}else{
	document.getElementById("obj-rn-control").innerHTML="Entrer des chiffres valides SVP, mettre 0 si vide";
	self.location.href="#obj-rn-control";
	return 0;
}
};
```

###- Fonction pour les fonds propres
Elle prend en parametre TROIS string param(annee n, annee n+1, annee n+2) et retourne :
- 0 -> erreur
- 1 -> aucun marche
- 2 -> carnet annonce
- 3 -> Marche libre
- 4 -> Alternext

```JavaScript
index.obj_fond_propre = function (n,n1,n2){
var reg = new RegExp('^[0-9]+$');
if (reg.test(n) && reg.test(n1) && reg.test(n2)){
		document.getElementById("obj-fp-control").innerHTML="";
	n = parseInt(n);
	n1 = parseInt(n1);
	n2 = parseInt(n2);
	
	if (n+n1+n2 < 500000){
		return 1;
	}
	if (n <= 500000){
		return 2;
	}else if (500000 < n){
		if (n<=1500000){
		return 3;
		}else{
		return 4;
		}
	}
}else{
	document.getElementById("obj-fp-control").innerHTML="Entrer des chiffres corrects SVP, mettre 0 si vide";
	self.location.href="#obj-fp-control";
	return 0;
}
};
```
#2) Fonctions qui traitent les resultats des fonctions ci-dessus, et affichent le resultat
##a) Fonction pour les fonds propres
Prend en parametres un nombre. Ce nombre DOIT etre celui retourne pas la fonction qui s'occupe des fonds propres (logique)

```JavaScript
var ofp_display = function (ofp){
	if (ofp == 1){
		document.getElementById("resultat-formulaire-fond-propre").innerHTML="Aucun marche";
		document.getElementById("resultat-formulaire-fond-propre").className="text-danger";
		return false;
	}else if (ofp == 2){
		document.getElementById("resultat-formulaire-fond-propre").innerHTML="Carnet d'annonces";
		document.getElementById("resultat-formulaire-fond-propre").className="text-success";
		return true;
	}else if (ofp == 3){
		document.getElementById("resultat-formulaire-fond-propre").innerHTML="Marche libre";
		document.getElementById("resultat-formulaire-fond-propre").className="text-success";
		return true;
	}else if (ofp == 4){
		document.getElementById("resultat-formulaire-fond-propre").innerHTML="Alternext";
		document.getElementById("resultat-formulaire-fond-propre").className="text-success";
		return true;
	}
};
```

##b) Fonction pour le reste
Grosse fonction qui prend 9 parametres qui sont dans l'ordre :
- annee
- forme juridique
- employe actuel
- bilan CA
- bilan Resultat 
- bilan Capital
- Obj fond propre
- obj resultat
- obj CA
- obj employe

```JavaScript
index.last_=function(year, forme, employ, bca, brn, bcs, ofp, orn, oca, employObj){
		if (year*forme*employ*bca*brn*bcs*ofp*orn*oca*employObj == 0 ){//si erreur dans le formulaire on affiche rien
			document.getElementById("resultat-visibilite").style.display="none";
			console.log("erreur formulaire");
			return 0;
		}else if (ofp_display(ofp) == false){//Probleme de objectif de fonds propres, si pas eligible à cause de fond propre
			document.getElementById("resultat-visibilite").style.display="";
			document.getElementById("resultat-formulaire").innerHTML="Vos objectifs de fonds propres ne semblent pas nécessiter l'utilisation d'un marché d'actions.</br></br>Si vous le souhaitez, nous pouvons néanmoins réaliser une étude de faisabilité approfondie sur la capacité de votre entreprise à accroître ses fonds propres avec l'épargne individuelle. Contactez CIIB en cliquant <a href = http://www.ciib.fr/contact-us-email>ici</a> !";		
			document.getElementById("resultat-formulaire").className="text-danger";
			self.location.href="#resultat-visibilite";
			return 1;
		}else if (forme == 2){// si c'est une SARL ou SAS
			if(bcs==2){
				document.getElementById("resultat-visibilite").style.display="";
				document.getElementById("resultat-formulaire").innerHTML="Votre forme juridique ne vous permet pas d'utiliser immédiatement un marché d'actions. Seules les SA peuvent utiliser un marché d'actions.</br></br>Le niveau de vos fonds propres ne semblent pas suffisant pour procéder dès maintenant à une opération de transformation en SA.</br></br>Si vous le souhaitez, nous pouvons réaliser une étude de faisabilité plus approfondie. Contactez CIIB en cliquant <a href = http://www.ciib.fr/contact-us-email>ici</a>.";		
				document.getElementById("resultat-formulaire").className="text-danger";
				self.location.href="#resultat-visibilite";
				return 1;
			}else if (bcs == 3){
				document.getElementById("resultat-visibilite").style.display="";
				document.getElementById("resultat-formulaire").innerHTML="Votre forme juridique ne vous permet pas d'utiliser immédiatement un marché d'actions. Seules les SA peuvent utiliser un marché d'actions.</br></br>Cependant, le niveau de vos fonds propres semblent suffisant pour procéder dès maintenant à une opération de transformation en SA.</br></br>Si vous le souhaitez, nous pouvons réaliser une étude de faisabilité plus approfondie. Contactez CIIB en cliquant <a href = http://www.ciib.fr/contact-us-email>ici</a>.";		
				document.getElementById("resultat-formulaire").className="text-danger";
				self.location.href="#resultat-visibilite";
				return 1;
			}else{
				console.log("erreur");
				return 0;
			}
		}else if (year == 2 && employ == 2 && document.getElementById("bilan-ca-1").value <500000){//si inférieur à 3 ans, ca inferieur a 500K, employé inférieur à 5
			document.getElementById("resultat-visibilite").style.display="";
			self.location.href="#resultat-visibilite";
			document.getElementById("resultat-formulaire").innerHTML="Il est à priori prématuré pour votre entreprise de mettre en place un marché d'actions.</br></br>Pour une étude de faisabilité plus approfondie, contactez CIIB <a href = http://www.ciib.fr/contact-us-email>ici</a>.";
			document.getElementById("resultat-formulaire").className="text-danger";
			return 1;
			
		}else if (year*forme*employ*bca*brn*oca*orn*employObj == Math.pow(3, 8)){//si tout est à 3, au max
			document.getElementById("resultat-visibilite").style.display="";
			self.location.href="#resultat-visibilite";
			document.getElementById("resultat-formulaire").innerHTML="Bravo, les informations que vous avez entrées montrent que VOUS avez le profil idéal pour prétendre à un marché d'action.</br></br>Pour une étude de faisabilité plus approfondie, contactez CIIB au plus vite en cliquant <a href = http://www.ciib.fr/contact-us-email>ici</a>.";
			document.getElementById("resultat-formulaire").className="text-success";
			return 1;
		}else if (bca == 2 || brn == 2 || orn ==2 || oca == 2){// si pas de preogression dans les chiffres
			
			if ( document.getElementById("check-box-value").checked == false ){//si pas R&D
				document.getElementById("resultat-visibilite").style.display="";
				self.location.href="#resultat-visibilite";
				document.getElementById("resultat-formulaire").innerHTML="Votre profil ne semble pas compatible avec un marché d'action (progression du CA ou Résultat Net doivent être en progression).</br></br>Pour une étude de faisabilité plus approfondie, contactez CIIB au plus vite en cliquant <a href = http://www.ciib.fr/contact-us-email>ici</a>.";
				document.getElementById("resultat-formulaire").className="text-info";
				return 1;
			}else if( document.getElementById("check-box-value").checked == true ){//si R&D
				document.getElementById("resultat-visibilite").style.display="";
				self.location.href="#resultat-visibilite";
				document.getElementById("resultat-formulaire").innerHTML="Votre profil est particulier.</br></br>Pour une étude de faisabilité plus approfondie, contactez CIIB au plus vite en cliquant <a href = http://www.ciib.fr/contact-us-email>ici</a>.";
				document.getElementById("resultat-formulaire").className="text-info";
				return 1;
			}
			
		}else{
			document.getElementById("resultat-visibilite").style.display="";
			self.location.href="#resultat-visibilite";
			document.getElementById("resultat-formulaire").innerHTML="Votre profil est intéressant.</br></br>Pour une étude de faisabilité plus approfondie, contactez CIIB au plus vite en cliquant <a href = http://www.ciib.fr/contact-us-email>ici</a>.";
			document.getElementById("resultat-formulaire").className="text-info";
			return 1;
		}
};
```
