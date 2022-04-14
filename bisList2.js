//item selector
var model = classTypes.dk.blood;
var naxFilter;

function myFunction(event, num) {
    var dropDown = document.getElementById("myDropdown" + num).classList.toggle("show");
    if (dropDown)
        event.target.innerHTML = " V ";
    else
        event.target.innerHTML = " < ";

    var test = event;
    console.log(event.target.innerHTML);
}
//player selecttor
function myFunction2(event, num) {
    var dropDown = document.getElementById("myDropdown" + num).classList.toggle("show");


    var test = event;
    console.log(event.target.innerHTML);
}

function filterValues() {
    naxFilter = document.getElementById('NaxxFilter').value;
}

buildItemTable();

function selectNewClass(event) {
    var classNameData = event.getAttribute('data-class');
    var classSpecData = event.getAttribute('data-spec');

    var classSpec = classTypes[classNameData];
    classSpec = classSpec[classSpecData];
    model = classSpec;
    buildItemTable();
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

    var test = model.head;
    var itemContainerI = 0;
    for (var key in model) {
        var dropDown = document.createElement('div');
        dropDown.classList.add('dropdown');
        var items = model[key];
        var dropItem;
        var itemContainerI = 0;
        var itemCounter = 0;
        for (var i = 0; i < items.length; i++) {
            if (items[i][1] == "Nax" && naxFilter == "true") {
                continue;
            }
            var test2 = items[i];
            if (itemContainerI == 0) { //first item
                dropItem = document.createElement('div');
                dropItem.classList.add('dropitem');
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
    aitem.style.width = "280px";
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
        btn.classList.add('dropbtn');
        btn.setAttribute('onclick', 'myFunction(event,"' + key +'")');
        btn.innerHTML = "<";
        itemListContainer.appendChild(btn);
    } else {
        var aitem = document.createElement('a');
        aitem.style.width = "20px";
        itemListContainer.appendChild(aitem);
    }

}

