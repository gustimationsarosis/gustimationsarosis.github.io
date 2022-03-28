var structure = { Tanks: 0, DPS: 0, Healers: 0 };
var totalRaidComp = [];

function updateCompSelection(updateUrlComp = true) {
    var totalRaidComp = [];
    var totalBuffList = [];
    var totalDeBuffList = [];

    var buffList = document.getElementById('raidBuffs');
    var deBuffList = document.getElementById('raidDeBuffs');

    var raidCompTable = document.getElementById("raidComp");
    var emptyRaid = true;

    buffList.innerHTML = "";
    deBuffList.innerHTML = "";

    structure = { Tanks: 0, DPS: 0, Healers: 0 };

    for (let row of raidCompTable.rows) {
        for (let cell of row.cells) {
            if (cell.innerText === "") {
                continue;
            }
            emptyRaid = false;
            //todo: remove data-type from cell and use playerType method..
            UpdateRaidStructure(cell.getAttribute('data-type'));
            document.getElementById("tankSelection").innerText = "Tanks: " + structure.Tanks;
            document.getElementById("dpsSelection").innerText = "DPS: " + structure.DPS;
            document.getElementById("healerSelection").innerText = "Healers: " + structure.Healers;

            var playerType = document.querySelectorAll("[data-rid=" + cell.getAttribute('data-rid') + "]")[0];

            totalRaidComp.push({ playerId: cell.getAttribute('data-rid'), RaidSLot: cell.id });

            var cellData = PlayerType(playerType.id);
            if (cellData.raidBuffs.length > 0) {
                for (var iii = 0; iii < cellData.raidBuffs.length; iii++) {
                    totalBuffList.push(cellData.raidBuffs[iii]);
                }
            }
            if (cellData.raidDeBuffs.length > 0) {
                for (var iii = 0; iii < cellData.raidDeBuffs.length; iii++) {
                    totalDeBuffList.push(cellData.raidDeBuffs[iii]);
                }
            }
        }
        if (emptyRaid) {
            buildRaidStructure();
        }
    }

    if (totalBuffList.length > 0) {
        updateBuffList(totalBuffList, buffList, 'buff');
    }
    if (totalDeBuffList.length > 0) {
        updateBuffList(totalDeBuffList, deBuffList, 'deBuff');
    }

    document.getElementById('totalRaidComp').val = totalRaidComp;
    if (updateUrlComp) {
        updateUrl();
        $WowheadPower.init();
        $WowheadPower.refreshLinks();
    }
}

function buildRaidStructure() {
    var raidList = document.getElementById("raidStructure");
    raidList.innerText = "";

    var tankRaidList = raidList.appendChild(document.createElement('li'));
    tankRaidList.id = 'tankSelection';
    tankRaidList.innerHTML = 'Tanks: 0';
    var dpsRaidList = raidList.appendChild(document.createElement('li'));
    dpsRaidList.id = 'dpsSelection';
    dpsRaidList.innerHTML = 'DPS: 0';
    var healerRaidList = raidList.appendChild(document.createElement('li'));
    healerRaidList.id = 'healerSelection';
    healerRaidList.innerHTML = 'Healers: 0';
}

function UpdateRaidStructure(type) {
    if (type === "Tank")
        structure.Tanks++;
    else if (type === "DPS")
        structure.DPS++;
    else if (type === "Healer")
        structure.Healers++;
    return
}

function updateBuffList(totalBuffList, buffList, dataType) {
    var playerBuffs = getUniqueListBy(totalBuffList, dataType)

    for (var playerBuffList = 0; playerBuffList < playerBuffs.length; playerBuffList++) {

        var item = buffList.appendChild(document.createElement('li'));

        if (dataType == "buff") {
            if (playerBuffs[playerBuffList].spell == null)
                item.innerHTML = playerBuffs[playerBuffList].buff;
            else {
                var buff = item.appendChild(document.createElement('a'));
                buff.setAttribute('onclick', 'preventMouseIconEvent(event)');
                buff.setAttribute('href', '#');
                buff.style.color = "black";
                buff.style.textDecoration = "none";
                buff.setAttribute('rel', 'spell=' + playerBuffs[playerBuffList].spell)
            }

        }
        else {
            if (playerBuffs[playerBuffList].spell == null)
                item.innerHTML = playerBuffs[playerBuffList].deBuff;
            else {
                var buff = item.appendChild(document.createElement('a'));
                buff.setAttribute('onclick', 'preventMouseIconEvent(event)');
                buff.setAttribute('href', '#');
                buff.style.color = "black";
                buff.style.textDecoration = "none";
                buff.setAttribute('rel', 'spell=' + playerBuffs[playerBuffList].spell)
            }
        }
    }
}

function getUniqueListBy(buffs, key) {
    return [...new Map(buffs.map(item => [item[key], item])).values()]
}

function preventMouseIconEvent(event) {
    event.preventDefault();
}