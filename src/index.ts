/// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

// The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure.
bootstrapExtra().catch(e => console.error(e));

WA.chat.sendChatMessage('Hello world', 'Mr Robot');


let currentPopup: any = undefined;
const today = new Date();
const time = today.getHours() + ":" + today.getMinutes();



WA.room.onEnterZone('nyan', () => {
    currentPopup =  WA.ui.openPopup("clockPopup","It's " + time,[]);
})

WA.room.onLeaveZone('nyan', closePopUp)

function closePopUp(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}


WA.room.onEnterZone('communityspace', () => {
    currentPopup =  WA.ui.openPopup("livestream", ".", []);
})

WA.room.onLeaveZone('nyan', closePopUp)

WA.room.onLeaveZone('communityspace', closePopUp)

WA.room.onEnterZone('secret_trigger', () => {
    WA.room.hideLayer('secret_door_outside');
})

WA.room.onLeaveZone('secret_trigger', () => {
    setTimeout(() => {
        WA.room.showLayer('secret_door_outside');
    }, 2000)
})
