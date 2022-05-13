//item selector
var model = classTypes.dk.Blood;
var initClass = "dk";
var naxFilter, uldarFilter, tocFilter,
    voaFilter, onyxiaFilter, obsidianFilter,
    eoeFilter, iccFilter, rubysanctumFilter
filter10, filter25, preRaidFilter;

var icon = document.createElement('span');
icon.classList.add('material-icons-outlined');
function myFunction(event, num, rowId) {
    var dropDown = document.getElementById("myDropdown" + num);

    if (rowId)
        event = document.getElementById(rowId);
    else {
        event.stopPropagation();
        event = event.target;
    }

    if (dropDown == null)
        return

    dropDown.classList.toggle("show");
    if (dropDown.classList.contains("show")) {
        event.removeAttribute("class");
        event.classList.add('dropbtn', 'fa-solid', 'fa-chevron-down');

    }
    else {
        event.removeAttribute("class");
        event.classList.add('dropbtn', 'fa-solid', 'fa-chevron-left');
    }
}

//player selector
function myFunction2(event, num) {
    document.getElementById("myDropdown" + num).classList.toggle("show");
}

function filterValues() {
    preRaidFilter = document.getElementById('preRaidFilter').value;
    naxFilter = document.getElementById('naxFilter').value;
    voaFilter = document.getElementById('voaFilter').value;
    onyxiaFilter = document.getElementById('onyxiaFilter').value;
    obsidianFilter = document.getElementById('obsidianFilter').value;
    eoeFilter = document.getElementById('eoeFilter').value;
    uldaerFiler = document.getElementById('uldarFilter').value;
    tocFilter = document.getElementById('tocFilter').value;
    iccFilter = document.getElementById('iccFilter').value;
    rubysanctumFilter = document.getElementById('rubysanctumFilter').value;

    filter10 = document.getElementById('filter10').value;
    filter25 = document.getElementById('filter25').value;

}


function selectNewClass(event) {

    var classNameData = event.getAttribute('data-class');
    var classSpecData = event.getAttribute('data-spec');

    document.getElementById('playerSelectTitle').innerHTML = event.innerHTML;
    var classSpec = classTypes[classNameData];

    classSpec = classSpec[classSpecData];
    model = classSpec;
    buildItemTable(true);
    setSpecDropDown(classNameData);
}


