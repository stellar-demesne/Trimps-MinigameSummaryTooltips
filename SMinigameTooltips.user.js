// ==UserScript==
// @name         MinigameSummaryTooltips
// @namespace    https://github.com/stellar-demesne/Trimps-MinigameSummaryTooltips
// @version      1.0
// @updateURL    https://github.com/stellar-demesne/Trimps-MinigameSummaryTooltips/SMinigameTooltips.user.js
// @description  Minigame Summary Tooltips
// @author       StellarDemesne
// @include      *trimps.github.io*
// @include      *kongregate.com/games/GreenSatellite/trimps
// @grant        none
// ==/UserScript==
var script = document.createElement('script');
script.id = 'SMinigameTooltips';
script.src = 'https://stellar-demesne.github.io/Trimps-MinigameSummaryTooltips/SMinigameTooltips.js';
script.setAttribute('crossorigin', "anonymous");
document.head.appendChild(script);
