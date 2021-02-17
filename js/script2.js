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
    // инициализация index и text
    constructor(index,text){
        this.index=index
        this.text=text
    }
     /**
    * метод для создание строки
    * @return {this.table} возращает таблицу
    */
    CreateHtml() {
        // Нахождение в документе тег table
        this.table=document.getElementById("table");
        // добавление класс со стилями к table
        this.table.classList.add("my");

        /**
        * Объявление класса TrDisplay
        * @param {this.index} index строки
        * @param {this.text} text строки
        * @param {this.onEdit} вызывает метод onEdit
        * @return {this.row} возращает строку
        */
        this.TrDisplay = new TrDisplay(this.index, this.text, this.onEdit.bind(this));
         /**
        * Объявление класса TrEdit
        * @param {this.index} index строки
        * @param {this.text} text строки
        * @return {this.row} возращает строку
        */
        this.TrEdit = new TrEdit(this.index, this.text);
        //скрываем вызванный класс
        this.TrEdit.Hidden();
        //this.TrDisplay.SetData(2,"Иванов И.И.")
        //добавляем созданную строку в таблицу
        this.table.appendChild( this.TrDisplay.GetElement());
        //добавляем состояние редактирования в таблицу
        this.table.appendChild( this.TrEdit.GetElement());
        // возвращаем table
        return this.table
    }
    // метод для скрытия класса          
    onEdit(){
        this.TrDisplay.Hidden();
        this.TrEdit.Show();
    }
}
// класс для создания кнопок
class Button{
    //инициализация text и функции при клике
    constructor(text, onclick){
        //создание элемента <button></button>
        this._btn=document.createElement("button");
        //добавление текста элементу <button>text</button>
        this._btn.textContent=text;
        // функция при клике будет фунция которая была проинициализированна 
        this._btn.onclick = onclick;
        // возвращение кнопки
        return this._btn;
    }
}
// класс для создания строки
class TrDisplay{
     /**
        * Инициализация index, fio, onEdit
        * @param {this.index} index строки
        * @param {this.fio} fio строки
        * @param {this.onEdit} передает метод onEdit
        */
    constructor(index, fio, onEdit){
        // создание tr
        this.row = document.createElement("tr");
            
        //столбец с номером
        this.td_number = document.createElement('td');    
        this.td_number.innerHTML=index;
        this.row.appendChild(this.td_number);

        //столбец с ФИО
        this.td_fio = document.createElement('td');
        this.td_fio.innerHTML=fio;
        this.row.appendChild(this.td_fio);

        //столбец с кнопками
        this.td_actions = document.createElement("td");
        this.td_actions.appendChild(new Button("Edit",onEdit ));
        this.td_actions.appendChild(new Button("Remove",this.Remove.bind(this) ));
        this.row.appendChild(this.td_actions);
            
    }
    /**
        * Метод для получения текста index и fio
        * @param {index} index строки
        * @param {fio} fio строки
        */
    SetData(index, fio){
        this.td_number.innerHTML=index;
        this.td_fio.innerHTML=fio;
    }
    //метод для удаления строки
    Remove(event) {
        this.row.remove();     
    }
    //метод для скрытия строки
    Hidden(){
        this.row.hidden = true;
    }
    //метод для показа строки
    Show(){
        this.row.hidden = false;
    }
    //метод возращающий строку
    GetElement(){
        return this.row;
    }
}
// класс для редактирования строки
class TrEdit{
        /**
        * Инициализация index, fio
        * @param {this.index} index строки
        * @param {this.fio} fio строки
        */
    constructor(index, fio){
        //создание tr
        this.row = document.createElement("tr");
         
        //столбец с номером
        this.td_number = document.createElement('td'); 
        this.td_number.innerHTML=index;
        this.row.appendChild(this.td_number);

        //столбец с ФИО
        this.fio=fio;
        this.td_fio = document.createElement('td');
        // поле ввода для нового знаения
        this.inp= document.createElement("input");
        this.td_fio.appendChild(this.inp);
        this.row.appendChild(this.td_fio);

        this.td_actions = document.createElement("td");
        //кнопка для отмены сохранения, вернет в конце таблице редактируемую строку
        this.td_actions.appendChild(new Button("Cansel",this.Edit.bind(this,index) ));
        //кнопка для сохранения, вернет в конце таблице редактируемую строку
        this.td_actions.appendChild(new Button("Save",this.Remove.bind(this,index) ));
        this.row.appendChild(this.td_actions);
        //console.log(index)
    }
    /**
    *Метод который создает элемент со старым индексом и текстом
    * @param {*} index строки
    */
    Edit(index) {
        //console.log(index);
        //this.td_fio.innerHTML=this.fio;
        new People(index,this.fio).CreateHtml()
        this.row.remove();
    }
    /**
    *Метод который создает элемент со старым индексом и новым текстом
    * @param {*} index строки
    */
    Remove(index) {
        //this.td_fio.innerHTML=this.inp.value;
        new People(index,this.inp.value).CreateHtml()
        this.row.remove();   
    }
    // метод для скрытия строки
    Hidden(){
        this.row.hidden = true;
    }
    // метод для показа строки
    Show(){
        this.row.hidden = false;
    }
    // метод возвращающий строку
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
