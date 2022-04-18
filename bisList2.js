//item selector
var model = classTypes.dk.Blood;
var initClass = "dk";
var naxFilter;

var icon = document.createElement('span');
icon.classList.add('material-icons-outlined');
function myFunction(event, num) {
    var dropDown = document.getElementById("myDropdown" + num).classList.toggle("show");
    if (dropDown) {
        event.target.removeAttribute("class");
        event.target.classList.add('dropbtn', 'fa-solid', 'fa-chevron-down');

    }
    else {
        event.target.removeAttribute("class");
        event.target.classList.add('dropbtn', 'fa-solid', 'fa-chevron-left');
    }
    console.log(event.target.innerHTML);
}

//player selector
function myFunction2(event, num) {
    document.getElementById("myDropdown" + num).classList.toggle("show");
}

function filterValues() {
    naxFilter = document.getElementById('NaxxFilter').value;
}


function selectNewClass(event) {

    var classNameData = event.getAttribute('data-class');
    var classSpecData = event.getAttribute('data-spec');

    document.getElementById('playerSelectTitle').innerHTML = event.innerHTML;
    var classSpec = classTypes[classNameData];

    classSpec = classSpec[classSpecData];
    model = classSpec;
    buildItemTable();
    setSpecDropDown(classNameData);
}


function selectNewspec(event) {

    var classNameData = event.getAttribute('data-class');
    var classSpecData = event.getAttribute('data-spec');

    document.getElementById('specSelectTitle').innerHTML = event.innerHTML;

    var classSpec = classTypes[classNameData];
    classSpec = classSpec[classSpecData];
    model = classSpec;
    buildItemTable();
}

function setSpecDropDown(classNameData) {
    var specList = document.getElementById('specList');
    specList.innerHTML = "";
    var itemDearder;
    const classType = classTypes[classNameData];
    var index = Object.keys(classType).length;

    itemDearder = specList.appendChild(document.createElement('div'));
    itemDearder.classList.add('dropitem', 'filterDropDown');
    var itemContainer = itemDearder.appendChild(document.createElement('div'));
    itemContainer.classList.add('container', 'space-between');
    var a = itemContainer.appendChild(document.createElement('a'));
    a.setAttribute('data-class', Object.keys(classType)[i]);
    a.innerHTML = Object.keys(classType)[0];
    a.id = "specSelectTitle";

    for (var i = 0; i < index; i++) {
        if (i == 0) {
            itemDearder = specList.appendChild(document.createElement('div'));
            itemDearder.classList.add('dropdown-content');
            itemDearder.id = "myDropdown4";
            itemDearder.classList.add('dropDownSelectList');
        }

        var itemContainer = itemDearder.appendChild(document.createElement('div'));
        itemContainer.classList.add('itemSelectBtn');
        itemContainer.setAttribute('onclick', 'selectNewspec(this)');
        itemContainer.setAttribute('data-spec', Object.keys(classType)[i]);
        itemContainer.setAttribute('data-class', classNameData);

        var a = itemContainer.appendChild(document.createElement('a'));
        a.innerHTML = Object.keys(classType)[i];

    }
}

function setFilters(event) {
    var value = event.value;
    if (value == "true")
        event.value = false;
    else
        event.value = true;
    filterValues();
    buildItemTable();
}

function buildItemTable() {

    var table = document.getElementById('itemTable');
    table.innerHTML = "";
    var strippedCounter = 0;

    var itemContainerI = 0;
    for (var key in model) {
        var dropDown = document.createElement('div');
        dropDown.classList.add('dropdown');
        var items = model[key];
        var dropItem;
        var itemContainerI = 0;
        var itemCounter = 0;
        for (var i = 0; i < items.length; i++) {
            if (items[i][1] == "Nax" && naxFilter == "false") {
                continue;
            }
            if (itemContainerI == 0) { //first item
                dropItem = document.createElement('div');
                dropItem.classList.add('dropitem');
                if (strippedCounter % 2)
                    dropItem.style.backgroundColor = " #262626";
                else
                    dropItem.style.backgroundColor = " #3e3e3e";

                itemContainerI++;
            }
            else if (itemContainerI == 1) {//second item onwards
                dropItem = document.createElement('div');
                dropItem.classList.add('dropdown-content');
                dropItem.id = "myDropdown" + key;
                itemContainerI++;
            }

            var itemListContainer = document.createElement('div');

            itemListContainer.classList.add('container', 'space-between');
            createItem(itemListContainer, items[i], key, itemCounter);
            dropItem.appendChild(itemListContainer);
            dropDown.appendChild(dropItem)
            table.appendChild(dropDown);
            itemCounter++;

        }
        strippedCounter++
    }
    $WowheadPower.refreshLinks();
}

function createItem(itemListContainer, item, key, i) {
    var aitem = document.createElement('a');
    aitem.innerHTML = key;
    aitem.style.width = "20px";
    itemListContainer.appendChild(aitem);
    var aitem = document.createElement('a');
    aitem.href = "#";
    aitem.rel = "item=" + item[0];
    aitem.innerHTML = "";
    aitem.style.width = "250px";
    itemListContainer.appendChild(aitem);
    var aitem = document.createElement('a');
    aitem.innerHTML = item[1];
    aitem.style.width = "20px";
    itemListContainer.appendChild(aitem);
    var aitem = document.createElement('a');
    aitem.innerHTML = item[2];
    aitem.style.width = "20px";
    itemListContainer.appendChild(aitem);
    var aitem = document.createElement('a');
    aitem.innerHTML = item[3];
    aitem.style.width = "20px";
    itemListContainer.appendChild(aitem);
    var aitem = document.createElement('a');
    aitem.innerHTML = item[4];
    aitem.style.width = "20px";
    itemListContainer.appendChild(aitem);
    if (i == 0) {
        var btn = document.createElement('button');
        btn.classList.add('dropbtn', 'fa-solid', 'fa-chevron-left');
        btn.setAttribute('onclick', 'myFunction(event,"' + key + '")');
        itemListContainer.appendChild(btn);
    } else {
        var aitem = document.createElement('a');
        aitem.style.width = "20px";
        itemListContainer.appendChild(aitem);
    }

}

//On page load
setSpecDropDown(initClass);
buildItemTable();