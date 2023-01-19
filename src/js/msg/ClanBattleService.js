/*
* ________________________________________________________________
* Copyright (C) 2022 FoE-Info - All Rights Reserved
* this source-code uses a copy-left license
*
* you are welcome to contribute changes here:
* https://github.com/FoE-Info/FoE-Info-Extension
*
* AGPL license info:
* https://github.com/FoE-Info/FoE-Info-Extension/master/LICENSE.md
* or else visit https://www.gnu.org/licenses/#AGPL
* ________________________________________________________________
*/import { gvg, MyInfo } from '../index.js';
import { toolOptions, setGVGSize, setToolOption } from '../fn/globals.js';
import { showOptions } from '../vars/showOptions.js';
import * as collapse from '../fn/collapse.js';
import * as element from '../fn/AddElement';
import * as copy from '../fn/copy.js';
import { fGVGagesname } from '../fn/helper.js';
import BigNumber from "bignumber.js";
import icons from 'bootstrap-icons/bootstrap-icons.svg';


export var gvgContainer = null;
export var gvgSummary = null;
export var gvgAges = null;
var gvgPower = [];
var gvgPowerAll = [];
var gvgAgeNotloadList = ["AA", "FE", "TE", "CE", "PME", "ME", "PE", "InA", "CA", "LMA", "HMA", "EMA", "IA"];

