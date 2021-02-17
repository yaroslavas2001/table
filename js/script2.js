// Программа с добавлением строки с номерром строки, ФИО, Кнопками редактирования
//С помощью кнопки Добавить передатся ФИО в строку, строку можно редактировать или удалить, во время редактирования можно отменить редактирование или изменить ФИО



// Нахождение в документе тег body
var body=document.getElementsByTagName("body")[0];
//создание элемента <table></table>
var table = document.createElement("table");
//создание элемента <tr></tr>
var row = document.createElement("tr");
// добавление класс со стилями к table
table.classList.add("my");
// добавление id к table
table.id="table";

//создание элемента <td></td>
var td_number = document.createElement('td');
// создание переменной с текстом "№"
var cellText = document.createTextNode("№");
// добавляем текст в td
td_number.appendChild(cellText);
// добавляем td в tr
row.appendChild(td_number);

//создание элемента <td></td>
var td_fio = document.createElement('td');
// создание переменной с текстом "ФИО"
var cellText = document.createTextNode("ФИО");
// добавляем текст в td
td_fio.appendChild(cellText);
// добавляем td в tr
row.appendChild(td_fio);

//создание элемента <td></td>
var td_actions = document.createElement("td");
// создание переменной с текстом "Действия"
var cellText = document.createTextNode("Действия");
// добавляем текст в td
td_actions.appendChild(cellText);
// добавляем td в tr
row.appendChild(td_actions);

// добавляем tr в table
table.appendChild(row);
// добавляем table в body
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

    

    
//Создаем поле для ввода ФИО
var inp= document.createElement("input");
//Добавляем input в body
body.appendChild(inp);

//Создаем элемент <button></button>
var btn=document.createElement("button");
//Добавляем текст в кнопку <button>Добавить</button>
btn.textContent="Добавить"
//Добавляем класс к кнопке btn
btn.classList.add('btn')
//Создаем переменную которая будет индексом
var index =1;
// по клику на кнопку вызываем функцию 
btn.onclick=function(){
      /**
    * объявляем класс
    * @param {*} index индекс сторки
    * @param {*} inp.value текст из строки ввода 
    */
    new People(index,inp.value).CreateHtml()
    // задаем полю ввода "" чтобы стереть старый текст
    inp.value="";
    // увеличиваем индекс на 1
    index+=1;
    //var del = new Promise(function(resolve,reject){
    //    setTimeout(()=>{
    //        resolve(new People(people,inp.value).CreateHtml());
    //    },10)
    //});
    //del.then(function(){
    //    inp.value="";
    //    people+=1;
    //});    
};
// добавляем кнопку в body
body.appendChild(btn);
