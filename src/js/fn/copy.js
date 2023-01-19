/*
 * ________________________________________________________________
 * Copyright (C) 2022 FoE-Info - All Rights Reserved
 * this source-code uses a copy-left license
 *
 * you are welcome to contribute changes here:
 * https://github.com/FoE-Info/FoE-Info-Extension
 *
 * AGPL license info:
 * https://github.com/FoE-Info/FoE-Info-Extension/master/LICENSE.md
 * or else visit https://www.gnu.org/licenses/#AGPL
 * ________________________________________________________________
 */
import $ from "jquery";

export function fClipboardCopy() {
	// var selection = window.getSelection();
	// selection.removeAllRanges();
	// var range = document.createRange();
	// var copytext = document.getElementById("clipboardText");
	// range.selectNode(copytext);
	// selection.addRange(range);
	// document.execCommand("copy");
	copyToClipboard('div#clipboardText');
}

export function DonorCopy() {
	// var selection = window.getSelection();
	// selection.removeAllRanges();
	// var range = document.createRange();
	// var copytext = document.getElementById("donorText");
	// range.selectNode(copytext);
	// selection.addRange(range);
	// document.execCommand("copy");
	copyToClipboard('#donorText');
}

export function DonorCopy2() {
	// var selection = window.getSelection();
	// selection.removeAllRanges();
	// var range = document.createRange();
	// var copytext = document.getElementById("donorTextCollapse")
	// //var copytext1 = document.getElementById("donorText1")
	// var numrows = copytext.rows.length;
	// //console.debug(numrows);
	// var row1 = copytext.rows[0];
	// var row2 = copytext.rows[numrows-1];
	// range.setStartBefore(row1);
	// range.setEndAfter(row2);
	// // range.selectNode(copytext);
	// // range.selectNodeContents(copytext);
	// selection.addRange(range);
	// document.execCommand("copy");
	copyToClipboard('div#donorTextCollapse');
}

export function fInvestedCopy() {
	copyToClipboard('div#investedText');
}

export function DonationCopy() {
	var selection = window.getSelection();
	selection.removeAllRanges();
	var range = document.createRange();
	var copytext = document.getElementById("copyText");
	range.selectNode(copytext);
	selection.addRange(range);
	document.execCommand("copy");
	// copyToClipboard('div#copyText');
}

export function fCityStatsCopy() {
	var cityStatsHTML = '';
	var selection = window.getSelection();
	selection.removeAllRanges();
	var range = document.createRange();

	var copytext = document.getElementById("citystatsLabel");
	cityStatsHTML = copytext.innerHTML + '<br>';
	copytext = document.getElementById("citystatsText");
	cityStatsHTML += copytext.innerHTML;
	// console.debug(cityStatsHTML);
	debug.innerHTML = cityStatsHTML;
	range.selectNode(debug);
	selection.addRange(range);
	document.execCommand("copy");
	debug.innerHTML = '';
	// copyToClipboard('div#citystatsText');
}

export function fFriendsCopy() {
	var selection = window.getSelection();
	selection.removeAllRanges();
	var range = document.createRange();
	var copytext = document.getElementById("friendsText2");
	range.selectNode(copytext);
	selection.addRange(range);
	document.execCommand("copy");
	// copyToClipboard('div#friendsText');
}

export function fGuildCopy() {
	var selection = window.getSelection();
	selection.removeAllRanges();
	var range = document.createRange();
	var copytext = document.getElementById("guildText2");
	range.selectNode(copytext);
	selection.addRange(range);
	document.execCommand("copy");
	// copyToClipboard('div#guildText');
}

export function fHoodCopy() {
	var selection = window.getSelection();
	selection.removeAllRanges();
	var range = document.createRange();
	var copytext = document.getElementById("hoodText2");
	range.selectNode(copytext);
	selection.addRange(range);
	document.execCommand("copy");
	// copyToClipboard('div#hoodText');
}

export function BattlegroundCopy() {
	// var selection = window.getSelection();
	// selection.removeAllRanges();
	// var range = document.createRange();
	// var copytext = document.getElementById("gbg-table");
	// // var numrows = copytext.rows.length;
	// // range.setStartBefore(copytext.rows[0]);
	// // range.setEndAfter(copytext.rows[numrows-1]);
	// range.selectNode(copytext);
	// selection.addRange(range);
	// document.execCommand("copy");
	// copyTextToClipboard('#gbg-table');
	let node = document.querySelector('#gbg-table');
	copyNode(node);
}

