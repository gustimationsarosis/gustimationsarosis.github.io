var structure = { Tanks: 0, DPS: 0, Healers: 0 };
var totalRaidComp = [];

function updateCompSelection() {
    var totalRaidComp = [];
    var totalBuffList = [];
    var buffList = document.getElementById('raidBuffs');
    var raidCompTable = document.getElementById("raidComp");
    var emptyRaid = true;

    buffList.innerHTML = "";
    structure = { Tanks: 0, DPS: 0, Healers: 0 };

    for (let row of raidCompTable.rows) {
        for (let cell of row.cells) {
            if (cell.innerText === "") {
                continue; totalRaidComp
            }
            emptyRaid = false;
            UpdateRaidStructure(cell.getAttribute('data-type'));
            document.getElementById("tankSelection").innerText = "Tanks: " + structure.Tanks;
            document.getElementById("dpsSelection").innerText = "DPS: " + structure.DPS;
            document.getElementById("healerSelection").innerText = "Healers: " + structure.Healers;

            totalRaidComp.push({ playerId: cell.getAttribute('data-rid'), RaidSLot: cell.id });

            var cellBuffLlist = PlayerType(cell.getAttribute('data-rid')).raidBuffs;
            if (cellBuffLlist.length > 0) {
                for (var iii = 0; iii < cellBuffLlist.length; iii++) {
                    totalBuffList.push(cellBuffLlist[iii]);
                }
            }
        }

        if (emptyRaid) {
            buildRaidStructure();
        }
    }

    if (totalBuffList.length > 0) {
        updateBuffList(totalBuffList, buffList);
    }

    document.getElementById('totalRaidComp').val = totalRaidComp;
    updateUrl();
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

function updateBuffList(totalBuffList, buffList) {
    playerBuffs = getUniqueListBy(totalBuffList, 'buff')

    for (var playerBuffList = 0; playerBuffList < playerBuffs.length; playerBuffList++) {

        var item = buffList.appendChild(document.createElement('li'));

        item.innerHTML = playerBuffs[playerBuffList].buff;
    }
}

function getUniqueListBy(buffs, key) {
    return [...new Map(buffs.map(item => [item[key], item])).values()]
}