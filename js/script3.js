
class People {
    // инициализация index и text
    constructor(index, text) {
        this.index = index
        this.text = text
    }
    CreateHtml(table) {
        this.TrDisplay = new TrDisplay(this.index, this.text, this.onEdit.bind(this));
        table.appendChild(this.TrDisplay.GetElement());

        this.TrEdit = new TrEdit(this.index, this.text);
        this.TrEdit.Hidden();
        //this.TrDisplay.SetData(2,"Иванов И.И.")
        table.appendChild(this.TrEdit.GetElement());
        // возвращаем table
        return table
    }        
    onEdit() {
        this.TrDisplay.Hidden();
        this.TrEdit.Show();
    }
}
// класс для создания кнопок
class Button {
    //инициализация text и функции при клике
    constructor(text, onclick) {
        //создание элемента <button></button>
        this._btn = document.createElement("button");
        //добавление текста элементу <button>text</button>
        this._btn.textContent = text;
        // функция при клике будет фунция которая была проинициализированна 
        this._btn.onclick = onclick;
        // возвращение кнопки
        return this._btn;
    }
}
// класс для создания строки
class TrDisplay {
    constructor(index, fio, onEdit) {
        // создание tr
        this.row = document.createElement("tr");

        //столбец с номером
        this.td_number = document.createElement('td');
        this.td_number.innerHTML = index;
        this.row.appendChild(this.td_number);

        //столбец с ФИО
        this.td_fio = document.createElement('td');
        this.td_fio.innerHTML = fio;
        this.row.appendChild(this.td_fio);

        //столбец с кнопками
        this.td_actions = document.createElement("td");
        this.td_actions.appendChild(new Button("Edit", onEdit));
        this.td_actions.appendChild(new Button("Remove", this.Remove.bind(this)));
        this.row.appendChild(this.td_actions);

    }
    /**
        * Метод для получения текста index и fio
        * @param {index} index строки
        * @param {fio} fio строки
        */
    SetData(index, fio) {
        this.td_number.innerHTML = index;
        this.td_fio.innerHTML = fio;
    }
    //метод для удаления строки
    Remove(event) {
        this.row.remove();
    }
    //метод для скрытия строки
    Hidden() {
        this.row.hidden = true;
    }
    //метод для показа строки
    Show() {
        this.row.hidden = false;
    }
    //метод возращающий строку
    GetElement() {
        return this.row;
    }
}
// класс для редактирования строки
class TrEdit {
    constructor(index, fio) {
        //создание tr
        this.row = document.createElement("tr");

        //столбец с номером
        this.td_number = document.createElement('td');
        this.td_number.innerHTML = index;
        this.row.appendChild(this.td_number);

        //столбец с ФИО
        this.fio = fio;
        this.td_fio = document.createElement('td');
        // поле ввода для нового знаения
        this.inp = document.createElement("input");
        this.td_fio.appendChild(this.inp);
        this.row.appendChild(this.td_fio);

        this.td_actions = document.createElement("td");
        //кнопка для отмены сохранения, вернет в конце таблице редактируемую строку
        this.td_actions.appendChild(new Button("Cansel", this.Edit.bind(this, index)));
        //кнопка для сохранения, вернет в конце таблице редактируемую строку
        this.td_actions.appendChild(new Button("Save", this.Remove.bind(this, index)));
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
        new People(index, this.fio).CreateHtml()
        this.row.remove();
    }
    /**
    *Метод который создает элемент со старым индексом и новым текстом
    * @param {*} index строки
    */
    Remove(index) {
        //this.td_fio.innerHTML=this.inp.value;
        new People(index, this.inp.value).CreateHtml()
        this.row.remove();
    }
    // метод для скрытия строки
    Hidden() {
        this.row.hidden = true;
    }
    // метод для показа строки
    Show() {
        this.row.hidden = false;
    }
    // метод возвращающий строку
    GetElement() {
        return this.row;
    }
}
class App {

    constructor(element) {
        this.Peoples = new Array();
        this.AddForm = new AddForm();
        this.Init(element);
    }

    Init(element) {
        element.appendChild(this._CreateTable());
        this.AddForm.Init(element);
        this.AddForm.onAddPeole = this.onAddPeole.bind(this);
    }
    onAddPeole(namePeole) {
        var people = new People(this.Peoples.length, namePeole)
        this.Peoples.push(people);
        people.CreateHtml(this.table);
    }
    /**
     * 
     */
    _CreateTd(name) {
        var td = document.createElement('td');
        var cellText = document.createTextNode(name);
        td.appendChild(cellText);
        this.row.appendChild(td);
    }
    _CreateTable() {
        this.table = document.createElement("table");
        this.row = document.createElement("tr");
        this.table.className ="my";
        this._CreateTd("№");
        this._CreateTd("ФИО");
        this._CreateTd("Действия")
        this.table.appendChild(this.row);
        return this.table;
    }
}
class AddForm {
    constructor() {

    }
    Init(body) {
        this.inp = document.createElement("input");
        body.appendChild(this.inp);

        var btn = document.createElement("button");
        btn.textContent = "Добавить"
        btn.classList.add('btn')
        btn.onclick = this.onClickAddPeople.bind(this);
        body.appendChild(btn);
    }

    onClickAddPeople() {


        if (this.onAddPeole) {
            this.onAddPeole(this.inp.value);
        }

    }

}
new App(document.getElementsByTagName("body")[0]);