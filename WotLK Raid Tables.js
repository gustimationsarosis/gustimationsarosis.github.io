let playerGrid = document.getElementById("playerGrid");
let raidGrid = document.getElementById("raidComp");

//Raid Layout Grid
function buildRaidTable() {
    for (i = 0; i < 5; i++) {
        var colum = raidGrid.appendChild(document.createElement('tr'));

        for (j = 0; j < 5; j++) {
            var row = colum.appendChild(document.createElement('td'));

            row.appendChild(document.createTextNode(""));

            row.style.width = '125px';
            row.style.height = '40px';

            row.id = "r" + i + "" + j;
            row.style.backgroundColor = "#9e9e9e";
            row.style.borderRadius = "2px";
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
            row.classList.add('tooltipCustom');
            row.classList.add('button-1');
            // to track dragging not on raid selector
            row.setAttribute('ondragend', 'dragEnd(event)');

            var tooltipSpan = row.appendChild(document.createElement('span'));
            tooltipSpan.classList.add('tooltipCustomtext');
            tooltipSpan.id = "" + playerType.id + "tooltipCustom";

            //Buff tips
            var toolTipHeader = tooltipSpan.appendChild(document.createElement('h3'));
            toolTipHeader.innerHTML = "Buffs";
            for (var rb = 0; rb < playerType.raidBuffs.length; rb++) {
                var p = tooltipSpan.appendChild(document.createElement('p'));
                p.innerHTML = playerType.raidBuffs[rb].buff;
                p.style.lineHeight = "0.2";
            }

            //De-buff tips
            var toolTipHeaderDebuff = tooltipSpan.appendChild(document.createElement('h3'));
            toolTipHeaderDebuff.innerHTML = "De-Buffs";
            for (var rb = 0; rb < playerType.raidDeBuffs.length; rb++) {
                var p = tooltipSpan.appendChild(document.createElement('p'));
                p.innerHTML = playerType.raidDeBuffs[rb].deBuff;
                p.style.lineHeight = "0.2";
            }

            row.style.backgroundColor = playerColour(i);
            row.setAttribute('draggable', true);
            row.setAttribute('ondragstart', 'drag(event)');
            row.setAttribute('onclick', 'selectPlayerCLass(event)');
            row.setAttribute('onmousedown', 'mousedown(event)');
            row.setAttribute('onmouseup', 'mouseup(event)');

            var textSpan = document.createElement('span');
            textSpan.innerText = playerType.text;
            textSpan.style.top = "-12px";

            //Player icon
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

function buildRaidBuffGroupTable() {
    var raidBuffListItem = document.getElementById('raidBuffList');
    raidBuffListItem.innerHTML = "";

    for (var i = 0; i < raidBuffList.length; i++) {
        var raidBuffItem = document.createElement('li');
        raidBuffItem.innerHTML = raidBuffList[i][1];
        raidBuffItem.classList.add('tooltipCustom', 'buffListItemInactive');
        raidBuffItem.id = "raidBuff" + raidBuffList[i][0];


        //Get list of current Buffs!?!?
        var tooltipSpan = raidBuffItem.appendChild(document.createElement('span'));
        tooltipSpan.classList.add('tooltipCustomtext');
        tooltipSpan.id = "" + (i + 1) + "RaidBuffTooltipCustom";
        tooltipSpan.setAttribute('hidden', true);

        raidBuffListItem.appendChild(raidBuffItem);
    }
}

function raidBuffGroupTable(totalBuffList) {

    for (var i = 0; i < totalBuffList.length; i++) {
        var buffItem = "raidBuff" + totalBuffList[i].raidGroupId;
        var raidBuffListItem = document.getElementById(buffItem);

        if (raidBuffListItem != null) {
            // Un-gray
            raidBuffListItem.classList.remove('buffListItemInactive');
            //Un-hide tooltip
            var tooltip = document.getElementById(totalBuffList[i].raidGroupId + "RaidBuffTooltipCustom");
            tooltip.removeAttribute('hidden');

            if (tooltip.querySelector('p') != null) {
                var buffs = tooltip.querySelector('p').childNodes;

                for (var j = 0; j < buffs.length; j++) {
                    if (totalBuffList[i].buff == buffs[j].data
                        || totalBuffList[i].deBuff == buffs[j].data) {
                        continue;
                    }
                    else {
                        var p = tooltip.appendChild(document.createElement('p'));
                        p.innerHTML = totalBuffList[i].buff ?? totalBuffList[i].deBuff;
                        p.style.lineHeight = "0.2";
                        p.style.display = "contents";
                        tooltip.appendChild(document.createElement('br'));
                    }
                }
            }
            else {

                var p = tooltip.appendChild(document.createElement('p'));
                p.innerHTML = totalBuffList[i].buff ?? totalBuffList[i].deBuff;
                p.style.lineHeight = "0.2";
                p.style.display = "contents";
                tooltip.appendChild(document.createElement('br'));
                continue;
            }
        }
    }
}
