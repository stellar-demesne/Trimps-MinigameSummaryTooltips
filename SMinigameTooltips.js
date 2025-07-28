
function WMST_make_S_TD_tooltip() {
    let outstring = "<p>You have " + prettify(playerSpire.runestones) + " runestones on hand, earning "
    outstring += prettify(playerSpire.getRsPs()) + " per second.</p>";
    if (playerSpire.selectedTrap != "" && playerSpire.selectedTrap != "sell") {
        outstring += "<p>Your currently selected trap costs " + prettify(playerSpire.getTrapCost(playerSpire.selectedTrap)) + " Rs</p>";
    }
    let rows_built = playerSpire.rowsAllowed;
    if (rows_built < 3) {
        // super early tutorial time
        outstring += "<p>You should maybe investigate this minigame some more.</p>";
    } else if (rows_built < 20) {
        outstring += "<p>You have " + prettify(playerSpire.spirestones) + " of the ";
        outstring += prettify(playerSpire.getNextRowCost()) + " Spirestones needed to build the next floor. (";
        outstring += prettify(100.0 * playerSpire.spirestones / playerSpire.getNextRowCost()) + "%).";
        if (playerSpire.difficulty < 100 * (rows_built + 1)) {
            // also, boost that threat number! can't build another floor anyhow!
            if (playerSpire.getNextRowCost() < playerSpire.spirestones) {
                outstring += " You need more threat! Tweak that layout, get that damage stacking up better!"
            } else {
                outstring += " Also, you would need more threat! You can do this. i believe in you <3"
            }
        }
        outstring += "</p>";
    }
    if (playerSpire.canSeal()) {
        outstring += "<p><strong>You can seal the spire</strong>, giving a bonus tower of each type! (and also slightly reducing game simulation overhead)</p>";
    }

    return "tooltip('Spire Defense Summary', 'customText', event, '" + outstring + "')";
}

function WMST_make_S_A_tooltip() {
    let kills_needed = autoBattle.nextLevelCount() - autoBattle.enemiesKilled;
    let fights_won = autoBattle.sessionEnemiesKilled;
    let fights_finished = autoBattle.sessionEnemiesKilled + autoBattle.sessionTrimpsKilled;
    let winrate = 100.0 * fights_won / fights_finished;
    let outstring = "<p>";
    if (autoBattle.settings.practice.enabled) {
        outstring += "<strong>Practicing</strong>";
    } else {
        outstring += "Fighting";
    }
    outstring += " at level " + autoBattle.enemyLevel + ".";
    if (autoBattle.enemyLevel == autoBattle.maxEnemyLevel) {
        // we're clearing a new enemy!
        outstring += " " + prettify(kills_needed) + " kills left to open up the next level.";
    }
    if (fights_finished > 0) {
        outstring += " " + prettify(winrate) + "% of fights won since last setup change; you have won "
        outstring += prettify(fights_won) + " out of " + prettify(fights_finished);
        outstring += " fights."
        if (autoBattle.settings.practice.enabled) {
            outstring += "..<strong>Hypothetically.</strong> ";
        }
    }
    outstring += "</p>";
    outstring += "<p>";
    if (autoBattle.shards > 0) {
        // we got some shards!
        outstring += prettify(autoBattle.shards) + " shards banked, earning ";
        if (autoBattle.settings.practice.enabled) {
            outstring += "a <strong>hypothetical</strong> ";
        }
        outstring += prettify(autoBattle.getDustPs() / 1e9) + "/s, and ";
    }
    // either way, dust too.
    outstring += prettify(autoBattle.dust) + " dust banked, earning ";
    if (autoBattle.settings.practice.enabled) {
        outstring += "a <strong>hypothetical</strong> ";
    }
    outstring += prettify(autoBattle.getDustPs()) + "/s.</p>";
    if (autoBattle.activeContract != "") {
        let contract_zone = autoBattle.items[autoBattle.activeContract].zone
        outstring += "<p>Current contract asks for a zone <strong>" + contract_zone + "+</strong> void map</p>";
    }
    else {
        let the_contracts = autoBattle.getContracts();
        if (the_contracts.length > 0) {
            outstring += "<p>No current contract! Next cheapest contract costs ";
            outstring += prettify(autoBattle.contractPrice(the_contracts[0]));
            outstring += (autoBattle.items[the_contracts[0]].dustType == "shards") ? " shards" : " dust";
            outstring += ".</p>";
        }
    }
    if (autoBattle.canSeal) {
        outstring += "<p><strong>You can seal the spire!</strong> This time it doesn't give bonuses. But you should feel accomplished anyhow.</p>";
    }

    return "tooltip('Spire Assault Summary', 'customText', event, '" + outstring + "')";
}

function WMST_makehidetooltips() {
    let elem = document.getElementById("playerSpireTab");
    if (elem != null) {
        // the Spire_TD tab
        elem.setAttribute('onmouseout', 'tooltip("hide");');
    }
    elem = document.getElementById("autoBattleTab");
    if (elem != null) {
        // the Spire Assault tab
        elem.setAttribute('onmouseout', 'tooltip("hide");');
    }
}

function WMST_hook_tooltips() {
    let elem = document.getElementById("playerSpireTab");
    if (elem != null) {
        // the Spire_TD tab
        elem.setAttribute('onmouseover', WMST_make_S_TD_tooltip());
    }
    elem = document.getElementById("autoBattleTab");
    if (elem != null) {
        // the Spire Assault tab
        elem.setAttribute('onmouseover', WMST_make_S_A_tooltip());
    }
}

function WMST_initialise() {
    WMST_makehidetooltips();
    WMST_hook_tooltips();
    setInterval( function () {
        WMST_hook_tooltips();
    }, 1000);
}
WMST_initialise();
