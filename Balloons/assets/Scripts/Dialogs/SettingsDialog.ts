import Dialog from "./Dialog";
import AudioController from "../Controllers/AudioController";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SettingsDialog extends Dialog {

    @property(cc.Toggle) soundToggle: cc.Toggle = null
    @property(cc.Toggle) musicToggle: cc.Toggle = null

    onLoad() {
        this.soundToggle.isChecked = AudioController.effectVolume == 1
        this.musicToggle.isChecked = AudioController.musicVolume == 1
    }

    soundToggleHandler() {
        this.soundToggle.isChecked ? AudioController.effectVolume = 1 : AudioController.effectVolume = 0
    }
    musicToggleHandler() {
        this.musicToggle.isChecked ? AudioController.musicVolume = 1 : AudioController.musicVolume = 0
    }


}