export function getContinent(msg) {
    // console.debug(gvg,gvgContainer,gvgSummary,document.getElementById("gvgInfo"));
    // console.debug(gvg,gvgContainer,gvgSummary,gvgAges);

    // collapseOptions('collapseGVGinfo',false);

    if (gvgContainer == null) {
        console.debug('1');
        gvgContainer = document.createElement('div');
        gvg.appendChild(gvgContainer);
        gvgSummary = document.createElement('div');
        gvgContainer.appendChild(gvgSummary);
    }

    if (document.getElementById("gvgInfo") == null) {
        console.debug('2');
        gvgContainer = document.createElement('div');
        gvgContainer.id = "gvgInfo";
        gvgContainer.className = "alert alert-success alert-dismissible show collapsed";
        gvgContainer.innerHTML = `${element.close()}
        <p id="gvgInfoTextLabel" href="#gvgInfoText" data-bs-toggle="collapse">
        <svg class="bi header-icon" id="gvgInfoIcon" href="#gvgInfoText" data-bs-toggle="collapse" fill="currentColor" width="12" height="16"><use xlink:href="${icons}#${collapse.collapseGVGinfo ? 'plus' : 'dash'}-circle"/></svg>
        <strong><span data-i18n="summary">GvG Summary</span>:</strong></p>`;
        gvg.appendChild(gvgContainer);
        gvgSummary = document.createElement('div');
        gvgContainer.appendChild(gvgSummary);
        document.getElementById("gvgInfoTextLabel").addEventListener("click", collapse.fCollapseGVGinfo);
        // document.getElementById("content").appendChild(gvg);
    }

    if (showOptions.showGVG) {
        const map = msg.responseData.continent;
        var gvgAges_copy = null;

        // gvgContainer.innerHTML = `<p>`;
        if (document.getElementById("gvgInfoText") == null) {
            gvgSummary = document.createElement('div');
            gvgSummary.id = "gvgInfoText";
            gvgSummary.className = `collapse${!collapse.collapseGVGinfo ? ' show' : ''}`;
            // gvgSummary.innerHTML = ``;
            gvgContainer.appendChild(gvgSummary);
            // gvgSummary = document.createElement('div');
            // gvgContainer.appendChild(gvgSummary);
            // document.getElementById("content").appendChild(gvg);
            // gvg.id="gvgInfo";
            // gvg.className="alert alert-success alert-dismissible show collapsed";
            // console.debug(gvg,gvgContainer,document.getElementById("gvgInfoText"));
        }  

        buildGvgInnerDiv(gvgSummary, () => {copy.genericCopy(`gvgOverviewText`)}, collapse.fcollapseGVGOverview, collapse.collapsegvgOverview, "Overview", "GvG Guild Ages Summary");
        buildGvgInnerDiv(gvgSummary, () => {copy.genericCopy(`gvgGuildPowerText`)}, collapse.fcollapseGVGGuildPower,collapse.collapsegvgGuildPower, "GuildPower", "GvG Guild Power");
        buildGvgInnerDiv(gvgSummary, () => {copy.genericCopy(`gvgCurrAgeText`)}, collapse.fcollapseGVGCurrAge, collapse.collapsegvgCurrAge, "CurrAge", "Live Status");
        buildGvgInnerDiv(gvgSummary, () => {copy.genericCopy(`gvgAllGuildsPowerText`)}, collapse.fcollapseGVGAllGuildsPower, collapse.collapsegvgAllGuildsPower, "AllGuildsPower", "Guild Ranking Live Status");       

        // console.debug(gvg,gvgContainer,document.getElementById("gvgInfo"));
        // var clanHTML = gvg.outerHTML;
        // console.debug(clanHTML);
        // if(clanHTML = null){
        // console.debug(msg.responseData);
        // }
        let count = 0;
        var clanHTML = `<p id='gvgOverviewTextP'> <strong>Guild rank: #${msg.responseData.clan_data.global_clan_rank}</strong></p>
            <table id="gvgOverviewTextT" class="overflow gvgTable">
            <tr><th>Age</th><th>Sectors</th><th>Total goods</th></tr>`
        map.provinces.forEach(era => {
            // console.debug(era.era);
            count = 0;
            era.sectors.forEach(sector => {
                if (sector.owner_id === MyInfo.guildID) {
                    count++;
                    // console.debug(sector.sector_id);
                }
            })
            if (count) {
                const siege = Math.round((3 * Math.pow(count, 1.5) + 0.045 * Math.pow(count, 3.1)) / 5 + 1) * 5 * 5;
                // const siege = BigNumber((3 * Math.pow(count,1.5) + 0.045 * Math.pow(count,3.1)) / 5 + 1).times(5).dp(0);
                const eraName = fGVGagesname(era.era);
                if (era.era == 'AllAge')
                    clanHTML += `<tr><td class="colon-copy">AA</td><td class="sect-copy">${count}</td><td>${siege} medals</td></tr>`;
                else
                    clanHTML += `<tr><td class="colon-copy">${eraName}</td><td class="sect-copy">${count}</td><td class="goods-copy">${siege}</td></tr>`;
            }
        });
        
        var gvgOverviewText = document.getElementById("gvgOverviewText");
        if (gvgOverviewText) {
            gvgOverviewText.innerHTML = clanHTML;
            console.log(toolOptions.gvgOverview)
            gvgOverviewText.style.height =`${toolOptions.gvgOverview}px`;
        }

        resizeFunc(document.getElementById("gvgOverviewText"), "gvgOverview");
        //document.getElementById("gvgOverviewText")?.addEventListener('shown.bs.collapse', handleCollapseOverview);
        var overviewBtn = document.getElementById("gvgOverviewCopyID");
        if(overviewBtn) overviewBtn.style = `display: ${collapse.collapsegvgOverview ? 'none' : 'block'}`;

        var wrapperDiv = document.getElementById("gvgOverviewWrapper");
        if (wrapperDiv) wrapperDiv.style.display = "block";

        $('body').i18n();
    }
    else {
        console.debug(msg.responseData.length);
    }
    // console.debug(gvgSummary,gvgAges);
    // gvgSummary.appendChild(gvgAges);
}

