//JS pour la page index


var index ={};
var objet = {};//objet envoyé au router et DB

index.start = function () {
	//document.addEventListener("click", index.on_click); // pour êvenement quand on clique sur la souris
	document.addEventListener("keydown", index.on_keydown);
	index.on_date();
	index.padding_less();
	
};
index.on_click = function (ev) {

	var src = ev.target;
	if (src.id == "btn-tester")
		{
			ev.preventDefault();
			index.verif_formulaire();
			index.verif_formulaire();
		}
};
index.on_keydown = function (ev){	
	if (ev.which == 13 ){
		
		ev.preventDefault();
		index.verif_formulaire();
		index.verif_formulaire();
		
	}
};
index.on_date = function (){

	var d = new Date();
	d +="";
	d = d.split(" ");
	d = parseInt(d[3]);
	
	var anneeMoinsUn = document.getElementsByClassName("annee-1");

	for (var i = 0; i < anneeMoinsUn.length; i++) {
    anneeMoinsUn[i].placeholder = "n-1";
    anneeMoinsUn[i].title = "n-1";
	}
	
	var anneeMoinsDeux = document.getElementsByClassName("annee-2");

	for (var i = 0; i < anneeMoinsDeux.length; i++) {
    anneeMoinsDeux[i].placeholder = "n-2";
    anneeMoinsDeux[i].title = "n-2";
	}
	
	var anneeActuelle = document.getElementsByClassName("annee-0");

	for (var i = 0; i < anneeActuelle.length; i++) {
    anneeActuelle[i].placeholder = "n";
    anneeActuelle[i].title = "n";
	}
	
	var anneePlusUn = document.getElementsByClassName("annee+1");

	for (var i = 0; i < anneePlusUn.length; i++) {
    anneePlusUn[i].placeholder = "n+1";
    anneePlusUn[i].title = "n+1";
	}
	
	var anneePlusDeux = document.getElementsByClassName("annee+2");

	for (var i = 0; i < anneePlusDeux.length; i++) {
    anneePlusDeux[i].placeholder = "n+2";
    anneePlusDeux[i].title = "n+2";
	}
	
};//fonciton pour affichage n-1, n-2, n , n+1

index.padding_less = function (){
var paddingless = document.getElementsByClassName("enlever-padding");

	for (var i = 0; i < paddingless.length; i++) {
    paddingless[i].style.padding = "5px";
	}
};//fonction qui modifie le padding des cases

