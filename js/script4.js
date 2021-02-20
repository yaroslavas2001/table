class App {
    constructor(element) {
        this.AddForm = new AddForm();
        this.Init(element);
    }
    Init(element) {
        element.appendChild(this._CreateTable());
        this.AddForm.Init(element);
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
}
class AddForm {
    constructor() {
    }
    Init(element) {
        var inp = document.createElement("input");
        element.appendChild(inp);

        var btn = document.createElement("button");
        btn.textContent = "Добавить"
        btn.classList.add('btn')
        btn.onclick = this.onClickAddPeople.bind(this);
        element.appendChild(btn);
    }

    onClickAddPeople() {
        if (this.onAddPeole) {
            this.onAddPeole(this.inp.value);
        }
    }
}


new App(document.getElementsByTagName("body")[0]);