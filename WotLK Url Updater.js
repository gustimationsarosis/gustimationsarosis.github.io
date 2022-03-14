function reset() {
    document.getElementById("raidComp").innerText = '';
    document.getElementById("raidBuffs").innerText = '';

    buildRaidTable();
    document.location.hash = "";
    document.getElementById('totalRaidComp').val = "";
}

function updateUrl() {
    var uslCoded = document.getElementById('totalRaidComp').val;
    if (uslCoded === undefined || uslCoded === "")
        return;
    var url = "";
    for (var i = 0; i < uslCoded.length; i++) {
        url = url + "" + uslCoded[i].playerId + "" + uslCoded[i].RaidSLot;

    }
    document.location.hash = "?a=" + url;
}

function getUrlParameters() {

    var url = window.location.href.replace('#');
    const params = new URL(url).searchParams.get('a');
    if (params == null)
        return;

    var comp = params.split('p');
    comp.shift();

    for (var i = 0; i < comp.length; i++) {
        var urlSelector = comp[i].split('r');
        var playerType = PlayerType("p" + urlSelector[0]);


        drop(null,
            {
                player: "p" + urlSelector[0],
                id: "r" + urlSelector[1],
                spec: playerType.type,
                playerText: playerType.text,
                playerBuffs: playerType.raidBuffs
            });
    }
}