var lisibilite_number = function(obj){
		
		obj.value=obj.value.replace(/[[\]{}()*+?.,\\^$|#\sa-zA-Z]/g,'');
		nbr=obj.value;
		nbr.replace(".","");
		var nombre = ''+nbr;
		var retour = '';
		var count=0;
		for(var i=nombre.length-1 ; i>=0 ; i--)
		{
			if(count!=0 && count % 3 == 0)
				retour = nombre[i]+' '+retour ;
			else
				retour = nombre[i]+retour ;
			count++;
		}
		obj.value = retour;
		return retour;
};
/************************************************************************************************************************/
/*
	fonction qui récupére les données du formulaire. puis on envoie ces données dans d'autre fonctions de vérif
*/

index.verif_formulaire2 =function (){
index.verif_formulaire();
index.verif_formulaire();
};
index.verif_formulaire = function (){
	/* partie informations */
	var anneCrea = document.getElementById("annee-creation").value;//année creation
	var formeJuridique = document.getElementById("forme-juridique").value;//forme juridique
	var rEtD = document.getElementById("check-box-value").checked;//si fort R&D, retourne true si coché, false sinon
	var nombreEmployeNow = document.getElementById("nombre_employe_now").value;//nombre employé actuel
	
	/*patie bilan */
	
	var bilanCA1 = document.getElementById("bilan-ca-1").value;//chiffre affaire n-1
	var bilanCA2 = document.getElementById("bilan-ca-2").value;//chiffre affaire n-2
	var bilanRN1 = document.getElementById("bilan-rn-1").value;//résulat net n-1
	var bilanRN2 = document.getElementById("bilan-rn-2").value;//resultat net n-2
	var bilanCSN1 = document.getElementById("bilan-cs-1").value;//Capital social n-1
		
	/* partie objectif */
	
	
	var objCA0 = document.getElementById("obj-ca-0").value;//chiffre affaire n
	var objCA1 = document.getElementById("obj-ca-1").value;//chiffre affaire n+1
	var objCA2 = document.getElementById("obj-ca-2").value;//chiffre affaire n+2
	
	var objRN0 = document.getElementById("obj-rn-0").value;//résulat net n
	var objRN1 = document.getElementById("obj-rn-1").value;//résulat net n+1
	var objRN2 = document.getElementById("obj-rn-2").value;//resultat net n+2
	
	var objFP0 = document.getElementById("obj-fp-0").value;//fond propre n
	var objFP1 = document.getElementById("obj-fp-1").value;//fond propre n+1
	var objFP2 = document.getElementById("obj-fp-2").value;//fond propre n+2
	
	//remplissage de l'objet à transmettre dans la DB
	
	objet.action = "transmettre";//action	
	objet.date = new Date();//date
	objet.archive = false; //champ pour verifier si l'entreprise a été archivée ou non
	
	//partie info
	objet.nomEntreprise = document.getElementById("nom-entreprise").value;
	objet.email = document.getElementById("join-info").value;//stock la valeur entrée dans la case input du mail ou tel ou fax
	objet.howToJoin = document.getElementById("how-join").value;//stock le moyen selectionné (fax ou tel ou mail)
	objet.anneeDeCreation = anneCrea;
	objet.formeJuri = formeJuridique;
	objet.rechercheDevel = rEtD;
	objet.employeNow=nombreEmployeNow;
	
	//partie bilan

	objet.bilanChiffreAffaireNmoins1 = bilanCA1;
	objet.bilanChiffreAffaireNmoins2 = bilanCA2;
	objet.bilanResultatNetNmoins1 = bilanRN1;
	objet.bilanResultatNetNmoins2 = bilanRN2;
	objet.bilanCapitalSocialNmoins1 = bilanCSN1;
	
	//partie obj
	
	
	objet.chiffreAffaireObj0 = objCA0;
	objet.chiffreAffaireObj1 = objCA2;
	objet.chiffreAffaireObj2 = objCA2;
	
	objet.resultatNetObj0 = objRN0;
	objet.resultatNetObj1 = objRN1;
	objet.resultatNetObj2 = objRN2;
	
	objet.fondPropreN0 = objFP0;
	objet.fondPropreN1 = objFP1;
	objet.fondPropreN2 = objFP2;

	//investissement bancaire
	objet.financementInvestissement0 =document.getElementById("obj-fp-endettement-0").value;
	objet.financementInvestissement1 =document.getElementById("obj-fp-endettement-1").value;
	objet.financementInvestissement2 =document.getElementById("obj-fp-endettement-2").value;	
	
	
	//mes fonction pour sarl ou SAS
	
	//(index.nombre_employe_now(nombreEmployeNow));	
	//(index.annee_creation(anneCrea));
	//(index.chiffreAffaireNmoinsUn(bilanCA1));
	//(index.sarl_capital_social(bilanCSN1, objRN0, bilanRN1, bilanRN2));
	//console.log(index.sarl_evo_ca(bilanCA2, bilanCA1, objCA0, objCA1, objCA2));
	//console.log(index.sarl_evo_rn(bilanRN2, bilanRN1, objRN0, objRN1, objRN2));
	//console.log(index.sarl_fp(objFP0, objFP1, objFP2));
	
	//pour les SA
	
	//(index.sa_chiffreAffaireNmoinsUn(bilanCA1));
	//console.log(index.sa_fp(objFP0, objFP1, objFP2));
	//console.log(index.sa_evo_ca(bilanCA2, bilanCA1, objCA0, objCA1, objCA2));
	//console.log(index.sa_evo_rn(bilanRN2, bilanRN1, objRN0, objRN1, objRN2));
	var debut = (index.forme_juridique(formeJuridique));
	
	if (debut == 1){//si c'est une SARL ou SAS
		var note = index.sarl_last(index.nombre_employe_now(nombreEmployeNow), index.annee_creation(anneCrea), index.sarl_chiffreAffaireNmoinsUn(bilanCA1), index.sarl_capital_social(bilanCSN1, objRN0, bilanRN1, bilanRN2), index.sarl_evo_ca(bilanCA2, bilanCA1, objCA0, objCA1, objCA2), index.sarl_evo_rn(bilanRN2, bilanRN1, objRN0, objRN1, objRN2), index.sarl_fp(objFP0, objFP1, objFP2));
		if(note != 0 && objet.email != "") index.post(objet, index.log_callback);
	}else if (debut == 2){//si c'est une SA
		var note = index.sa_last(index.sa_evo_ca(bilanCA2, bilanCA1, objCA0, objCA1, objCA2), index.sa_evo_rn(bilanRN2, bilanRN1, objRN0, objRN1, objRN2), index.sa_chiffreAffaireN(objCA0), index.sa_fp(objFP0, objFP1, objFP2));
		if(note != 0 && objet.email != "") index.post(objet, index.log_callback);
	}else return;
	
};




/************************************************************************************************************************/
/*
	les fonctions de vérifification de formulaire retourne :
	0 : une erreur dans le formulaire : vide, faute d'orthographe ou autre ----> la notation ne se fera pas
	1 : critère destructif ou non : par exemple - de 3 ans ou - de 5 salariés
	2 : tout est OK
*/

//fonctions pour les SARL et SAS et SA
index.forme_juridique = function (forme){
/*
retourne 0 = pas remplie
1 = sarl ou sas
2 = sa
*/		
	if (forme.toLowerCase() == "sarl" || forme.toLowerCase() == "sas" ){		
		document.getElementById("forme-juridique-control").innerHTML="";
		return 1;				
	}else if (forme.toLowerCase() == "sa"){
		document.getElementById("forme-juridique-control").innerHTML="";
		return 2;
	}else{
		document.getElementById("forme-juridique-control").innerHTML="Sélectionner une forme juridique SVP";
		self.location.href="#forme-juridique-control";
		return 0;		
	}
};//fonction vérifier la forme juridique
index.annee_creation = function (anneeCrea){
/*
0 = non remplie
1 = inférieur ou égal à 3 ans
2 = autre
*/
	//pour obtenir l'année actuelle
	{
	var d = new Date();
	d +="";
	d = d.split(" ");
	d = parseInt(d[3]);
	}
	// si le champ est vide, on indique qu'il est vide
	if (anneeCrea == "0"){
		document.getElementById("annee-creation-control").innerHTML="Sélectionner la date SVP";
		self.location.href="#annee-creation-control";
		return 0;						
	}else if (parseInt(anneeCrea)>=(d-3)){// si entreprise comprise entre n et et n-3 compris
		document.getElementById("annee-creation-control").innerHTML="";
		return 1;
	}else{//si entreprise > n-3
		document.getElementById("annee-creation-control").innerHTML="";
		return 2;
	}
};//fonction annee de creation
index.nombre_employe_now = function (nombre){
/*
return 0 si le nombre d'employé entré est vide ou non nombre
return 1 si le nombre d'employé est inférieur ou égale à 4
return 2 si le nombre d'employé supérieur  stricte à 4

fonction avec regexp pour voir si on a bien une chaine numérique
*/
	var reg = new RegExp('^[0-9]+$');
	
	if (reg.test(nombre)){
		if (parseInt(nombre) < 5){
			document.getElementById("nombre-employe-now-control").innerHTML = "";
			return 1;
		}else{
			document.getElementById("nombre-employe-now-control").innerHTML = "";
			return 2;
		 }
	 }else{
	 	document.getElementById("nombre-employe-now-control").innerHTML = "Saisir le nombre d'employés SVP";
		self.location.href="#nombre-employe-now-control";
		return 0;
	 }
};//fonction pour le nombre d'employé actuel

//fonctions pour les SARL et SAS

index.sarl_chiffreAffaireNmoinsUn = function (nombre){
/*
retourne
0 = pas remplie
1 = <= 500k
2 = > 500k
*/
nombre = nombre.replace(/[[\]{}()*+?.,\\^$|#\sa-zA-Z]/g,'');
var reg = new RegExp('^(-|)\[0-9]+$');
if (reg.test(nombre)){
	if (parseInt(nombre)<=500000){
		//document.getElementById("bilan-ca-control").innerHTML="";
		return 1;
	}else{
		//document.getElementById("bilan-ca-control").innerHTML="";
		return 2;
	}
}else{
	//document.getElementById("bilan-ca-control").innerHTML="Saisir uniquement des chiffres (sans virgule ni point). Saisir 0 en cas de chiffre d'affaires ou de résultat nul.";
	self.location.href="#bilan-ca-control";
	return 0;	
}

};//fonction pour vérifier le chiffre d'affaire à n-1 --- utilisé pour sarl et sas
index.sarl_capital_social = function (cs,rn,rn1,rn2){
/*
paramétre : 
capital social n-1, resultat net n, resultat net n-1, resultat net n-2
retourne:
	0 ->pas rempli 
	1 ->somme <= 37k
	2 ->somme > 37K
*/
	cs = cs.replace(/[[\]{}()*+?.,\\^$|#\sa-zA-Z]/g,'');
	rn = rn.replace(/[[\]{}()*+?.,\\^$|#\sa-zA-Z]/g,'');
	rn1 = rn1.replace(/[[\]{}()*+?.,\\^$|#\sa-zA-Z]/g,'');
	rn2 = rn2.replace(/[[\]{}()*+?.,\\^$|#\sa-zA-Z]/g,'');
	
	var reg = new RegExp('^(-|)\[0-9]+$');
	
	if (reg.test(cs) && reg.test(rn) && reg.test(rn1) && reg.test(rn2)){
		if (parseInt(cs)+parseInt(rn)+parseInt(rn1)+parseInt(rn2) <= 37000){
			document.getElementById("obj-rn-control").innerHTML="";
			document.getElementById("bilan-cs-control").innerHTML = "";
			return 1;
		}else{
			document.getElementById("obj-rn-control").innerHTML="";
			document.getElementById("bilan-cs-control").innerHTML = "";
			return 2;
		}
	}else if(!reg.test(cs)){//si la case capital social non remplie
		document.getElementById("bilan-cs-control").innerHTML = "Saisir uniquement des chiffres (sans virgule ni point). Saisir 0 en cas de chiffre d'affaires ou de résultat nul.";
		self.location.href="#bilan-cs-control";
		return 0;
	}else if(!reg.test(rn1) || !reg.test(rn2)){//si case rn-1 ou rn-2 non remplie
		document.getElementById("bilan-cs-control").innerHTML = "";
		document.getElementById("bilan-rn-control").innerHTML = "Saisir uniquement des chiffres (sans virgule ni point). Saisir 0 en cas de chiffre d'affaires ou de résultat nul.";
		self.location.href="#bilan-rn-control";
		return 0;
	}else if(!reg.test(rn)){//si case rn non remplie
		document.getElementById("bilan-rn-control").innerHTML = "";
		document.getElementById("bilan-cs-control").innerHTML = "";
		document.getElementById("obj-rn-control").innerHTML = "Saisir uniquement des chiffres (sans virgule ni point). Saisir 0 en cas de chiffre d'affaires ou de résultat nul.";
		self.location.href="#obj-rn-control";
		return 0;
	}else return 0;
	
};//fonction pour les 37k€ --- utilisé QUE pour sarl et sas
index.sarl_evo_ca= function (CA2,CA1,CA,CA11,CA22){
/*
parametre entrée : ca2 = ca n-2 et ca22 = ca n+2
2 -> si CA n-2 < CA n-1 < CA n < CA n+1 < CA n+2
3 -> CA n et n+1 et n+2 <=500k
1 -> sinon
0 si pas remplie
*/
CA2 = CA2.replace(/[[\]{}()*+?.,\\^$|#\sa-zA-Z]/g,'');
CA1 = CA1.replace(/[[\]{}()*+?.,\\^$|#\sa-zA-Z]/g,'');
CA = CA.replace(/[[\]{}()*+?.,\\^$|#\sa-zA-Z]/g,'');
CA11 = CA11.replace(/[[\]{}()*+?.,\\^$|#\sa-zA-Z]/g,'');
CA22 = CA22.replace(/[[\]{}()*+?.,\\^$|#\sa-zA-Z]/g,'');

var reg = new RegExp('^(-|)\[0-9]+$');

if (reg.test(CA2) && reg.test(CA1) && reg.test(CA) && reg.test(CA11) && reg.test(CA22)){
document.getElementById("obj-ca-control").innerHTML="";
document.getElementById("bilan-ca-control").innerHTML="";
	if (parseInt(CA2)<parseInt(CA1) && parseInt(CA1)<parseInt(CA) && parseInt(CA)<parseInt(CA11) && parseInt(CA11)<parseInt(CA22)){
		//2 -> si CA n-2 < CA n-1 < CA n < CA n+1 < CA n+2
		return 2;
	}else if(parseInt(CA)<=500000 && parseInt(CA11)<=500000 && parseInt(CA22)<=500000){
		return 3;
	}else return 1;
}else if (!reg.test(CA2) || !reg.test(CA1)){
	document.getElementById("bilan-ca-control").innerHTML="Saisir uniquement des chiffres (sans virgule ni point). Saisir 0 en cas de chiffre d'affaires ou de résultat nul.";
	self.location.href="#bilan-ca-control";
	return 0;	
}else if (!reg.test(CA) || !reg.test(CA11) ||  !reg.test(CA22)){
	document.getElementById("bilan-ca-control").innerHTML="";
	document.getElementById("obj-ca-control").innerHTML="Saisir uniquement des chiffres (sans virgule ni point). Saisir 0 en cas de chiffre d'affaires ou de résultat nul.";
	self.location.href="#obj-ca-control";
	return 0;
}else return 0;


};//fonction qui voit l'évolution du CA
index.sarl_evo_rn= function (CA2,CA1,CA,CA11,CA22){
/*
ca2 = ca n-2
ca22 = ca n+2
2 -> si CA n-2 < CA n-1 < CA n < CA n+1 < CA n+2
3 -> CA n, n+1, n+2 <=500k
1 -> sinon
0 si pas remplie
*/
CA2 = CA2.replace(/[[\]{}()*+?.,\\^$|#\sa-zA-Z]/g,'');
CA1 = CA1.replace(/[[\]{}()*+?.,\\^$|#\sa-zA-Z]/g,'');
CA = CA.replace(/[[\]{}()*+?.,\\^$|#\sa-zA-Z]/g,'');
CA11 = CA11.replace(/[[\]{}()*+?.,\\^$|#\sa-zA-Z]/g,'');
CA22 = CA22.replace(/[[\]{}()*+?.,\\^$|#\sa-zA-Z]/g,'');

var reg = new RegExp('^(-|)\[0-9]+$');

if (reg.test(CA2) && reg.test(CA1) && reg.test(CA) && reg.test(CA11) && reg.test(CA22)){
	document.getElementById("obj-rn-control").innerHTML="";
	document.getElementById("bilan-rn-control").innerHTML="";
	if (parseInt(CA2)<parseInt(CA1) && parseInt(CA1)<parseInt(CA) && parseInt(CA)<parseInt(CA11) && parseInt(CA11)<parseInt(CA22)){
		return 2;
	}else if(parseInt(CA)<=25000 && parseInt(CA11)<=25000 && parseInt(CA22)<=25000){
		return 3;
	}else return 1;
}else if (!reg.test(CA2) || !reg.test(CA1)){
	document.getElementById("bilan-rn-control").innerHTML="Saisir uniquement des chiffres (sans virgule ni point). Saisir 0 en cas de chiffre d'affaires ou de résultat nul.";
	self.location.href="#bilan-rn-control";
	return 0;	
}else if (!reg.test(CA) || !reg.test(CA11) ||  !reg.test(CA22)){
	document.getElementById("bilan-rn-control").innerHTML="";
	document.getElementById("obj-rn-control").innerHTML="Saisir uniquement des chiffres (sans virgule ni point). Saisir 0 en cas de chiffre d'affaires ou de résultat nul.";
	self.location.href="#obj-rn-control";
	return 0;
}else return 0;


};//fonction qui voit l'évolution du RN (similaire au dessus)
index.sarl_fp = function (fp0,fp1,fp2){
/*
2 -> FPn+n+1+n+2 <= 50k
1 -> sinon
0 -> non rempli
*/
fp0 = fp0.replace(/[[\]{}()*+?.,\\^$|#\sa-zA-Z]/g,'');
fp1 = fp1.replace(/[[\]{}()*+?.,\\^$|#\sa-zA-Z]/g,'');
fp2 = fp2.replace(/[[\]{}()*+?.,\\^$|#\sa-zA-Z]/g,'');

var reg = new RegExp('^(-|)\[0-9]+$');
if (reg.test(fp0) && reg.test(fp1) && reg.test(fp2)){
		document.getElementById("obj-fp-control").innerHTML="";
		if ((parseInt(fp0)+parseInt(fp2)+parseInt(fp2))<= 50000){
			return 2;
		}else return 1;
}else{
	document.getElementById("obj-fp-control").innerHTML="Saisir uniquement des chiffres (sans virgule ni point). Saisir 0 en cas de chiffre d'affaires ou de résultat nul.";
	self.location.href="#obj-fp-control";
return 0;
}
};

index.sarl_last =function (employ, annee, ca, cs, evoCA, evoRN, FP){
if (employ == 0 || annee == 0 || ca == 0 || cs == 0 || evoCA == 0 || evoRN == 0 || FP==0){
	document.getElementById("resultat-visibilite").style.display="none";
}else if (employ == 1 && annee == 1 && ca == 1 && cs == 1){
/*
	SARL OU SAS, les fonds propres à la fin de l’exercice en cours devraient être inférieurs à 37 000 €
	Moins de 3 ans, moins de 4 salariés, dernier CA inférieur à 0,5 M€
	peu importe les besoins de fonds propres
*/
	document.getElementById("resultat-visibilite").style.display="";
	self.location.href="#resultat-visibilite";
	
	document.getElementById("resultat-formulaire").innerHTML="Ce diagnostic automatique a pour premier objectif de vous apporter un éclairage nouveau sur les possibilités de financement en fonds propres de votre entreprise avec l’actionnariat individuel.<br/><br/>La forme juridique de votre entreprise ne se prête pas à la réalisation d’augmentations de capital avec des actionnaires individuels et l’utilisation d’un marché d’actions (Carnet d’annonces, Marché Libre ou Alternext).<br/><br/>En effet, les entreprises ayant la forme de SARL ou de SAS ne peuvent avoir leur marché d’actions qu’après transformation en SA (1).<br/>Il semble, en outre, que le niveau de fonds propres de votre entreprise soit insuffisant pour réaliser une telle opération dans l’immédiat.<br/><br/>Le CIIB SA se propose cependant, à la lecture de votre dernier bilan et d’après vos objectifs de développement, d’affiner ce premier diagnostic automatique.<br/>Nous vous invitons à contacter le CIIB SA en cliquant <a target='_blank' href = http://www.ciib.fr/contact-us-email>ici.</a><br/><br/>Il faut savoir que la mise en place d’un marché d’actions devient intéressante pour les entreprises en SA à partir de leur quatrième année d’existence, employant au moins 4 salariés et réalisant plus de 500 000 € de chiffre d’affaires.<br/>La mise en place et l’utilisation de sa propre bourse indépendante <a target='_blank' href = http://www.ciib.fr/documents/CIIB-Marche-Actions-gre_a_gre.pdf>(Carnet d’annonces)</a>  étant le moyen de se préparer à l’avance à une éventuelle future introduction sur le Marché Libre ou sur Alternext. Ceci tout en permettant de réaliser une ou plusieurs augmentations de capital successives.<br/><br/>Dans la mesure où votre entreprise a de fortes perspectives de croissance, nous vous proposons, si votre emploi du temps vous le permet, de participer à notre prochain séminaire <a target='_blank' href = http://www.ciib.fr/formations/mini-bourse ><em>Disposer d’un marché d’actions, sans la bourse pour financer le développement de votre entreprise (dès 4 salariés) avec des épargnants individuels</em></a>.<br/><br/><br/><br/>(1) En effet, seules les entreprises ayant la forme de SA peuvent avoir leur marché d’actions, avec ou sans la bourse<br/>";
}else if(employ == 1 && annee == 1 && ca == 1 && cs == 2){
/*
	SARL OU SAS, les fonds propres à la fin de l’exercice en cours devraient être supérieurs à 37 000 €
	Moins de 3 ans, moins de 4 salariés, dernier CA inférieur à 0,5 M€
	peu importe les besoins de fonds propres
*/
	document.getElementById("resultat-visibilite").style.display="";
	self.location.href="#resultat-visibilite";
	
	document.getElementById("resultat-formulaire").innerHTML="Ce diagnostic automatique a pour premier objectif de vous apporter un éclairage nouveau sur les possibilités de financement en fonds propres de votre entreprise avec l’actionnariat individuel.<br/><br/>La forme juridique de votre entreprise ne se prête pas à la réalisation d’augmentations de capital avec des actionnaires individuels et l’utilisation d’un marché d’actions (Carnet d’annonces, Marché Libre ou Alternext).<br/><br/>En effet, les entreprises ayant la forme de SARL ou de SAS ne peuvent avoir leur marché d’actions qu’après transformation en SA (1).<br/>Il se trouve que le niveau de fonds propres de votre entreprise semble suffisant pour réaliser une telle opération.<br/><br/>Le CIIB SA se propose cependant, à la lecture de votre dernier bilan et d’après vos objectifs de développement, d’affiner ce premier diagnostic automatique.<br/>Nous vous invitons à contacter le CIIB SA en cliquant <a target='_blank' href = http://www.ciib.fr/contact-us-email>ici.</a><br/><br/>Il faut savoir que la mise en place d’un marché d’actions devient intéressante pour les entreprises en SA à partir de leur quatrième année d’existence, employant au moins 4 salariés et réalisant plus de 500 000 € de chiffre d’affaires.<br/>La mise en place et l’utilisation de sa propre bourse indépendante<a target='_blank' href = http://www.ciib.fr/documents/CIIB-Marche-Actions-gre_a_gre.pdf  > (Carnet d’annonces)</a> étant le moyen de se préparer à l’avance à une éventuelle future introduction sur le Marché Libre ou sur Alternext. Ceci tout en permettant de réaliser une ou plusieurs augmentations de capital successives.<br/><br/>Dans la mesure où votre entreprise a de fortes perspectives de croissance, nous vous proposons, si votre emploi du temps vous le permet, de participer à notre prochain séminaire <a target='_blank' href = http://www.ciib.fr/formations/mini-bourse ><em>Disposer d’un marché d’actions, sans la bourse pour financer le développement de votre entreprise (dès 4 salariés) avec des épargnants individuels</em></a>.<br/><br/><br/><br/>(1) En effet, seules les entreprises ayant la forme de SA peuvent avoir leur marché d’actions, avec ou sans la bourse<br/>";		
}else if (cs == 2 && evoCA == 2 && evoRN == 2){
/*
	SARL OU SAS, les fonds propres à la fin de l’exercice en cours devraient être supérieurs à 37 000 €
	croissance constante du CA et du RN 
	peu importe les besoins de fonds propres
*/
	document.getElementById("resultat-visibilite").style.display="";
	self.location.href="#resultat-visibilite";
	
	document.getElementById("resultat-formulaire").innerHTML="Ce diagnostic automatique a pour premier objectif de vous apporter un éclairage nouveau sur les possibilités de financement en fonds propres de votre entreprise avec l’actionnariat individuel.<br/><br/>Malgré la croissance constante du chiffre d’affaires et des résultats de votre entreprise (passés et prévisionnels), sa forme juridique ne se prête pas à la réalisation d’augmentations de capital avec des actionnaires individuels et l’utilisation d’un marché d’actions (Carnet d’annonces, Marché Libre ou Alternext).<br/><br/>En effet, les entreprises ayant la forme de SARL ou de SAS ne peuvent avoir leur marché d’actions qu’après transformation en SA (1).<br/>Il se trouve que le niveau de fonds propres de votre entreprise semble suffisant pour réaliser une telle opération.<br/><br/>Le CIIB SA se propose cependant, à la lecture de votre dernier bilan et d’après vos objectifs de développement, d’affiner ce premier diagnostic automatique.<br/>Nous vous invitons à contacter le CIIB SA en cliquant <a target='_blank' href = http://www.ciib.fr/contact-us-email>ici.</a><br/><br/>Il faut savoir que la mise en place d’un marché d’actions devient intéressante pour les entreprises en SA à partir de leur quatrième année d’existence, employant au moins 4 salariés et réalisant plus de 500 000 € de chiffre d’affaires.<br/><br/>La mise en place et l’utilisation de sa propre bourse indépendante<a target='_blank' href = http://www.ciib.fr/documents/CIIB-Marche-Actions-gre_a_gre.pdf  > (Carnet d’annonces) </a>étant le moyen de se préparer à l’avance à une éventuelle future introduction sur le Marché Libre ou sur Alternext. Ceci tout en permettant de réaliser une ou plusieurs augmentations de capital successives.<br/><br/>Dans la mesure où votre entreprise a de fortes perspectives de croissance, nous vous proposons, si votre emploi du temps vous le permet, de participer à notre prochain séminaire <a target='_blank' href = http://www.ciib.fr/formations/mini-bourse ><em>Disposer d’un marché d’actions, sans la bourse pour financer le développement de votre entreprise (dès 4 salariés) avec des épargnants individuels</em></a>.<br/><br/><br/><br/>(1) En effet, seules les entreprises ayant la forme de SA peuvent avoir leur marché d’actions, avec ou sans la bourse<br/>";
}else if(FP == 2 && evoCA == 3 && evoRN == 3){
/*
CA n, n+1, n+2 <= 500k
RN pareil pour 25k
FP n+n+1+n+2 <= 50k
*/
	document.getElementById("resultat-visibilite").style.display="";
	self.location.href="#resultat-visibilite";
	document.getElementById("resultat-formulaire").innerHTML="Ce diagnostic automatique a pour premier objectif de vous apporter un éclairage nouveau sur les possibilités de financement en fonds propres de votre entreprise avec l’actionnariat individuel.<br/><br/>Les besoins de besoins de fonds propres de votre entreprise sont relativement peu importants. <br/>Par ailleurs, vos objectifs de croissance en termes de progression chiffre d’affaires et de résultats paraissent mesurés.<br/><br/>Nous informons que la mise en place d’un marché d’actions devient intéressante pour les entreprises en SA, à partir de leur quatrième année d’existence, employant au moins 4 salariés et réalisant au minimum 500 000 € de chiffre d’affaires.<br/><br/>Il est à noter que la forme juridique de votre entreprise ne se prête pas pour le moment à la réalisation d’augmentations de capital avec des actionnaires individuels et l’utilisation d’un marché d’actions (Carnet d’annonces, Marché Libre ou Alternext).<br/><br/>En effet, les entreprises ayant la forme de SARL ou de SAS ne peuvent avoir leur marché d’actions qu’après transformation en SA (1).<br/><br/><br/>Le CIIB SA se propose cependant, à la lecture de votre dernier bilan et d’après vos objectifs de développement, d’affiner ce premier diagnostic automatique.<br/>Nous vous invitons à contacter le CIIB SA en cliquant <a target='_blank' href = 'http://www.ciib.fr/contact-us-email'>ici.</a><br/>Nous définirons ensemble le prix possible d’émission des actions et le montant d’augmentation de capital possible pour votre entreprise.<br/><br/>Dans la mesure où votre entreprise a de fortes perspectives de croissance, nous vous proposons, si votre emploi du temps vous le permet, de participer à notre prochain séminaire <a target='_blank' href = 'http://www.ciib.fr/formations/mini-bourse'><em>Disposer d’un marché d’actions, sans la bourse pour financer le développement de votre entreprise (dès 4 salariés) avec des épargnants individuels.</em></a><br/><br/><br/>(1) seules les entreprises ayant la forme de SA peuvent avoir leur marché d’actions, avec ou sans la bourse<br/>";
}else {
/*
	autre cas
*/
	document.getElementById("resultat-visibilite").style.display="";
	self.location.href="#resultat-visibilite";
	
	document.getElementById("resultat-formulaire").innerHTML="Ce diagnostic automatique a pour premier objectif de vous apporter un éclairage nouveau sur les possibilités de financement en fonds propres de votre entreprise avec l’actionnariat individuel.<br/><br/>La forme juridique de votre entreprise, ne lui permet pas de réaliser immédiatement une augmentation de capital avec des actionnaires individuels et l’utilisation d’un marché d’actions (Carnet d’annonces, Marché Libre ou Alternext).<br/>En effet, les entreprises ayant la forme de SARL ou de SAS ne peuvent avoir leur marché d’actions qu’après transformation en SA (1).<br/><br/>Le CIIB SA se propose, à la lecture de votre dernier bilan et d’après vos objectifs de développement, d’affiner ce premier diagnostic automatique.<br/>Nous vous invitons à contacter le CIIB SA en cliquant <a target='_blank' href = http://www.ciib.fr/contact-us-email>ici.</a><br/><br/>Il faut savoir que la mise en place d’un marché d’actions devient intéressante pour les entreprises en SA à partir de leur quatrième année d’existence, employant au moins 4 salariés et réalisant plus de 500 000 € de chiffre d’affaires.<br/><br/>La mise en place et l’utilisation de sa propre bourse indépendante <a target='_blank' href = http://www.ciib.fr/documents/CIIB-Marche-Actions-gre_a_gre.pdf  >(Carnet d’annonces)</a> étant le moyen de se préparer à l’avance à une éventuelle future introduction sur le Marché Libre ou sur Alternext. Ceci tout en permettant de réaliser une ou plusieurs augmentations de capital successives.<br/><br/>Dans la mesure où votre entreprise a de fortes perspectives de croissance, nous vous proposons, si votre emploi du temps vous le permet, de participer à notre prochain séminaire <a target='_blank' href = http://www.ciib.fr/formations/mini-bourse ><em>Disposer d’un marché d’actions, sans la bourse pour financer le développement de votre entreprise (dès 4 salariés) avec des épargnants individuels</em></a>.<br/><br/><br/><br/><br/><br/>(1) En effet, seules les entreprises ayant la forme de SA peuvent avoir leur marché d’actions, avec ou sans la bourse<br/>";	
}
//$("#btn-tester").trigger('click');
};//fonction qui s'execute pour les SARL ou SAS uniquement

//fonctions pour les SA

index.sa_chiffreAffaireN= function (nombre){
/*
	prend en parametre le CA à et retourne :
	0 -> pas remplie
	1 -> < 500k
	2 -> >= 500k
	3 -> >= 1M
*/
nombre = nombre.replace(/[[\]{}()*+?.,\\^$|#\sa-zA-Z]/g,'');

var reg = new RegExp('^(-|)\[0-9]+$');
if (reg.test(nombre)){
	if (parseInt(nombre)<500000){
		//document.getElementById("obj-ca-control").innerHTML="";
		return 1;
	}else if(parseInt(nombre)>=500000 && parseInt(nombre)<1000000){
		//document.getElementById("obj-ca-control").innerHTML="";
		return 2;
	}else {
		//document.getElementById("obj-ca-control").innerHTML="";
		return 3;
	}
}else{
	document.getElementById("obj-ca-control").innerHTML="Saisir uniquement des chiffres (sans virgule ni point). Saisir 0 en cas de chiffre d'affaires ou de résultat nul.";
	self.location.href="#obj-ca-control";
	return 0;	
}	
};//fonction pour le CA--- pour les SA
index.sa_evo_ca= function (CA2,CA1,CA,CA11,CA22){
/*
parametre entrée = ca2 = ca n-2
paramaetre entrée = ca22 = ca n+2

2 -> si CA n-2 < CA n-1 < CA n < CA n+1 < CA n+2
1 -> si CA n-1 < CA n+2
-1 -> autre cas
0 si pas remplie
*/
CA2 = CA2.replace(/[[\]{}()*+?.,\\^$|#\sa-zA-Z]/g,'');
CA1 = CA1.replace(/[[\]{}()*+?.,\\^$|#\sa-zA-Z]/g,'');
CA = CA.replace(/[[\]{}()*+?.,\\^$|#\sa-zA-Z]/g,'');
CA11 = CA11.replace(/[[\]{}()*+?.,\\^$|#\sa-zA-Z]/g,'');
CA22 = CA22.replace(/[[\]{}()*+?.,\\^$|#\sa-zA-Z]/g,'');

var reg = new RegExp('^(-|)\[0-9]+$');

if (reg.test(CA2) && reg.test(CA1) && reg.test(CA) && reg.test(CA11) && reg.test(CA22)){
document.getElementById("obj-ca-control").innerHTML="";
document.getElementById("bilan-ca-control").innerHTML="";
	if (parseInt(CA2)<parseInt(CA1) && parseInt(CA1)<parseInt(CA) && parseInt(CA)<parseInt(CA11) && parseInt(CA11)<parseInt(CA22)) return 2;
	else if (parseInt(CA1)<parseInt(CA22)) return 1;
	else return (-1);
}else if (!reg.test(CA2) || !reg.test(CA1)){
	document.getElementById("bilan-ca-control").innerHTML="Saisir uniquement des chiffres (sans virgule ni point). Saisir 0 en cas de chiffre d'affaires ou de résultat nul.";
	self.location.href="#bilan-ca-control";
	return 0;	
}else if (!reg.test(CA) || !reg.test(CA11) ||  !reg.test(CA22)){
	document.getElementById("bilan-ca-control").innerHTML="";
	document.getElementById("obj-ca-control").innerHTML="Saisir uniquement des chiffres (sans virgule ni point). Saisir 0 en cas de chiffre d'affaires ou de résultat nul.";
	self.location.href="#obj-ca-control";
	return 0;
}else return 0;


};//fonction qui voit l'évolution du CA
index.sa_evo_rn= function (CA2,CA1,CA,CA11,CA22){
/*
ca2 = ca n-2
ca22 = ca n+2
 2 -> si CA n-2 < CA n-1 < CA n < CA n+1 < CA n+2
 1 -> si RN n-1 < RN n+2
 -1 -> sinon
0 si pas remplie
*/
CA2 = CA2.replace(/[[\]{}()*+?.,\\^$|#\sa-zA-Z]/g,'');
CA1 = CA1.replace(/[[\]{}()*+?.,\\^$|#\sa-zA-Z]/g,'');
CA = CA.replace(/[[\]{}()*+?.,\\^$|#\sa-zA-Z]/g,'');
CA11 = CA11.replace(/[[\]{}()*+?.,\\^$|#\sa-zA-Z]/g,'');
CA22 = CA22.replace(/[[\]{}()*+?.,\\^$|#\sa-zA-Z]/g,'');

var reg = new RegExp('^(-|)\[0-9]+$');

if (reg.test(CA2) && reg.test(CA1) && reg.test(CA) && reg.test(CA11) && reg.test(CA22)){
	document.getElementById("obj-rn-control").innerHTML="";
	document.getElementById("bilan-rn-control").innerHTML="";
	if (parseInt(CA2)<parseInt(CA1) && parseInt(CA1)<parseInt(CA) && parseInt(CA)<parseInt(CA11) && parseInt(CA11)<parseInt(CA22)) return 2;
	else if (parseInt(CA1)<parseInt(CA22)) return 1;
	else return (-1);
}else if (!reg.test(CA2) || !reg.test(CA1)){
	document.getElementById("bilan-rn-control").innerHTML="Saisir uniquement des chiffres (sans virgule ni point). Saisir 0 en cas de chiffre d'affaires ou de résultat nul.";
	self.location.href="#bilan-rn-control";
	return 0;	
}else if (!reg.test(CA) || !reg.test(CA11) ||  !reg.test(CA22)){
	document.getElementById("bilan-rn-control").innerHTML="";
	document.getElementById("obj-rn-control").innerHTML="Saisir uniquement des chiffres (sans virgule ni point). Saisir 0 en cas de chiffre d'affaires ou de résultat nul.";
	self.location.href="#obj-rn-control";
	return 0;
}else return 0;


};//fonction qui voit l'évolution du RN (similaire au dessus)
index.sa_fp = function (fp0, fp1, fp2){

/*
	fonction qui prend en paramètre d'entrée le besoin de fond propre pour n, n+1, n+2 et retourne :
	0 -> pas remplie
	1 -> si 500 000 €  <  besoin de Fonds propres de l’exercice n  et si B FP n+1 = 0 et si B FP n+2 = 0
	2 ->  si Besoin FP n  +  n+1  +  n+2  > 1 000 000 €
	3 ->  si Besoin FP n  +  n+1  +  n+2  < 1 000 000 € et si Besoin FP n  < 500 000 €
*/
fp0 = fp0.replace(/[[\]{}()*+?.,\\^$|#\sa-zA-Z]/g,'');
fp1 = fp1.replace(/[[\]{}()*+?.,\\^$|#\sa-zA-Z]/g,'');
fp2 = fp2.replace(/[[\]{}()*+?.,\\^$|#\sa-zA-Z]/g,'');

var reg = new RegExp('^(-|)\[0-9]+$');

if (reg.test(fp0) && reg.test(fp1) && reg.test(fp2)){
	document.getElementById("obj-fp-control").innerHTML="";
	if (parseInt(fp0) >= 500000 && parseInt(fp1) == 0 && parseInt(fp2) == 0) return 1;
	else if ((parseInt(fp0)+parseInt(fp1)+parseInt(fp2)) >= 1000000) return 2;
	else if ((parseInt(fp0)+parseInt(fp1)+parseInt(fp2)) < 1000000 && parseInt(fp0)<=500000)return 3;
	
}else{
	document.getElementById("obj-fp-control").innerHTML="Saisir uniquement des chiffres (sans virgule ni point). Saisir 0 en cas de chiffre d'affaires ou de résultat nul.";
	self.location.href="#obj-fp-control";
	return 0;	
}

};//fonction pour les fond propres

index.sa_last = function (evoCA, evoRN, CA, FP){

if (evoCA == 0 || evoRN == 0 || CA == 0 || FP ==0){
	document.getElementById("resultat-visibilite").style.display="none";

	
}else{
	
	self.location.href="#resultat-visibilite";
	document.getElementById("resultat-visibilite").style.display="";
	
	if (evoCA == 2 && evoRN == 2 && CA == 3 && FP == 1){
		/*
			Si c’est une SA
			et si CA n-2 < CA n-1 < CA n < CA n+1 < CA n+2
			et si RN n-2 < RN n-1 < RN n < RN n+1 < RN n+2
			et si CA n > 1 000 000 €
			si 500 000 €  <  besoin de Fonds propres de l’exercice n 
			et si B FP n+1 = 0
			et si B FP n+2 = 0

		*/
		
		document.getElementById("resultat-formulaire").innerHTML="Ce diagnostic automatique a pour premier objectif de vous apporter un éclairage nouveau sur les possibilités de financement en fonds propres de votre entreprise avec l’actionnariat individuel.<br/><br/>Votre entreprise, de part la croissance constante de son chiffre d’affaires et de ses résultats passés et prévisionnels, ainsi que de part sa forme juridique (1), se prête particulièrement bien à l’ouverture de son capital à l’actionnariat individuel grâce à l’utilisation d’un marché d’actions, avec ou sans la bourse.<br/><br/>Compte tenu de la taille de votre entreprise en termes de chiffre d’affaires, et d’après l’importance de vos besoins de fonds propres, une introduction sur le Marché Libre ou sur Alternext ne semble pas être le moyen le mieux approprié dans l’immédiat.<br/><br/>La mise en place et l’utilisation de votre propre bourse indépendante <a target='_blank' href = 'http://www.ciib.fr/documents/CIIB-Marche-Actions-gre_a_gre.pdf'>(Carnet d’annonces) </a>serait cependant le moyen de vous y préparer à l’avance. Ceci tout en réalisant une ou plusieurs augmentations de capital successives.<br/><br/>Vous indiquez un besoin de financement en fonds propres pour cette année et aucun besoin pour les années suivantes.<br/>Cependant, si cela n’influait pas sur vos projets de développement, l’augmentation de capital que vous envisagez réaliser cette année ne pourrait-elle pas plutôt se réaliser en deux temps ? Une première opération pour un montant de "+ (parseInt(objet.fondPropreN0)/2) +"€ cette année et une seconde opération d’un même montant un plus tard ?<br/>Ce qui serait permettrait aux actionnaires actuels d’être moins dilués. Car, en effet, la prime d’émission ainsi que le montant des capitaux collectés peuvent être de plus en plus importants dans le temps en fonction de la réalisation des prévisions annoncées.<br/><br/>Le CIIB SA se propose, à la lecture de votre dernier bilan et d’après vos objectifs de développement, d’affiner ce premier diagnostic automatique, le cas échéant.<br/>Nous vous invitons à contacter le CIIB SA en cliquant <a target='_blank' href = 'http://www.ciib.fr/contact-us-email'>ici.</a><br/><br/>Si vous le souhaitez, nous pourrons ensuite réaliser une étude de faisabilité approfondie sur la capacité de votre entreprise à accroître ses fonds propres avec l\'épargne individuelle.<br/><br/>Par ailleurs, si votre emploi du temps vous le permet, nous vous proposons de participer à notre prochain séminaire <a target='_blank' href = 'http://www.ciib.fr/formations/introduction' > <em>Préparer votre introduction sur le Marché Libre ou sur Alternext</em></a>.<br/><br/><br/>(1) En effet, seules les entreprises ayant la forme de SA peuvent avoir leur marché d’actions, avec ou sans la bourse<br/>";
	}else if (evoCA == 2 && evoRN == 2 && CA == 3 && FP == 2){
	/*
		Si c’est une SA
		et si CA n-2 < CA n-1 < CA n < CA n+1 < CA n+2
		et si RN n-2 < RN n-1 < RN n < RN n+1 < RN n+2
		et si CA n > 1 000 000 €
		et si Besoin FP n  +  n+1  +  n+2  > 1 000 000 €
	*/
		
		document.getElementById("resultat-formulaire").innerHTML="Ce diagnostic automatique a pour premier objectif de vous apporter un éclairage nouveau sur les possibilités de financement en fonds propres de votre entreprise avec l’actionnariat individuel.<br/><br/>Votre entreprise, de part la croissance constante de son chiffre d’affaires et de ses résultats passés et prévisionnels, ainsi que de part sa forme juridique (1), se prête particulièrement bien à l’ouverture de son capital à l’actionnariat individuel grâce à l’utilisation d’un marché d’actions, avec ou sans la bourse.<br/><br/>Compte tenu de la taille de votre entreprise en termes de chiffre d’affaires, et d’après l’importance de vos besoins de fonds propres, le Marché Libre, voire Alternext, devrait lui être aisément accessible.<br/><br/>Toujours est-il que la mise en place et l’utilisation de votre propre bourse indépendante <a target='_blank' href = 'http://www.ciib.fr/documents/CIIB-Marche-Actions-gre_a_gre.pdf'>(Carnet d’annonces) </a>serait le moyen de vous y préparer à l’avance. Ceci tout en réalisant une ou plusieurs augmentations de capital successives.<br/><br/>Le CIIB SA se propose, à la lecture de votre dernier bilan et d’après vos objectifs de développement, d’affiner ce premier diagnostic automatique, le cas échéant.<br/>Nous vous invitons à contacter le CIIB SA en cliquant <a target='_blank' href = 'http://www.ciib.fr/contact-us-email'>ici.</a><br/><br/>Si vous le souhaitez, nous pourrons ensuite réaliser une étude de faisabilité approfondie sur la capacité de votre entreprise à accroître ses fonds propres avec l\'épargne individuelle.<br/><br/>Par ailleurs, si votre emploi du temps vous le permet, nous vous proposons de participer à notre prochain séminaire <a target='_blank' href = 'http://www.ciib.fr/formations/introduction'><em>Préparer votre introduction sur le Marché Libre ou sur Alternext</em></a>.<br/><br/><br/><br/>(1) En effet, seules les entreprises ayant la forme de SA peuvent avoir leur marché d’actions, avec ou sans la bourse<br/>";
	}else if (evoCA == 2 && evoRN == 2 && (CA == 2 || CA == 3) && FP == 3){
	/*
		Si c’est une SA
		et si CA n-2 < CA n-1 < CA n < CA n+1 < CA n+2
		et si RN n-2 < RN n-1 < RN n < RN n+1 < RN n+2
		et si CA n > 500 000 €							
		et si Besoin FP n  +  n+1  +  n+2  < 1 000 000 € 
		et si Besoin FP n  < 500 000 €
	*/
		
		document.getElementById("resultat-formulaire").innerHTML="Ce diagnostic automatique a pour premier objectif de vous apporter un éclairage nouveau sur les possibilités de financement en fonds propres de votre entreprise avec l’actionnariat individuel.<br/><br/>Votre entreprise, de part la croissance constante de son chiffre d’affaires et de ses résultats passés et prévisionnels, ainsi que de part sa forme juridique (1), se prête particulièrement bien à l’ouverture de son capital à l’actionnariat individuel grâce à l’utilisation d’un marché d’actions, avec ou sans la bourse.<br/><br/>Compte tenu de la taille de votre entreprise en termes de chiffre d’affaires, et d’après l’importance de vos besoins de fonds propres, une introduction sur le Marché Libre ou sur Alternext ne semble pas être le moyen le mieux approprié dans l’immédiat.<br/><br/>La mise en place et l’utilisation de votre propre bourse indépendante  <a target='_blank' href = 'http://www.ciib.fr/documents/CIIB-Marche-Actions-gre_a_gre.pdf'  > (Carnet d’annonces)</a> serait cependant le moyen de vous y préparer à l’avance. Ceci tout en réalisant une ou plusieurs augmentations de capital successives.<br/><br/>Le CIIB SA se propose, à la lecture de votre dernier bilan et d’après vos objectifs de développement, d’affiner ce premier diagnostic automatique, le cas échéant.<br/>Nous vous invitons à contacter le CIIB SA en cliquant <a target='_blank' href = 'http://www.ciib.fr/contact-us-email'>ici.</a><br/><br/>Si vous le souhaitez, nous pourrons ensuite réaliser une étude de faisabilité approfondie sur la capacité de votre entreprise à accroître ses fonds propres avec l\'épargne individuelle.<br/><br/>Par ailleurs, si votre emploi du temps vous le permet, nous vous proposons de participer à notre prochain séminaire <a target='_blank' href = 'http://www.ciib.fr/formations/mini-bourse '><em>Disposer d’un marché d’actions, sans la bourse, pour financer le développement de votre entreprise (dès 4 salariés) avec des épargnants individuels</em></a>.<br/><br/><br/><br/>(1) En effet, seules les entreprises ayant la forme de SA peuvent avoir leur marché d’actions, avec ou sans la bourse<br/>";
	}else if (evoCA == 1 && evoRN == 1 && CA == 3 && FP == 3){
	/*
	Si c’est une SA
	et si CA n-1 < CA n+2
	et si RN n-1 < RN n+2
	et si CA n > 1 000 000 €
	et si Besoin FP n  +  n+1  +  n+2  < 1 000 000 €
	et si Besoin FP n  < 500 000 €
	*/
		
		document.getElementById("resultat-formulaire").innerHTML="Ce diagnostic automatique a pour premier objectif de vous apporter un éclairage nouveau sur les possibilités de financement en fonds propres de votre entreprise avec l’actionnariat individuel.<br/><br/>Votre entreprise, de part la croissance de son chiffre d’affaires et de ses résultats, ainsi que de part sa forme juridique (1), se prête particulièrement bien à l’ouverture de son capital à l’actionnariat individuel grâce à l’utilisation d’un marché d’actions, avec ou sans la bourse.<br/><br/>Compte tenu de la taille de votre entreprise en termes de chiffre d’affaires, et d’après l’importance de vos besoins de fonds propres, une introduction sur le Marché Libre ou sur Alternext ne semble pas être le moyen le mieux approprié dans l’immédiat.<br/><br/>La mise en place et l’utilisation de votre propre bourse indépendante <a target='_blank' href = 'http://www.ciib.fr/documents/CIIB-Marche-Actions-gre_a_gre.pdf'  > (Carnet d’annonces) </a>serait cependant le moyen de vous y préparer à l’avance. Ceci tout en réalisant une ou plusieurs augmentations de capital successives.<br/><br/>Le CIIB SA se propose, à la lecture de votre dernier bilan et d’après vos objectifs de développement, d’affiner ce premier diagnostic automatique, le cas échéant.<br/>Nous vous invitons à contacter le CIIB SA en cliquant <a target='_blank' href = 'http://www.ciib.fr/contact-us-email'>ici.</a><br/><br/>Si vous le souhaitez, nous pourrons ensuite réaliser une étude de faisabilité approfondie sur la capacité de votre entreprise à accroître ses fonds propres avec l\'épargne individuelle.<br/><br/>Par ailleurs, si votre emploi du temps vous le permet, nous vous proposons de participer à notre prochain séminaire <a target='_blank' href = 'http://www.ciib.fr/formations/mini-bourse' ><em>Disposer d’un marché d’actions, sans la bourse, pour financer le développement de votre entreprise (dès 4 salariés) avec des épargnants individuels</em></a>.<br/><br/><br/><br/>(1) En effet, seules les entreprises ayant la forme de SA peuvent avoir leur marché d’actions, avec ou sans la bourse<br/><br/>";
	}else if (evoCA == 1 && evoRN == 1){
		/*
	Si c’est une SA
	et si CA n-1 < CA n+2
	et si RN n-1 < RN n+2
		*/	
			
		document.getElementById("resultat-formulaire").innerHTML="Ce diagnostic automatique a pour premier objectif de vous apporter un éclairage nouveau sur les possibilités de financement en fonds propres de votre entreprise avec l’actionnariat individuel.<br/><br/>Votre entreprise, de part les objectifs de croissance de son chiffre d’affaires et de ses résultats, ainsi que de part sa forme juridique (1), se prête à l’ouverture de son capital à l’actionnariat individuel grâce à l’utilisation d’un marché d’actions, avec ou sans la bourse.<br/><br/>La mise en place et l’utilisation de votre propre bourse indépendante<a target='_blank' href = 'http://www.ciib.fr/documents/CIIB-Marche-Actions-gre_a_gre.pdf'> (Carnet d’annonces) </a>serait le moyen de vous préparer à l’avance à une éventuelle future introduction sur le Marché Libre ou sur Alternext. Ceci tout en vous permettant de réaliser une ou plusieurs augmentations de capital successives.<br/><br/>Le CIIB SA se propose, à la lecture de votre dernier bilan et d’après vos objectifs de développement, d’affiner ce premier diagnostic automatique.<br/>Nous vous invitons à contacter le CIIB SA en cliquant <a target='_blank' href = 'http://www.ciib.fr/contact-us-email'>ici.</a>Nous définirons ensemble le prix d'émission des actions et le montant d'augmentation de capital possible pour votre entreprise.<br/><br/>Si vous le souhaitez, nous pourrons ensuite réaliser une étude de faisabilité approfondie sur la capacité de votre entreprise à accroître ses fonds propres avec l'épargne individuelle.<br/><br/>Par ailleurs, si votre emploi du temps vous le permet, nous nous vous proposons de participer à notre prochain séminaire <a target='_blank' href = 'http://www.ciib.fr/formations/mini-bourse'><em>Disposer d’un marché d’actions, sans la bourse, pour financer le développement de votre entreprise (dès 4 salariés) avec des épargnants individuels</em></a>.<br/><br/><br/><br/>(1) En effet, seules les entreprises ayant la forme de SA peuvent avoir leur marché d’actions, avec ou sans la bourse<br/>";
	}else {
		
		
			document.getElementById("resultat-formulaire").innerHTML="Ce diagnostic automatique a pour premier objectif de vous apporter un éclairage nouveau sur les possibilités de financement en fonds propres de votre entreprise avec l’actionnariat individuel.<br/><br/><br/>Votre entreprise, compte tenue de sa forme juridique (1), se prêterait à l’ouverture de son capital à l’actionnariat individuel grâce à l’utilisation d’un marché d’actions, avec ou sans la bourse.<br/><br/>La mise en place et l’utilisation de votre propre bourse indépendante <a target='_blank' href ='http://www.ciib.fr/documents/CIIB-Marche-Actions-gre_a_gre.pdf'>(Carnet d’annonces) </a>serait le moyen de vous préparer à l’avance à une éventuelle future introduction sur le Marché Libre ou sur Alternext. Ceci tout en vous permettant de réaliser une ou plusieurs augmentations de capital successives.<br/><br/>Le CIIB SA se propose, à la lecture de votre dernier bilan et d’après vos objectifs de développement, d’affiner ce premier diagnostic automatique.<br/>Nous vous invitons à contacter le CIIB SA en cliquant <a target='_blank' href ='http://www.ciib.fr/contact-us-email'>ici.</a><br/><br/>Si vous le souhaitez, nous pourrons ensuite réaliser une étude de faisabilité approfondie sur la capacité de votre entreprise à accroître ses fonds propres avec l épargne individuelle.<br/><br/>Par ailleurs, si votre emploi du temps vous le permet, nous vous proposons de participer à notre prochain séminaire <a target='_blank' href = 'http://www.ciib.fr/formations/mini-bourse' ><em>Disposer d’un marché d’actions, sans la bourse, pour financer le développement de votre entreprise (dès 4 salariés) avec des épargnants individuels</em></a>.<br/><br/><br/><br/>(1) En effet, seules les entreprises ayant la forme de SA peuvent avoir leur marché d’actions, avec ou sans la bourse<br/>"
	}
}

};

/************************************************************************************************************************/



index.post = function (data, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/");
    xhr.onreadystatechange = callback;
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(data));
};

index.log_callback = function () {

	if (this.readyState == 4 && this.status == 200) {
	
		var r = JSON.parse(this.responseText);
		
		if (r.message == "ok"){
			console.log("ok");
			
		}else console.log("doublon");
	}
};

HTMLElement.prototype.has_class = function (c) {
	return (this.className.indexOf(c) >= 0);
};

window.onload = function () {
	index.start();
	$('input[type=text][name=secondname]').tooltip({
	placement: "bottom",
	trigger: "focus"
	});
};