export function ExpeditionCopy() {
	var selection = window.getSelection();
	selection.removeAllRanges();
	var range = document.createRange();
	var copytext = document.getElementById("expeditionText");
	range.selectNode(copytext);
	selection.addRange(range);
	document.execCommand("copy");
	// copyToClipboard('div#expeditionText');
}

export function TreasuryCopy() {
	var selection = window.getSelection();
	selection.removeAllRanges();
	var range = document.createRange();
	var copytext = document.getElementById("treasurytable");
	range.selectNode(copytext);
	selection.addRange(range);
	document.execCommand("copy");
	//copyToClipboard('#treasurytable > tbody');
	// let node = document.querySelector('#treasurytable');
	// copyNode(node);
}

function copyToClipboard(element) {
	var $temp = $("<textarea>");
	$("body").append($temp);
	var html = $(element).html();
	// if (!element.equals("clipboardText"))
	addToClipboard(element, html);
	html = html.replace(/<br>/g, "\n"); // or \r\n
	html = html.replace(/<\/tr>/g, "\n"); // or \r\n
	html = html.replace(/<p>/g, ""); // or \r\n
	html = html.replace(/<tr>/g, ""); // or \r\n
	html = html.replace(/<td>/g, ""); // or \r\n
	html = html.replace(/<\/td>/g, ""); // or \r\n
	html = html.replace(/<\/p>/g, "\n"); // or \r\n
	html = html.replace(/<\/?span[^>]*>/g,""); // or \r\n
	// html = html.replace(/<\/span>/g, ""); // or \r\n
	console.debug(html);
	$temp.val(html).select();
	document.execCommand("copy");
	$temp.remove();
}

export function genericCopy(name){
	const hideElements = document.getElementsByClassName('hide-copy');
	for (const element of hideElements) 
		element.style.visibility  = 'hidden';
	const wrapElements = document.getElementsByClassName('wrap-copy');
	for (const element of wrapElements) 
		element.innerHTML  = `(${element.innerHTML})`;
	const colonElements = document.getElementsByClassName('colon-copy');
	for (const element of colonElements) 
		element.innerHTML  = `${element.innerHTML}:`;
	const sectElements = document.getElementsByClassName('sect-copy');
	for (const element of sectElements) 
		element.innerHTML  = `${element.innerHTML} sect,`;		
	const goodsElements = document.getElementsByClassName('goods-copy');
	for (const element of goodsElements) 
		element.innerHTML  = `${element.innerHTML} goods`;				

	var copytext = document.getElementById(name);
	// text area method
	let textArea = document.createElement("textarea");
	textArea.value = copytext.innerText.trim().replace(/\t/g, ' ');
	// make the textarea out of viewport
	textArea.style.position = "fixed";
	textArea.style.left = "-999999px";
	textArea.style.top = "-999999px";
	document.body.appendChild(textArea);
	textArea.focus();
	textArea.select();
	new Promise((res, rej) => {
		// here the magic happens
		document.execCommand('copy') ? res() : rej();
		textArea.remove();
	});

	for (const element of goodsElements) 
		element.innerHTML  = element.innerHTML.replace(" goods", "");
	for (const element of sectElements) 
		element.innerHTML  = element.innerHTML.replace(" sect,", "");
	for (const element of colonElements) 
		element.innerHTML  = `${element.innerHTML.slice(0,-1)}`;
	for (const element of wrapElements) 
		element.innerHTML  = `${element.innerHTML.slice(1,-1)}`;
	for (const element of hideElements) 
		element.style.visibility  = 'visible';
}

function addToClipboard(element, html) {
	var clipboard = document.getElementById("clipboard");

	if (clipboard == null) {
		// console.debug('2');
		clipboard = document.createElement('div');
		var content = document.getElementById("content");
		content.appendChild(clipboard);
	}

	clipboard.innerHTML += '<br>' + html;
}

function copyNode(node) {
	let range = document.createRange();
	range.selectNodeContents(node)
	let select = window.getSelection()
	select.removeAllRanges()
	select.addRange(range)
	document.execCommand('copy')
}
