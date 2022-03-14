
function playerColour(row) {
    var backGroundColour;

    switch (row) {
        case 0:
            backGroundColour = "rgb(255,0,0)";
            break;
        case 1:
            backGroundColour = "rgb(255,165,0)";
            break;
        case 2:
            backGroundColour = "rgb(0,128,0)";
            break;
        case 3:
            backGroundColour = "rgb(173,216,230)";
            break;
        case 4:
            backGroundColour = "pink";
            break;
        case 5:
            backGroundColour = "white";
            break;
        case 6:
            backGroundColour = "yellow";
            break;
        case 7:
            backGroundColour = "rgb(0,0,255)";
            break;
        case 8:
            backGroundColour = "rgb(128,0,128)";
            break;
        case 9:
            backGroundColour = "brown";
            break;

    }
    return backGroundColour;
}

function PlayerType(row) {
    var playerType = ({id:"", text: "", type: "", raidBuffs: [] });
    switch (row) {
        case "p00":
            playerType.id = "a";
            playerType.text = "Blood DK";
            playerType.type = 'Tank';
            playerType.raidBuffs = [{ buff: "Horn Of Winter" }, { buff: "Abomination's Might" }];
            break;
        case "p01":
            playerType.id = "b";
            playerType.text = "Frost DK";
            playerType.type = 'DPS';
            playerType.raidBuffs = [{ buff: "Horn Of Winter" }, { buff: "Icy Talons" }];
            break;
        case "p02":
            playerType.id = "c";
            playerType.text = "Unholy DK";
            playerType.type = 'DPS';
            break;
        case "p10":
            playerType.id = "d";
            playerType.text = "Balance";
            playerType.type = 'DPS';
            playerType.raidBuffs = [{ buff: "Improved Moonkin Form" }];
            break;
        case "p11":
            playerType.id = "e";
            playerType.text = "Feral";
            playerType.type = 'DPS';
            playerType.raidBuffs = [{ buff: "Leader of the Pack" }];
            break;
        case "p12":
            playerType.id = "f";
            playerType.text = "Restoration";
            playerType.type = 'Healer';
            playerType.raidBuffs = [{ buff: "Tree Of Life" }];
            break;
        case "p20":
            playerType.id = "g";
            playerType.text = "Beast Mastery";
            playerType.type = 'DPS';
            playerType.raidBuffs = [{ buff: "Ferocious Inspiration" }];
            break;
        case "p21":
            playerType.id = "h";
            playerType.text = "Marksmanship";
            playerType.type = 'DPS';
            playerType.raidBuffs = [{ buff: "Trueshot Aura" }];
            break;
        case "p22":
            playerType.id = "i";
            playerType.text = "Survival";
            playerType.type = 'DPS';
            playerType.raidBuffs = [{ buff: "Hunting Party" }];
            break;
        case "p30":
            playerType.id = "j";
            playerType.text = "Arcane";
            playerType.type = 'DPS';
            playerType.raidBuffs = [{ buff: "Arcane Empowerment" }];
            break;
        case "p31":
            playerType.id = "k";
            playerType.text = "Frost";
            playerType.type = 'DPS';
            playerType.raidBuffs = [{ buff: "Enduring Winter" }];
            break;
        case "p32":
            playerType.id = "l";
            playerType.text = "Fire";
            playerType.type = 'DPS';
            break;
        case "p40":
            playerType.id = "m";
            playerType.text = "Holy";
            playerType.type = 'Healer';
            break;
        case "p41":
            playerType.id = "n";
            playerType.text = "Protection";
            playerType.type = 'Tank';
            playerType.raidBuffs = [{ buff: "Blessing of Sanctuary" }];
            break;
        case "p42":
            playerType.id = "o";
            playerType.text = "Retribution";
            playerType.type = 'DPS';
            playerType.raidBuffs = [{ buff: "Judgements of the Wise" }, { buff: "Sanctified Retribution" }, { buff: "Swift Retribution" }];
            break;
        case "p50":
            playerType.id = "p";
            playerType.text = "Discipline";
            playerType.type = 'Healer';
            playerType.raidBuffs = [{ buff: "Renewed Hope" }, { buff: "Inspiration" }];
            break;
        case "p51":
            playerType.id = "q";
            playerType.text = "Holy";
            playerType.type = 'Healer';
            playerType.raidBuffs = [{ buff: "Inspiration" }];
            break;
        case "p52":
            playerType.id = "r";
            playerType.text = "Shadow";
            playerType.type = 'DPS';
            playerType.raidBuffs = [{ buff: "Vampiric Touch" }];
            break;
        case "p60":
            playerType.id = "s";
            playerType.text = "Assassination";
            playerType.type = 'DPS';
            break;
        case "p61":
            playerType.id = "t";
            playerType.text = "Combat";
            playerType.type = 'DPS';
            break;
        case "p62":
            playerType.id = "u";
            playerType.text = "Sublety";
            playerType.type = 'DPS';
            break;
        case "p70":
            playerType.id = "v";
            playerType.text = "Elemental";
            playerType.type = 'DPS';
            playerType.raidBuffs = [{ buff: "Totem of Wrath" }, { buff: "Elemental Oath" }];
            break;
        case "p71":
            playerType.id = "w";
            playerType.text = "Enhancement";
            playerType.type = 'DPS';
            playerType.raidBuffs = [{ buff: "Unleashed Rage" }, { buff: "Improved Windfury Totem" }];
            break;
        case "p72":
            playerType.id = "x";
            playerType.text = "Restoration";
            playerType.type = 'Healer';
            playerType.raidBuffs = [{ buff: "Ancestral Healing" }, { buff: "Mana Spring Totem" }, { buff: "Restorative Totems" }];
            break;
        case "p80":
            playerType.id = "y";
            playerType.text = "Affliction";
            playerType.type = 'DPS';
            playerType.raidBuffs = [{ buff: "Fel Intelligence" }];
            break;
        case "p81":
            playerType.id = "z";
            playerType.text = "Demonology";
            playerType.type = 'DPS';
            playerType.raidBuffs = [{ buff: "Demonic Pact" }];
            break;
        case "p82":
            playerType.id = "A";
            playerType.text = "Destruction";
            playerType.type = 'DPS';
            playerType.raidBuffs = [{ buff: "Improved Imp" }];
            break;
        case "p90":
            playerType.id = "B";
            playerType.text = "Arms";
            playerType.type = 'DPS';
            break;
        case "p91":
            playerType.id = "C";
            playerType.text = "Fury";
            playerType.type = 'DPS';
            playerType.raidBuffs = [{ buff: "Commanding Presence" }];
            break;
        case "p92":
            playerType.id = "D";
            playerType.text = "Protection";
            playerType.type = 'Tank';
            playerType.raidBuffs = [{ buff: "Vigilance" }];
            break;

        default:
    }
    return playerType;
}