export function getProvinceDetailed(msg) {
    // if(!clanHTML){
    // clanHTML = `<div id="gvgTitle" class="alert alert-success alert-dismissible show collapsed" role="alert">${element.close()}<p id="gvgTextLabel" href="#gvgText" data-bs-toggle="collapse"><svg class="bi alert-warning" id="citystatsicon" href="#citystatsText" data-bs-toggle="collapse" fill="currentColor" width="12" height="16"><use xlink:href="${icons}#${collapse.collapseStats ? 'plus' : 'dash'}-circle"/></svg><strong>GvG Power:</strong></p>`;
    // }
    // var clanHTML = `<p class="alert-success">`;
    // console.debug(msg.responseData);

    if (showOptions.showGVG) {
        var gvgGuildPowerTextDiv = document.getElementById("gvgGuildPowerText")

        // var clanHTML = gvgAges.innerHTML;
        var clanHTML = ``;
        var Guilds = [];
        var GuildSectors = [];
        var GuildPower = [];
        var GVGstatus = [];
        var gvgPowerAllSorted = [];
        // console.debug(Guilds,GuildSectors,GuildPower,GVGstatus);
        const map = msg.responseData.province_detailed;
        // console.debug(map);
        var power = 0;
        var total = 0;
        const power0 = map.power_values[0];
        const power1 = map.power_values[1];
        const power2 = map.power_values[2];
        const power3 = map.power_values[3];        
        
        gvgAgeNotloadList = gvgAgeNotloadList.filter(item => item !== fGVGagesname(map.era))

        var ele = gvgPower.find(element => element.era == map.era)
        if(ele)
            ele.time = new Date().toLocaleString();
        else
            gvgPower.push({era: map.era, power: 0, time: new Date().toLocaleString()});

        map.clans.forEach(clan => {
            // console.debug(clan);

            Guilds[clan.id] = clan.name;
        });

        map.sectors.forEach(sector => {
            // if(sector.__class__ == 'ClanBattleProvinceBaseSector')
            // if(sector.is_landing_zone == true)
            //     console.debug(sector);

            if (sector.is_fogged != true && sector.owner_id > 0) {
                power = 0;

                if (sector.power === 1)
                    power = power1;
                else if (sector.power === 2)
                    power = power2;
                else if (sector.power === 3)
                    power = power3;
                else
                    power = power0;

                if (GuildSectors[sector.owner_id])
                    GuildSectors[sector.owner_id]++;
                else
                    GuildSectors[sector.owner_id] = 1;

                if (GuildPower[sector.owner_id])
                    GuildPower[sector.owner_id] += power;
                else
                    GuildPower[sector.owner_id] = power;

                // console.debug(sector, GuildPower,power);
                // console.debug(sector, Guilds[sector.owner_id],GuildPower[sector.owner_id],power);
            }
        });
        // console.debug(MyInfo.guildID,Guilds[MyInfo.guildID],GuildPower[MyInfo.guildID],GuildPower);

        // map.top_clans.forEach( (clan,j) => {
        // 	if(clan.id == MyInfo.guildID)
        // 		 power = GuildPower[MyInfo.guildID] * (1 + ((3 - j)/20));
        // });

        Guilds.forEach((clan, j) => {
            // console.debug(clan);
            // console.debug(clan,GuildSectors[j],GuildPower[j]);
            if (GuildSectors[j] && GuildPower[j])
                GVGstatus.push({ 'id': j, 'name': clan, 'sectors': GuildSectors[j] || 0, 'power': GuildPower[j] || 0 });
        });

        GVGstatus.sort(function (a, b) { return b.power - a.power });

        GVGstatus.forEach((clan, j) => {
            // if(j < 3) clan.power =  Math.round(clan.power*(1 + ((3 - j)/20)));
            if (j < 3) clan.power = BigNumber(clan.power).times(1 + ((3 - j) / 20)).dp(0);
            if (clan.name == MyInfo.guild) gvgPower.find(element => element.era == map.era).power = clan.power;
            if (!gvgPowerAll[clan.id])
                gvgPowerAll[clan.id] = {name: clan.name, powerList: []};
            gvgPowerAll[clan.id].powerList[map.era] = clan.power;
        });
        gvgPower.sort(function(a,b){return new Date(b.time) - new Date(a.time)});

        // if(!gvgPower[map.era]){
        // 	gvgPower.push([map.era,Math.round(power)]);
        // }
        // else
        //clanHTML = `<p id="gvgGuildPowerTextP" class="overflow">`
        clanHTML = `<table id="gvgGuildPowerTextT" class="overflow gvgTable">
            <tr><th>Age</th><th>Points</th><th class="hide-copy">Updated At</th></tr>`;
        gvgPower.forEach((age) => {
            clanHTML += `<tr><td class="colon-copy">${fGVGagesname(age.era)}</td><td>${age.power}</td><td class="hide-copy">${age.time}</td></tr>`;
            total += +age.power;
        });
        
        clanHTML += `<td>Total: ${total}</td></table>`;
        if (gvgGuildPowerTextDiv){
            gvgGuildPowerTextDiv.innerHTML = clanHTML;
            gvgGuildPowerTextDiv.style.height = `${toolOptions.gvgGuildPower}px`;
        }

        Object.keys(gvgPowerAll).forEach(clan => {
            let clanTotal = 0;
            Object.keys(gvgPowerAll[clan].powerList).forEach(era => {
                clanTotal += +gvgPowerAll[clan].powerList[era];
            });
            gvgPowerAll[clan].total=clanTotal
        });
        gvgPowerAllSorted = copyObj(gvgPowerAll);
        gvgPowerAllSorted.sort(function (a, b) { return b.total - a.total });


        // GuildPower.forEach( (clan,j) => {
        // 	// console.debug(clan);
        // 	console.debug(Guilds[j],GuildSectors[j],clan);
        // });


        
        clanHTML = `<strong>${fGVGagesname(map.era)} <span data-i18n="livestatus">Live Status</span></strong>`;
        var gvgGuildPowerTextDiv = document.getElementById("gvgCurrAgeHeadlineText")
        if (gvgGuildPowerTextDiv) gvgGuildPowerTextDiv.innerHTML = clanHTML;

        clanHTML = `<table id="gvgCurrAgeTextT" class="overflow gvgTable">
            <tr><th>Pos</th><th>Guild Name</th><th>Power</th><th>Sectors</th></tr>`;
        // clanHTML += `<strong>${map.era}</strong><br>`;
        GVGstatus.forEach((clan, j) => {
            clanHTML += `<tr><td>#${j + 1}</td><td class="colon-copy">${clan.name}</td><td>${Math.round(clan.power)}</td><td class="wrap-copy">${clan.sectors}</td></tr>`;
        });
        // }
        // clanHTML += `<br>`;
        clanHTML += `</table>`;
        
        var gvgCurrAgeTextDiv = document.getElementById("gvgCurrAgeText")
        if (gvgCurrAgeTextDiv) {
            gvgCurrAgeTextDiv.innerHTML = clanHTML;
            gvgCurrAgeTextDiv.style.height =  `${toolOptions.gvgCurrAge}px`;
        }
        

        clanHTML = `<table id="gvgAllGuildsPowerTextT" class="overflow gvgTable">
            <tr><th>Pos</th><th>Guild Name</th><th>Power</th></tr>`;

        document.getElementById('gvgWarnGuildPower')?.remove();
        document.getElementById('gvgWarnAllGuildPower')?.remove();
        if (gvgAgeNotloadList.length > 0){
           var gvgWarnFunc = (id) => `<span id="gvgWarn${id}" data-bs-toggle="tooltip" data-bs-placement="bottom" title="${gvgAgeNotloadList.toString()} were not loaded yet"><span>    </span><svg class="bi bi-exclamation-diamond-fill" fill="#808000" width="16" height="16"><use xlink:href="${icons}#exclamation-diamond-fill"/></svg></span> `
           var headlineSpan = document.getElementById("gvgGuildPowerHeadlineText")
           if (headlineSpan) headlineSpan.innerHTML = gvgWarnFunc("GuildPower") + headlineSpan.innerHTML
           headlineSpan = document.getElementById("gvgAllGuildsPowerHeadlineText")
           if (headlineSpan) headlineSpan.innerHTML = gvgWarnFunc("AllGuildPower") + headlineSpan.innerHTML
        }

        Object.keys(gvgPowerAllSorted).forEach((clan, j) => {
            clanHTML += `<tr><td>#${j + 1}</td><td class="colon-copy">${gvgPowerAllSorted[clan].name}</td><td>${Math.round(gvgPowerAllSorted[clan].total)}</td></tr>`;
        });
        // }
        // clanHTML += `<br>`;
        clanHTML += `</table>`;    
        var gvgAllGuildsPowerTextDiv = document.getElementById("gvgAllGuildsPowerText")
        if (gvgAllGuildsPowerTextDiv) {
            gvgAllGuildsPowerTextDiv.innerHTML = clanHTML;
            gvgAllGuildsPowerTextDiv.style.height =  `${toolOptions.gvgAllGuildsPower}px`;
        }

        resizeFunc(document.getElementById("gvgGuildPowerText"), "gvgGuildPower");
        resizeFunc(document.getElementById("gvgCurrAgeText"), "gvgCurrAge");
        resizeFunc(document.getElementById("gvgAllGuildsPowerText"), "gvgAllGuildsPower");
        
        var btn = document.getElementById("gvgGuildPowerCopyID");
        if(btn) btn.style = `display: ${collapse.collapsegvgGuildPower ? 'none' : 'block'}`;
        btn = document.getElementById("gvgCurrAgeCopyID");
        if(btn) btn.style = `display: ${collapse.collapsegvgCurrAge ? 'none' : 'block'}`;
        btn = document.getElementById("gvgAllGuildsPowerCopyID");
        if(btn) btn.style = `display: ${collapse.collapsegvgAllGuildsPower ? 'none' : 'block'}`;

        ["gvgGuildPowerWrapper", "gvgCurrAgeWrapper", "gvgAllGuildsPowerWrapper"].forEach( element => {
            var wrapperDiv = document.getElementById(element);
            if (wrapperDiv) wrapperDiv.style.display = "block";            
        });

        $('body').i18n();

        // console.debug(Guilds,GuildSectors,GuildPower,GVGstatus);
    }
    else {
        console.debug(msg.responseData.length);
    }
}

