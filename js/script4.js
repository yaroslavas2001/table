class People {
    constructor(index, text) {
        this.index = index
        this.text = text
    }
    CreateHtml(table) {
        this.TrDisplay = new TrDisplay(this.index, this.text, this.onEdit.bind(this));
        this.TrEdit = new TrEdit(this.index, this.text);
        this.TrEdit.Hidden();
        //this.TrDisplay.SetData(2,"Иванов И.И.")
        table.appendChild(this.TrDisplay.GetElement());
        //table.appendChild(this.TrEdit.GetElement());
        return table
    }
              
    onEdit() {
        this.TrDisplay.Hidden();
        this.TrEdit.Show();
    }
}
class Button {
    constructor(text, onclick) {
        this._btn = document.createElement("button");
        this._btn.textContent = text; 
        this._btn.onclick = onclick;
        return this._btn;
    }
}
class TrDisplay {
    constructor(index, fio, onEdit) {
        this.row = document.createElement("div");
        this.row.className = "row";


        this.cell_number = document.createElement('div');
        this.cell_number.innerHTML = index;
        this.cell_number.className = "cell";
        this.row.appendChild(this.cell_number);

        this.cell_fio = document.createElement('div');
        this.cell_fio.innerHTML = fio;
        this.cell_fio.className = "cell";
        this.row.appendChild(this.cell_fio);

        this.cell_prof = document.createElement("div");

        this.select = document.createElement("select"); 
        this.options = ["","Frontend", "Backend", "Designer", "Tester", "Manager"]; 

        for(var i = 0; i < this.options.length; i++) {
        this.opt = this.options[i];
        this.el = document.createElement("option");
        this.el.textContent = this.opt;
        this.el.value = this.opt;
        this.select.appendChild(this.el)}
        this.cell_prof.appendChild(this.select);
        this.cell_prof.className = "cell";
        this.row.appendChild(this.cell_prof);


        this.cell_actions = document.createElement("div");
        this.cell_actions.className = "cell";
        this.cell_actions.appendChild(new Button("Edit", onEdit));
        this.cell_actions.appendChild(new Button("Remove", this.Remove.bind(this)));
        this.row.appendChild(this.cell_actions);

    }
    SetData(index, fio) {
        this.cell_number.innerHTML = index;
        this.cell_fio.innerHTML = fio;
    }
    Remove(event) {
        this.row.remove();
    }
    Hidden() {
        this.row.hidden = true;
    }
    Show() {
        this.row.hidden = false;
    }
    GetElement() {
        return this.row;
    }
}
// класс для редактирования строки
class TrEdit {

    constructor(index, fio) {
        this.row = document.createElement("div");
        this.row.className = "row";

        //this.row.appendChild(cell);
        this.cell_number = document.createElement('div');
        this.cell_number.innerHTML = index;
        this.cell_number.className = "cell";
        this.row.appendChild(this.cell_number);

        this.fio = fio;
        this.td_fio = document.createElement('td');
        this.inp = document.createElement("input");
        this.td_fio.appendChild(this.inp);
        this.row.appendChild(this.td_fio);

        this.cell_prof = document.createElement("div");

        this.select = document.createElement("select"); 
        this.options = ["","Frontend", "Backend", "Designer", "Tester", "Manager"]; 

        for(var i = 0; i < this.options.length; i++) {
        this.opt = this.options[i];
        this.el = document.createElement("option");
        this.el.textContent = this.opt;
        this.el.value = this.opt;
        this.select.appendChild(this.el)}
        this.cell_prof.appendChild(this.select);
        this.cell_prof.className = "cell";
        this.row.appendChild(this.cell_prof);

        this.cell_actions = document.createElement("td");
        this.cell_actions.className = "cell";
        this.cell_actions.appendChild(new Button("Cansel", this.Edit.bind(this, index)));
        this.cell_actions.appendChild(new Button("Save", this.Remove.bind(this, index)));
        this.row.appendChild(this.cell_actions);
        //console.log(index)
    }
    Edit(index) {
        //console.log(index);
        //this.td_fio.innerHTML=this.fio;
        new People(index, this.fio).CreateHtml()
        this.row.remove();
    }

    Remove(index) {
        //this.td_fio.innerHTML=this.inp.value;
        new People(index, this.inp.value).CreateHtml()
        this.row.remove();
    }
    Hidden() {
        this.row.hidden = true;
    }
    Show() {
        this.row.hidden = false;
    }
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
    _CreateСap(name) {
        var cell = document.createElement("div");
        cell.className = "cell";
        var cellText = document.createTextNode(name);
        cell.appendChild(cellText);
        this.row.appendChild(cell);
    }
    _CreateTable() {
        this.table = document.createElement("div");
        this.table.className = "table";
        this.row = document.createElement("div")
        this.row.className = "row";
        this._CreateСap("№");
        this._CreateСap("ФИО");
        this._CreateСap("Профессия");
        this._CreateСap("Действия");
        this.table.appendChild(this.row);
        return this.table;
    }
    onAddPeole(namePeole) {
        var people = new People(this.Peoples.length, namePeole)
        this.Peoples.push(people);
        people.CreateHtml(this.table);
    }
}
class AddForm {
    constructor() {
    }
    Init(element) {
        this.inp = document.createElement("input");
        element.appendChild(this.inp);

        var btn = document.createElement("button");
        btn.textContent = "Добавить"
        btn.classList.add('btn')
        btn.onclick = this.onClickAddPeople.bind(this);

        element.appendChild(btn);
    }

    onClickAddPeople() {
        if (this.onAddPeole) {
            this.onAddPeole(this.inp.value);
            this.inp.value="";
        }
    }
}


new App(document.getElementsByTagName("body")[0]);