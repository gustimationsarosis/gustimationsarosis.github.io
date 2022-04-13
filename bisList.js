

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

function setClassSpec(event) {
    if (event.id != "class1"
        || event.id != "class2"
        || event.id != "class3") {

        var classBtn1 = document.getElementById('class1');
        var classBtn2 = document.getElementById('class2');
        var classBtn3 = document.getElementById('class3');
        var test = classTypes[(event.getAttribute('data-class'))];

        classBtn1.setAttribute('data-spec', Object.getOwnPropertyNames(test)[0]);
        classBtn1.setAttribute('data-class', event.getAttribute('data-class'));

        classBtn2.setAttribute('data-spec', Object.getOwnPropertyNames(test)[1]);
        classBtn2.setAttribute('data-class', event.getAttribute('data-class'));

        classBtn3.setAttribute('data-spec', Object.getOwnPropertyNames(test)[2]);
        classBtn3.setAttribute('data-class', event.getAttribute('data-class'));
    }

    var classSpec = classTypes[(event.getAttribute('data-class'))];
    var classSpec2 = classSpec[(event.getAttribute('data-spec'))];

    buildBisTable(classSpec2);
    closeNav();
}

buildBisTable(classTypes.dk.blood);
function buildBisTable(classSpec) {

    var table = document.getElementById('bisListTable');
    table.innerHTML = "";

    var headderTr = table.appendChild(document.createElement('tr'));
    var tr = headderTr.appendChild(document.createElement('th'));
    tr.innerHTML = "Slot";
    tr = headderTr.appendChild(document.createElement('th'));
    tr.innerHTML = "Item Option 1";
    tr = headderTr.appendChild(document.createElement('th'));
    tr.innerHTML = "Item Option 2";
    tr = headderTr.appendChild(document.createElement('th'));
    tr.innerHTML = "Item Option 3";

    for (var i = 0; i < 15; i++) {
        var col = table.insertRow(-1);
        col.insertRow = document.createElement('tr');
        for (var j = 0; j < 5; j++) {
            var td = document.createElement('td');
            var row = col.appendChild(td);

            if (j == 0) {
                td.innerHTML = classSpec[i][j];
            }
            else {
                var a = row.appendChild(document.createElement('a'));
                a.href = "#";
                var test = classSpec[i][j];
                a.setAttribute('rel', 'item=' + classSpec[i][j]);
            }
        }
    }
    //$WowheadPower.init();
    $WowheadPower.refreshLinks();
}