class People {
    constructor(index, text,value) {
        this.index = index
        this.text = text
        this.value=value
    }
    CreateHtml(table) {
        this.TrDisplay = new TrDisplay(this.index, this.text,this.value);
        table.appendChild(this.TrDisplay.GetElement());
        return table
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
    constructor(index, fio,value) {
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
        this.select.addEventListener("change",this.Aalert.bind(this));
        this.options = ["","Frontend", "Backend", "Designer", "Tester", "Manager"]; 

        for(var i = 0; i < this.options.length; i++) {   
            this.opt = this.options[i];
            this.el = document.createElement("option");
            this.el.textContent = this.opt;
            this.el.value = this.opt;
            this.select.appendChild(this.el)
        }
        if (value === '') {
            this.select[0].selected = true;
        }
        if (value === 'Frontend') {
            this.select[1].selected = true;
        }
        if (value === 'Backend') {
            this.select[2].selected = true;
        }
        if (value === 'Designer') {
            this.select[3].selected = true;
        }
        if (value === 'Tester') {
            this.select[4].selected = true;
        }
        if (value === 'Manager') {
            this.select[5].selected = true;
        }
        this.cell_prof.appendChild(this.select);
        this.cell_prof.className = "cell";
        this.row.appendChild(this.cell_prof);

        this.cell_actions = document.createElement("div");
        this.cell_actions.className = "cell";
        this.cell_actions.appendChild(new Button("Edit", this.Edit.bind(this)));
        this.cell_actions.appendChild(new Button("Remove", this.Remove.bind(this)));
        this.row.appendChild(this.cell_actions);
        
        this.set= [this.cell_fio.innerHTML,this.select.value]
        localStorage.setItem(index,this.set);
        //console.log(localStorage.length);

    }
    Aalert(){
        this.set= [this.cell_fio.innerHTML,this.select.value]
        console.log(this.cell_number.innerHTML)
        localStorage.setItem(this.cell_number.innerHTML,this.set);
    }
    Edit(){
        this.input = document.createElement("input");
        this.input.value = this.cell_fio.innerHTML;
        this.fio=this.cell_fio.innerHTML;
        this.cell_fio.innerHTML="";
        this.cell_fio.appendChild(this.input);
        this.cell_actions.innerHTML="";
        this.cell_actions.appendChild(new Button("Save", this.Save.bind(this)));
        this.cell_actions.appendChild(new Button("Cansel", this.Cansel.bind(this)));
    }
    SetData(index, fio) {
        this.cell_number.innerHTML = index;
        this.cell_fio.innerHTML = fio;
    }
    Remove() {
        localStorage.removeItem(this.cell_number.innerHTML)
        this.row.remove();  
    }
    Save(){
        this.cell_fio.innerHTML="";
        this.cell_fio.innerHTML=this.input.value;
        this.set= [this.cell_fio.innerHTML,this.select.value]
        localStorage.setItem(this.cell_number.innerHTML,this.set)
        this.cell_actions.innerHTML="";
        this.cell_actions.appendChild(new Button("Edit", this.Edit.bind(this)));
        this.cell_actions.appendChild(new Button("Remove", this.Remove.bind(this)));
    }
    Cansel(){
        this.cell_fio.innerHTML="";
        this.cell_fio.innerHTML=this.fio;
        this.cell_actions.innerHTML="";
        this.cell_actions.appendChild(new Button("Edit", this.Edit.bind(this)));
        this.cell_actions.appendChild(new Button("Remove", this.Remove.bind(this)));
    }
    GetElement() {
        return this.row;
    }
}
// класс для редактирования строки
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
        this.onload();
        return this.table;
    }
    onAddPeole(namePeole) {
        i=1
        /// нумерация
        if(localStorage.length>0){
            var values = [],
            keys = Object.keys(localStorage),
            i = keys.length;
            for(var u=0;u<i;u++){
                keys[u]=parseInt(keys[u]);
            }
            keys.sort(function (a, b) {
                return a-b; 
            })
            // sort сортирует как строки
            console.log(keys)
            this.index=parseInt(keys[i-1])+1;
            var people = new People(this.index, namePeole)
            this.Peoples.push(people);
            people.CreateHtml(this.table);

        }else{
            var people = new People(i, namePeole)
            this.Peoples.push(people);
            people.CreateHtml(this.table);
            i+=1;
        }
        
    }
    onload(){
        if (localStorage.length>0){
            var obj= {},
            keys = Object.keys(localStorage),
            i = keys.length;
            for(var u=0;u<i;u++){
                keys[u]=parseInt(keys[u]);
            }
            keys.sort(function (a, b) {
                return a-b; 
            })
            for(var t=0;t<i;t++ ){
                obj[keys[t]]=localStorage.getItem(keys[t]);
            }
            for (var j=0; j <i; j++) {
                if (obj[keys[j]].split(",").length==2){
                    console.log(obj[keys[j]].split(",")[0])
                    console.log(obj[keys[j]].split(",")[1])
                    var people = new People(keys[j],obj[keys[j]].split(",")[0],obj[keys[j]].split(",")[1]);
                    this.Peoples.push(people);
                    people.CreateHtml(this.table);
                }else{
                    var people = new People(keys[j],obj[keys[j]],"");
                    this.Peoples.push(people);
                    people.CreateHtml(this.table);
                }
            }
        }
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