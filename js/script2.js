var body=document.getElementsByTagName("body")[0];
var table = document.createElement("table"); 
var row = document.createElement("tr");

table.classList.add("my");
table.id="table";
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


class People{
    constructor(index,text){
        this.index=index
        this.text=text
    }
        
    CreateHtml() {
        this.table=document.getElementById("table");
        this.table.classList.add("my");

        this.TrDisplay = new TrDisplay(this.index, this.text, this.onEdit.bind(this));
        this.TrEdit = new TrEdit(this.index, this.text);
        this.TrEdit.Hidden();
        //this.TrDisplay.SetData(2,"Иванов И.И.")
        this.table.appendChild( this.TrDisplay.GetElement());
        this.table.appendChild( this.TrEdit.GetElement());
        
        return this.table
    }    
        
    onEdit(){
        this.TrDisplay.Hidden();
        this.TrEdit.Show();
    }

}
class Button{
    constructor(text, onclick){
        this._btn=document.createElement("button");
        this._btn.textContent=text;
        this._btn.onclick = onclick;
        return this._btn;
    }
}

class TrDisplay{
    constructor(index, fio, onEdit){
        this.row = document.createElement("tr");
            

        this.td_number = document.createElement('td');
            
        this.td_number.innerHTML=index;
        this.row.appendChild(this.td_number);

        this.td_fio = document.createElement('td');
        this.td_fio.innerHTML=fio;
        this.row.appendChild(this.td_fio);

        this.td_actions = document.createElement("td");
        this.td_actions.appendChild(new Button("Edit",onEdit ));
        this.td_actions.appendChild(new Button("Remove",this.Remove.bind(this) ));
        this.row.appendChild(this.td_actions);
            
    }
       
    SetData(index, fio){
        this.td_number.innerHTML=index;
        this.td_fio.innerHTML=fio;
    }
    Remove(event) {
        this.row.remove();     
    }

    Hidden(){
        this.row.hidden = true;
    }
    Show(){
        this.row.hidden = false;
    }
    GetElement(){
        return this.row;
    }
}

class TrEdit{
    constructor(index, fio){
        this.row = document.createElement("tr");
            

        this.td_number = document.createElement('td');
            
        this.td_number.innerHTML=index;
        this.row.appendChild(this.td_number);
        this.fio=fio;
        this.td_fio = document.createElement('td');
        this.inp= document.createElement("input");
        this.td_fio.appendChild(this.inp);
        this.row.appendChild(this.td_fio);

        this.td_actions = document.createElement("td");
        this.td_actions.appendChild(new Button("Cansel",this.Edit.bind(this,index) ));
        this.td_actions.appendChild(new Button("Save",this.Remove.bind(this,index) ));
        this.row.appendChild(this.td_actions);
        //console.log(index)
    }
    /**
    * вавап
    * @param {*} event 
    * @param {*} number 
    */
    Edit(index) {
        //console.log(index);
        //this.td_fio.innerHTML=this.fio;
        new People(index,this.fio).CreateHtml()
        this.row.remove();
    }
    Remove(index) {
        //this.td_fio.innerHTML=this.inp.value;
        new People(index,this.inp.value).CreateHtml()
        this.row.remove();   
    }
    Hidden(){
        this.row.hidden = true;
    }
    Show(){
        this.row.hidden = false;
    }
    GetElement(){
        return this.row;
    }
}

    

    
//input
var inp= document.createElement("input");
body.appendChild(inp);

// кнопка Добавить
var btn=document.createElement("button");
btn.textContent="Добавить"
btn.classList.add('btn')
var people =1;
btn.onclick=function(){
    var del = new Promise(function(resolve,reject){
        setTimeout(()=>{
            resolve(new People(people,inp.value).CreateHtml());
        },10)
    });
    del.then(function(){
        inp.value="";
        people+=1;
    });    
};
body.appendChild(btn);
