import Dialog from "./Dialog";
import AudioController from "../AudioControl/AudioController";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SettingsDialog extends Dialog {

    @property(cc.Toggle) soundToggle: cc.Toggle = null
    @property(cc.Toggle) musicToggle: cc.Toggle = null


    onLoad() {
        if (AudioController.effectVolume == 1) { this.soundToggle.isChecked = true }
        else { this.soundToggle.isChecked = false }

        if (AudioController.musicVolume == 1) { this.musicToggle.isChecked = true }
        else { this.musicToggle.isChecked = false }
    }

    soundToggleHandler() {
        this.soundToggle.isChecked ? AudioController.effectVolume = 1 : AudioController.effectVolume = 0
    }
    musicToggleHandler() {
        this.musicToggle.isChecked ? AudioController.musicVolume = 1 : AudioController.musicVolume = 0
    }


}
