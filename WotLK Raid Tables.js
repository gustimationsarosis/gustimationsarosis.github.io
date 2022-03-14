let playerGrid = document.getElementById("playerGrid");
let raidGrid = document.getElementById("raidComp");

function buildRaidTable() {
    for (i = 0; i < 5; i++) {
        var colum = raidGrid.appendChild(document.createElement('tr'));

        for (j = 0; j < 5; j++) {
            var row = colum.appendChild(document.createElement('td'));

            row.appendChild(document.createTextNode(""));

            row.style.width = '100px';
            row.style.height = '35px';

            row.id = "r" + i + "" + j;
            row.style.backgroundColor = "#9e9e9e";
            row.setAttribute('ondragover', 'allowDrop(event)')
            row.setAttribute('ondrop', 'drop(event)')

            // to clear the selected
            row.setAttribute('draggable', true);
            row.setAttribute('ondragstart', 'drag(event)');
            row.setAttribute('ondragend', 'dragEnd(event)');
        }
    }
}

function buildRaidSlecTable() {
    for (i = 0; i < 10; i++) {
        var colum = playerGrid.appendChild(document.createElement('tr'));

        for (j = 0; j < 3; j++) {
            var row = colum.appendChild(document.createElement('td'));
            var rowId = row.id = "p" + i + "" + j;
            var playerType = PlayerType(rowId);
            row.appendChild(document.createTextNode(playerType.text));

            row.setAttribute('data-type', "" + playerType.type);
            row.setAttribute('data-rid', "" + "p" + i + "" + j);

            row.classList.add('playergrid');

            row.style.backgroundColor = playerColour(i);

            row.setAttribute('draggable', true);
            row.setAttribute('ondragstart', 'drag(event)');

            if (playerType.raidBuffs.length > 0) {
                for (var k = 0; k < playerType.raidBuffs.length; k++) {
                    row.setAttribute('data-raidBuff_'+(k+1), playerType.raidBuffs[k].buff)
                }
            }

        }
    }
}
