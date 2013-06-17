<!-- Derick Mullis Visual Framework_1306 Project 1 -->

window.addEventListener("DOMContentLoaded", function(){

function $(x){
	var element = document.getElementById(x);
	return element;
}

function getType() {
	var itemType = document.forms[0].type;
	for(var i=0; i < itemType.length; i++){
		if(itemType[i].checked) {
			typeValue = itemType[i].value;
		}
	}
}

function getQuality() {
	var itemQuality = document.forms[0].quality;
	for(var i=0; i < itemQuality.length; i++){
		if(itemQuality[i].checked) {
			typeQuality = itemQuality[i].value;
		}
	}
}

function saveData(){
	var storeNumber = Math.floor(Math.random()*100000001);
	getType();
	getQuality();
	var object 				= {};
	object.item 			= ["Item Name:", $("itemName").value];
	object.type 			= ["Type:", typeValue];
	object.classification 	= ["Classification:", $("classification").value];
	object.quality 			= ["Quality:", typeQuality];
	object.sellValue 		= ["Sell Value:", $("sellRange").value];
	object.dateStashed 		= ["Date Stashed:", $("stashDate").value];
	object.droppedFrom 		= ["Dropped From:", $("dropped").value];
	localStorage.setItem(storeNumber, JSON.stringify(object));
	window.location.reload();
	alert("Stash Successful!");
}

function pullData () {
	if(localStorage.length === 0){
		alert("There are currently no items in your stash");
	}
	toggle("on");
	var displayDiv = document.createElement("div");
	displayDiv.setAttribute("id", "object");
	var createList = document.createElement("ul");
	displayDiv.appendChild(createList);
	document.body.appendChild(displayDiv);
	$("object").style.display = "block";
	for(var i=0, j=localStorage.length; i<j; i++){
		var createLi = document.createElement("li");
		var linkLi = document.createElement("ul");
		createList.appendChild(createLi);
		var storageKey = localStorage.key(i);
		var storageValue = localStorage.getItem(storageKey);
		var listObject = JSON.parse(storageValue);
		var createSubList = document.createElement("ul");
		createLi.appendChild(createSubList);
		for(var n in listObject){
			var createSubLi = document.createElement("li");
			createSubList.appendChild(createSubLi);
			var objSubText = listObject[n][0]+"  "+listObject[n][1];
			createSubLi.innerHTML = objSubText;
			createSubList.appendChild(linkLi);
		}
		updateItemLink(localStorage.key(i), linkLi);
	}
}

function updateItemLink(key, linkLi){
	var updateLink = document.createElement("a");
	updateLink.href = "#";
	updateLink.key = key;
	var updateText = "Update Item";
	//updateLink.addEventListener("click", updateItem);
	updateLink.innerHTML = updateText;
	linkLi.appendChild(updateLink);
	
	var lineBreak = document.createElement("br");
	linkLi.appendChild(lineBreak);
	
	var removeLink = document.createElement("a");
	removeLink.href = "#";
	removeLink.key = key;
	var removeText = "Remove Item from Stash";
	//removeLink.addEventListener("click", removeItem);
	removeLink.innerHTML = removeText;
	linkLi.appendChild(removeLink);
	
}

function toggle(n){
	switch(n){
		case "on":
			$("itemForm").style.display = "none";
			$("clearData").style.display = "inline";
			$("displayData").style.display = "none";
			$("stashMore").style.display = "inline"
			break;
		case "off":
			$(forms[0]).style.display = "block";
			$("clearData").style.display = "inline";
			$("displayData").style.display = "inline";
			$(addNew).style.display = "none";
			$("object").style.display = "none";
			break;	
		default:
			return false;
	}
}

function clearItems(){
	if(localStorage.length === 0){
		alert("No items to clear");
	} else {
		localStorage.clear();
		alert("Stash has been cleared");
		window.location.reload();
		return false;
	}
}

function createArchetype(){
	var formArchtype = document.getElementsByTagName(document.forms[0]);
	var	chooseLi = $("archetypeSelect");
	var	createSelect = document.createElement("select");
		createSelect.setAttribute("id", "aGroup");		
	for(var i=0, j=archetype.length; i<j; i++){
		var createOption = document.createElement("option");
		var createText = archetype[i];
		createOption.setAttribute("value", createText);
		createOption.innerHTML = createText;
		createSelect.appendChild(createOption);
	}
	chooseLi.appendChild(createSelect);
}

//Global Variables
var 	archetype = ["--Choose Item Archetype--", "Warrior", "Rogue", "Mage"]
var typeValue,
	typeQuality
;
createArchetype();


//The Call
var submit = $("submit");
submit.addEventListener("click", saveData);
var displayData = $("displayData");
displayData.addEventListener("click", pullData);
var clearData = $("clearData");
clearData.addEventListener("click", clearItems);
});