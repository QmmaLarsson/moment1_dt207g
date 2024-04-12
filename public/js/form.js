"use strict";
/*Funktion som kontrollerar inmatningen. Om det som skrivs in i textfältet är kortare än fem tecken kommer ett felmeddelande upp.*/

//Variabler
const courseFormEl = document.getElementById("courseForm");

//Händelselyssnare
courseFormEl.addEventListener("submit", checkInput);

//Funktion
function checkInput(input) {
    const courseCode = document.getElementById("courseCode").value;
    const courseName = document.getElementById("courseName").value;
    const courseUrl = document.getElementById("courseUrl").value;

    if (!courseCode.trim() || !courseName.trim() || !courseUrl.trim()) {
        alert("Fyll i alla fält.");
        input.preventDefault();
    }
}