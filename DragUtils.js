var fromEvent;

function dragEnd(ev) {
    var target = ev.target.id;
    if (target.charAt(0) == "p") {
        showHideToolTip(true, ev.target.getAttribute('data-rid'))
        return;
    }
    clearRaidBox(target);
    updateCompSelection();
}

function selectPlayerCLass(ev) {

    var parentTd = ev.target.closest('td');
    var playerId = parentTd.id;
    var playerType = parentTd.getAttribute('data-type');
    var playerSpec = parentTd.innerText;
    var playerBuffs = PlayerType(playerId).raidBuffs;
    var tableRows = document.getElementById('raidComp').rows;
    var nextEmptyySlot = "";

    //Find the next empty raid slot
    for (var i = 0; i < tableRows.length; i++) {
        for (var ii = 0; ii < tableRows[i].cells.length; ii++) {
            if (tableRows[i].cells[ii].textContent == "") {
                nextEmptyySlot = tableRows[i].cells[ii].id;
                break;
            }
        }
        if (nextEmptyySlot != "")
            break;
    }

    if (nextEmptyySlot == "")
        return;

    drop(null,
        {
            player: playerId,
            id: nextEmptyySlot,
            spec: playerType,
            playerText: playerSpec,
            playerBuffs: playerBuffs
        });
}

function drop(ev, onLoad) {
    var playerDescription = "";
    var playerId = "";
    var playerId2;
    var fe = "" + fromEvent;
    var fromRaid;

    if (ev != null) {
        ev.preventDefault();
        playerDescription = ev.dataTransfer.getData("text");
        playerId = ev.target.id;
        fromRaid = document.getElementById(fe).innerText
        playerId2 = document.getElementById(playerDescription);
        showHideToolTip(true, PlayerType(playerId2.id).id)
    }
    else {
        playerDescription = onLoad.player;
        playerId = onLoad.id;
        fromRaid = onLoad.playerText;
        playerBuffs = onLoad.playerBuffs;
    }
    if (playerDescription.includes("tooltip"))
        return;

    //if moiving from an empty raid slot, do noithing
    if (fromRaid !== "") {
        var player = document.getElementById(playerDescription);
        var targetGridSlot = document.getElementById(playerId);
        targetGridSlot.style.backgroundColor = player.style.backgroundColor;
        // Inner text contains the span
        var playerName = innerText = player.innerText.split('\n');

        targetGridSlot.innerText = playerName[playerName.length - 1];
        targetGridSlot.setAttribute('data-type', player.getAttribute('data-type'))
        targetGridSlot.setAttribute('data-rid', player.getAttribute('data-rid'))
    }

    //If moving a raid slot, clear origan
    if (fe.charAt(0) == "r" && ev != null) {
        clearRaidBox(fe);
    }
    updateCompSelection();
}

function clearRaidBox(id) {
    var previousRaidSlot = document.getElementById(id);

    previousRaidSlot.style.backgroundColor = "#9e9e9e";
    previousRaidSlot.innerText = "";
    previousRaidSlot.setAttribute('data-type', "")
    previousRaidSlot.setAttribute('data-rid', "")
}

function mousedown(ev) {
    var parentTd = ev.target.closest('td');

    var toolTip = parentTd.getAttribute('data-rid');
    if (toolTip == null) {
        return;
    }
    showHideToolTip(false, toolTip)
}

function mouseup(ev) {
    var parentTd = ev.target.closest('td');

    var toolTip = parentTd.getAttribute('data-rid');
    if (toolTip == null) {
        return;
    }
    showHideToolTip(true, toolTip)
}

function drag(ev) {
    var parentTd = ev.target.closest('td');

    ev.dataTransfer.setData("text", parentTd.id);
    fromEvent = parentTd.id;
}

function allowDrop(ev) {
    ev.preventDefault();
}

//Show hides tooltip when dragging player select
function showHideToolTip(show, toolTip) {
    var tip = document.getElementById("" + toolTip + 'tooltip');
    if (toolTip == "")
        return;

    if (show) {
        tip.style.height = 'auto';
        tip.style.display = 'block';
        tip.style.padding = '5px 0 5px 0';
    }
    else {
        tip.style.height = "0";
        tip.style.display = 'none';
        tip.style.padding = '0 0 0 0';
    }
}