function copyObj(aObject) {
    // Prevent undefined objects
    // if (!aObject) return aObject;
  
    let bObject = Array.isArray(aObject) ? [] : {};
  
    let value;
    for (const key in aObject) {
  
      // Prevent self-references to parent object
      // if (Object.is(aObject[key], aObject)) continue;
      
      value = aObject[key];
  
      bObject[key] = (typeof value === "object") ? copyObj(value) : value;
    }
  
    return bObject;
  }

function resizeFunc (element, toolValue) {
    const resizeObserver = new ResizeObserver(entries => {
        for (const entry of entries) {
            if (entry.contentRect && entry.contentRect.height && !collapse["collapse"+toolValue] ) setToolOption(toolValue, entry.contentRect.height);
        }
    });
    resizeObserver.observe(element);
}

function buildGvgInnerDiv(parentDiv, copyFunc, collapseFunc, collapseVar, name, text){

    var wrapperDiv;
    var headlineDiv;
    var textDiv;
    
    if (!document.getElementById(`gvg${name}Wrapper`)){
        wrapperDiv = document.createElement('div');
        wrapperDiv.id = `gvg${name}Wrapper`;
        wrapperDiv.className = `alert alert-success nopadding collapse${!collapse.collapseGVGinfo ? ' show' : ''}`;
        parentDiv.appendChild(wrapperDiv);
        headlineDiv = document.createElement('div');
        headlineDiv.id = `gvg${name}Headline`;
        headlineDiv.className = `collapse${!collapse.collapseGVGinfo ? ' show' : ''}`;
        wrapperDiv.style.display = "none";
        wrapperDiv.appendChild(headlineDiv);
        headlineDiv.innerHTML = `<p id="gvg${name}TextLabel" href="#gvg${name}Text" data-bs-toggle="collapse">
            <svg class="bi header-icon" id="gvg${name}Icon" href="#gvg${name}Text" data-bs-toggle="collapse" fill="currentColor" width="12" height="16"><use xlink:href="${icons}#${collapseVar ? 'plus' : 'dash'}-circle"/></svg>
            <span id=gvg${name}HeadlineText><strong>${text}:</strong></span></p>
            <button type="button" class="badge rounded-pill bg-success float-end full-right-button" id="gvg${name}CopyID" style="display: none"><span data-i18n="copy">Copy</span></button>`;
        textDiv = document.createElement('div');
        textDiv.id = `gvg${name}Text`;
        textDiv.className = `collapse${!collapseVar ? ' show' : ''} overflow`;
        textDiv.style=`height: 0px`;
        wrapperDiv.appendChild(textDiv);
    }

    var label = document.getElementById(`gvg${name}TextLabel`)
    label.addEventListener("click", collapseFunc);
    document.getElementById(`gvg${name}CopyID`).addEventListener("click", copyFunc);

}

export function deploySiegeArmy(msg) {
    console.debug('Siege Placed', msg);
}
export function grantIndependence(msg) {
    console.debug('Grant Freedom', msg);
}
