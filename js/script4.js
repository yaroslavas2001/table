class App{
    constructor(element){
        this.Init(element);
    }
    Init(element){
        element.appendChild(this._CreateTable());
        console.log(element)
    }
    _CreateСap(name){
        var cell = document.createElement("div");
        cell.className ="cell";
        var cellText = document.createTextNode(name);
        cell.appendChild(cellText);
        this.row.appendChild(cell);
    }
    _CreateTable(){
        this.table = document.createElement("div");
        this.table.className ="table";
        this.row = document.createElement("div")
        this.row.className ="row";
        this._CreateСap("№");
        this._CreateСap("ФИО");
        this._CreateСap("Действия");
        this._CreateСap("Профессия");
        this.table.appendChild(this.row);
        return this.table;
    }
}



new App(document.getElementsByTagName("body")[0]);