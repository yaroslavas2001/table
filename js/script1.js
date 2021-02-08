var body=document.getElementsByTagName("body")[0];
var table = document.createElement("table");
var tblBody = document.createElement("tbody");
var row = document.createElement("tr");

table.style.width  = '600px';
table.style.border = '1px solid #e7c6ff';
table.style.backgroundColor="#ffd6ff";

var td_number = document.createElement('td');
var cellText = document.createTextNode("№");
td_number.appendChild(cellText);
row.appendChild(td_number);


var td_fio = document.createElement('td');
var cellText = document.createTextNode("ФИО");
td_fio.appendChild(cellText);
row.appendChild(td_fio);

var td_actions = document.createElement("td");
var cellText = document.createTextNode("Действия");
td_actions.appendChild(cellText);
row.appendChild(td_actions);

table.appendChild(row);
body.appendChild(table);

