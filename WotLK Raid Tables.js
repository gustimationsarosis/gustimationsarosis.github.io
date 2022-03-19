let playerGrid = document.getElementById("playerGrid");
let raidGrid = document.getElementById("raidComp");

//Raid Layout Grid
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

// Player Grid
function buildRaidSlecTable() {
    for (i = 0; i < 10; i++) {
        var colum = playerGrid.appendChild(document.createElement('tr'));

        for (j = 0; j < 3; j++) {
            var row = colum.appendChild(document.createElement('td'));
            row.id = "p" + i + "" + j;
            var playerType = PlayerType(row.id);

            row.setAttribute('data-type', "" + playerType.type);
            row.setAttribute('data-rid', playerType.id);

            row.classList.add('playergrid');
            row.classList.add('tooltip');
            row.classList.add('button-1');
            // to track dragging not on raid selector
            row.setAttribute('ondragend', 'dragEnd(event)');

            var tooltipSpan = row.appendChild(document.createElement('span'));
            tooltipSpan.classList.add('tooltiptext');
            tooltipSpan.id = "" + playerType.id + "tooltip";
            for (var rb = 0; rb < playerType.raidBuffs.length; rb++) {
                tooltipSpan.innerHTML += " " + playerType.raidBuffs[rb].buff;
            }

            row.style.backgroundColor = playerColour(i);

            //todo: on drag only show icon??
            row.setAttribute('draggable', true);
            row.setAttribute('ondragstart', 'drag(event)');
            row.setAttribute('onclick', 'selectPlayerCLass(event)');

            row.setAttribute('onmousedown', 'mousedown(event)');
            row.setAttribute('onmouseup', 'mouseup(event)');

           if (playerType.raidBuffs.length > 0) {
                for (var k = 0; k < playerType.raidBuffs.length; k++) {
                    row.setAttribute('data-raidBuff_' + (k + 1), playerType.raidBuffs[k].buff)
                }
            }
            var textSpan = document.createElement('span');
            textSpan.innerText = playerType.text;
            textSpan.style.top = "-12px";

            var img = document.createElement('img');
            img.src = playerType.icon;
            img.style.borderRadius = "30%";
            img.style.marginLeft = "10px";
            img.style.marginTop = "4px";
            img.style.width = "30px";
            img.style.float = "right";

            row.appendChild(textSpan);
            row.appendChild(img);

        }
    }
}
