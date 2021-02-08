var a=1;
function getValue(){
    var text1 = document.getElementById("input_form").value;
    var number = document.getElementById("number");
    var fio = document.getElementById("fio");
    number.innerHTML = "1"
    fio.innerHTML = text1;
}
function create(){
    if (a==1){
        var text = document.getElementById("input_form").value;
        var number = document.getElementById("number");
        var br = document.createElement("br");
        var fio = document.getElementById("fio");
        number.innerHTML = "1";
        fio.innerHTML = text;
        fio.appendChild(br);
        a+=1;
        var text = document.getElementById("input_form").value="";
    } 
    else{
        var text = document.getElementById("input_form").value;
        var table = document.querySelector('#table');
        
        var actions=document.getElementById("actions").innerHTML;
        var tr = document.createElement('tr');
        
        var td_number = document.createElement('td');
        var td_fio = document.createElement('td');
        var td_actions = document.createElement("td");
        
        //let td_actions = document.createElement('td');
        
        td_number.innerHTML = a;
        td_fio.innerHTML = text;
        td_actions.innerHTML=actions;

        
        tr.appendChild(td_number);
        tr.appendChild(td_fio);
        tr.appendChild(td_actions);
        
        table.appendChild(tr);
        a+=1;
        var text = document.getElementById("input_form").value="";
        //var newDiv = document.createElement("div");
        //newDiv.innerHTML = "<h1>Привет!</h1>";
        //document.body.insertBefore(newDiv, input_form);
    }
}
function SomeDeleteRowFunction(event) {
// event.target will be the input element.
    var td = event.target.parentNode;
    var tr = td.parentNode; // the row to be removed
    tr.parentNode.removeChild(tr);
}
function red(event){
    var td = event.target.parentNode;
    var tr = td.parentNode; 
    var text1 = tr.childNodes[1];
    var text = document.getElementById("change").value;
    text1.innerHTML = text;
    var text = document.getElementById("change").value="";
    //tr.removeChild(td, text);
}