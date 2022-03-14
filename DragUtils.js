var fromEvent;

function dragEnd(ev) {
    clearRaidBox(ev.target.id);
    updateCompSelection();
}

function drop(ev, onLoad) {

    var playerDescription = "";
    var playerId = "";
    var playerId2;
    var fe = "" + fromEvent;
    var fromRaid;
    var playerBuffs;

    if (ev != null) {
        ev.preventDefault();
        playerDescription = ev.dataTransfer.getData("text");
        playerId = ev.target.id;
        fromRaid = document.getElementById(fe).innerText
        playerId2 = document.getElementById(playerDescription);
        playerBuffs = PlayerType(playerId2.getAttribute('data-rid')).raidBuffs;

    }
    else {
        playerDescription = onLoad.player;
        playerId = onLoad.id;
        fromRaid = onLoad.playerText;
        playerBuffs = onLoad.playerBuffs;
    }

    //if moiving from an empty raid slot, do noithing
    if (fromRaid !== "") {
        var player = document.getElementById(playerDescription);

        var targetGridSlot = document.getElementById(playerId);
        targetGridSlot.style.backgroundColor = player.style.backgroundColor;
        targetGridSlot.innerText = player.innerText;
        targetGridSlot.setAttribute('data-type', player.getAttribute('data-type'))
        targetGridSlot.setAttribute('data-rid', player.getAttribute('data-rid'))
    }

    //If moving a raid slot, clear origan
    if (fe.charAt(0) == "r") {
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

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    fromEvent = ev.target.id;
}

function allowDrop(ev) {
    ev.preventDefault();
}
