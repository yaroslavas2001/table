
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
            this.row = document.createElement("tr");
            this.table.classList.add("my");

            this.td_number = document.createElement('td');
            
            this.td_number.innerHTML=this.index;
            this.row.appendChild(this.td_number);

            this.td_fio = document.createElement('td');
            this.td_fio.innerHTML=this.text;
            this.row.appendChild(this.td_fio);

            this.td_actions = document.createElement("td");
            this.btn_red=document.createElement("button");
            this.btn_red.textContent="Редактировать";
            this.btn_red.id="red"
            this.td_actions.appendChild(this.btn_red);


            this.btn_del=document.createElement("button");
            this.btn_del.textContent="Удалить";
            this.btn_del.id="del"
            this.btn_del.classList.add("del");
           //this.btn_del.onclick=this.SomeDeleteRowFunction();
            this.td_actions.appendChild(this.btn_del);

        

            this.row.appendChild(this.td_actions);

            this.table.appendChild(this.row);
            return this.table
        }
        SomeDeleteRowFunction() {
            this.row.parentNode.removeChild(this.row);
            // event.target will be the input element.
            // this.td = this.event.parentNode;
            //  this.tr = this.td.parentNode; // the row to be removed
            //  this.tr.parentNode.removeChild(this.tr);
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
        //text = inp.value;
        
       
        var del = new Promise(function(resolve,reject){
            setTimeout(()=>{
                resolve(new People(people,inp.value).CreateHtml());
            },10)
        });
        del.then(function(){
            inp.value="";
            people+=1;
            new People.SomeDeleteRowFunction();
        });
       
    };
    body.appendChild(btn);


    //var del=document.getElementById("del");
    //del.onclick=function(){
      //  People.SomeDeleteRowFunction(2);
    //};
    
   //console.log(document.querySelectorAll("tr").length);