function selectNewspec(event) {

    var classNameData = event.getAttribute('data-class');
    var classSpecData = event.getAttribute('data-spec');

    document.getElementById('specSelectTitle').innerHTML = event.innerHTML;

    var classSpec = classTypes[classNameData];
    classSpec = classSpec[classSpecData];
    model = classSpec;
    buildItemTable(true);
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
    a.innerHTML = Object.keys(classType)[1];
    a.id = "specSelectTitle";

    for (var i = 1; i < index; i++) {
        if (i == 1) {
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
    buildItemTable(true);
}

function buildItemTable(rebuild) {

    var table = document.getElementById('itemTable');
    table.innerHTML = "";
    var strippedCounter = 0;

    var itemContainerI = 0;
    for (var key in model) {
        if (key == "image")
            continue;
        var dropDown = document.createElement('div');
        dropDown.classList.add('dropdown');
        var items = model[key];
        var dropItem;
        var itemContainerI = 0;
        var itemCounter = 0;
        var filteredList = filter(items);

        for (var i = 0; i < filteredList.length; i++) {

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
            createItem(itemListContainer, filteredList[i], key, itemCounter);
            dropItem.appendChild(itemListContainer);
            dropDown.appendChild(dropItem)
            table.appendChild(dropDown);
            itemCounter++;

        }
        strippedCounter++
    }
    if (rebuild) {
        $WowheadPower.init();
        $WowheadPower.refreshLinks();
    }

}

function filter(itemList) {
    var filteredList = [];

    for (var i = 0; i < itemList.length; i++) {

        if (naxFilter != null && itemList[i][1] == "Nax" && naxFilter == "false") {
            continue;
        }

        if (preRaidFilter != null && itemList[i][1] == "Pre-Raid" && preRaidFilter == "false") {
            continue;
        }

        if (voaFilter != null && itemList[i][1] == "VoA" && voaFilter == "false") {
            continue;
        }

        if (onyxiaFilter != null && itemList[i][1] == "Onyxia" && onyxiaFilter == "false") {
            continue;
        }

        if (obsidianFilter != null && itemList[i][1] == "Obsidian" && obsidianFilter == "false") {
            continue;
        }

        if (eoeFilter != null && itemList[i][1] == "EoE" && eoeFilter == "false") {
            continue;
        }
        if (uldaerFiler != null && itemList[i][1] == "Ulduar" && uldaerFiler == "false") {
            continue;
        }
        if (tocFilter != null && itemList[i][1] == "ToC" && tocFilter == "false") {
            continue;
        }
        if (iccFilter != null && itemList[i][1] == "ICC" && iccFilter == "false") {
            continue;
        }
        if (rubysanctumFilter != null && itemList[i][1] == "Ruby Sanctum" && rubysanctumFilter == "false") {
            continue;
        }
        else if ((filter10 && itemList[i][2] == 10 && filter10 == "false") ||
            (filter25 && itemList[i][2] == 25 && filter25 == "false")) {
            continue;
        }
        else {
            filteredList.push(itemList[i]);
        }
    }

    return filteredList;
}

function createItem(itemListContainer, item, key, i) {



    /*Slot*/
    var aitem = document.createElement('a');
    aitem.innerHTML = key;
    aitem.style.minWidth = "60px";
    itemListContainer.appendChild(aitem);

    /*Item icon*/
    var aitem = document.createElement('div');
    var iconPath = "url('Images/Icons/" + searchCache(item[0]) + ".jpg')";
    //aitem.innerHTML = searchCache(item[0]);
    aitem.style.backgroundImage = iconPath;
    aitem.style.width = "64px";
    aitem.style.height = "64px";
    aitem.style.backgroundSize = "46px";
    aitem.style.backgroundRepeat = "no-repeat";
    itemListContainer.appendChild(aitem);

    /*ToolTip*/
    var aitem = document.createElement('a');
    aitem.href = "#";
    aitem.rel = "item=" + item[0];
    aitem.innerHTML = "";
    aitem.style.width = "250px";
    aitem.classList.add("anon");

    itemListContainer.appendChild(aitem);

    /*Raid*/
    var aitem = document.createElement('a');
    aitem.innerHTML = item[1] ?? "";
    aitem.style.width = "20px";
    itemListContainer.appendChild(aitem);
    /*Raid Size*/
    var aitem = document.createElement('a');
    aitem.innerHTML = item[2] ?? "";
    aitem.style.width = "20px";
    itemListContainer.appendChild(aitem);
    /*Heroic?*/
    var aitem = document.createElement('a');
    aitem.innerHTML = item[3] ?? "";
    aitem.style.width = "20px";
    itemListContainer.appendChild(aitem);
    /*Boss*/
    var aitem = document.createElement('a');
    aitem.innerHTML = item[4] ?? searchItemSource(item[0]) ?? "";
    aitem.style.width = "140px";
    aitem.style.fontSize = "12px";
    itemListContainer.appendChild(aitem);
    if (i == 0) {
        var btn = document.createElement('button');
        btn.classList.add('dropbtn', 'fa-solid', 'fa-chevron-left');
        btn.setAttribute('onclick', 'myFunction(event,"' + key + '")');
        btn.id = "dropDown" + key + "" + i;
        itemListContainer.setAttribute('onclick', 'myFunction(event,"' + key + '","' + btn.id + '")');
        itemListContainer.appendChild(btn);
        itemListContainer.style.cursor = "pointer";
    } else {
        var aitem = document.createElement('a');
        aitem.style.width = "20px";
        itemListContainer.appendChild(aitem);
    }

    //Tooltip
    if (item[5]) {
        itemListContainer.classList.add('tooltipCustom');
        var tooltipSpan = itemListContainer.appendChild(document.createElement('span'));
        tooltipSpan.classList.add('tooltipCustomtext');
        tooltipSpan.id = "" + key + "" + i;
        var toolTipHeader = tooltipSpan.appendChild(document.createElement('h3'));
        toolTipHeader.innerHTML = "Notes:";
        var p = tooltipSpan.appendChild(document.createElement('p'));
        p.innerHTML = item[5];
    }
}


/*Finds the items icon*/
function searchCache(id) {

    for (var i = 0; i < itemsCache.ArrayOfItem.Item.length; i++) {
        if (itemsCache.ArrayOfItem.Item[i].Id == id) {
            return itemsCache.ArrayOfItem.Item[i].IconPath;
        }
    }
}

/*Finds loot from boss*/
function searchItemSource(id) {

    for (var i = 0; i < itemSource.dictionary.item.length; i++) {

        // Finds matching item
        if (itemSource.dictionary.item[i].key.string == id) {

            // Finds boss loot item
            if (itemSource.dictionary.item[i].value.ArrayOfItemLocation.ItemLocation[0].Boss != null)
                return itemSource.dictionary.item[i].value.ArrayOfItemLocation.ItemLocation[0].Boss;

            // 
            else if (itemSource.dictionary.item[i].value.ArrayOfItemLocation.ItemLocation[0].TokenMap != null) {
                if (itemSource.dictionary.item[i].value.ArrayOfItemLocation.ItemLocation[0].TokenMap.item.key != null) {
                    if (itemSource.dictionary.item[i].value.ArrayOfItemLocation.ItemLocation[1].Boss != null) {
                        return itemSource.dictionary.item[i].value.ArrayOfItemLocation.ItemLocation[1].Boss;
                    }
                    return itemSource.dictionary.item[i].value.ArrayOfItemLocation.ItemLocation[0].TokenMap.item.key.string;
                }
            }
            else if (itemSource.dictionary.item[i].value.ArrayOfItemLocation.ItemLocation[0].Quest != null) {
                return itemSource.dictionary.item[i].value.ArrayOfItemLocation.ItemLocation[0].Quest;
            }
            else if (itemSource.dictionary.item[i].value.ArrayOfItemLocation.ItemLocation[0].Container != null) {
                return itemSource.dictionary.item[i].value.ArrayOfItemLocation.ItemLocation[0].Container;
            }
            else if (itemSource.dictionary.item[i].value.ArrayOfItemLocation.ItemLocation[0].Skill != null) {
                return itemSource.dictionary.item[i].value.ArrayOfItemLocation.ItemLocation[0].Skill;
            }
        }
    }
}