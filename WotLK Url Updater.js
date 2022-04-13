function reset() {
    var raidTable = document.getElementById("raidComp");
    raidTable.innerText = '';
    var cpation = raidTable.createCaption();

    cpation.innerText = "Raid composition";
    document.getElementById("raidBuffs").innerText = '';
    document.getElementById("raidDeBuffs").innerText = '';
    buildRaidTable();
    document.location.hash = "";
    document.getElementById('totalRaidComp').val = "";
    buildRaidStructure();
}

function updateUrl() {
    var uslCoded = document.getElementById('totalRaidComp').val;
    if (uslCoded === undefined || uslCoded === "")
        return;
    var url = "";
    for (var i = 0; i < uslCoded.length; i++) {
        url = url + "" + uslCoded[i].playerId + "" + uslCoded[i].RaidSLot.substring(1, 3);

    }
    document.location.hash = "?a=" + url;
}

function getUrlParameters() {

    var url = window.location.href.replace('#');
    const params = new URL(url).searchParams.get('a');
    if (params == null)
        return;

    var chunks = [];
    for (var i = 0, charsLength = params.length; i < charsLength; i += 3) {
        chunks.push(params.substring(i, i + 3));
    }

    for (var i = 0; i < chunks.length; i++) {
        var playerType = document.querySelectorAll("[data-rid=" + chunks[i].substring(0, 1) + "]");
        var playerData = PlayerType(playerType[0].id)

        drop(null,
            {
                player: playerType[0].id,
                id: "r" + chunks[i].substring(1, 3),
                spec: playerData.type,
                playerText: playerData.text,
                playerBuffs: playerData.raidBuffs                
            },
            updateUrlComp = false
        );
    }
}