var body=document.getElementsByTagName("body")[0];
var table = document.createElement("table"); 
var row = document.createElement("tr");

table.classList.add("my");
// добавление класс со стилями к table

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

//input
var inp= document.createElement("input");
body.appendChild(inp);

// кнопка Добавить
var btn=document.createElement("button");
btn.textContent="Добавить"
btn.classList.add('btn')
btn.onclick=function(){
    text = inp.value;
    alert(text)
};
body.appendChild(btn);