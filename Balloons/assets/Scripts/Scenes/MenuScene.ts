import AudioController from "../Controllers/AudioController";
import MainController from "../Controllers/MainController";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MenuScene extends cc.Component {

    @property(cc.Node) balloon1: cc.Node = null
    @property(cc.Node) balloon2: cc.Node = null
    @property(cc.Node) label: cc.Node = null
    @property(cc.Node) settingsBtn: cc.Node = null
    @property(cc.Node) recordBtn: cc.Node = null
    @property(cc.Node) playBtn: cc.Node = null
    @property(cc.BlockInputEvents) block: cc.BlockInputEvents = null

    onLoad() {
        let r = Math.floor(Math.random() * 255) - 0
        let g = Math.floor(Math.random() * 255) - 0
        let b = Math.floor(Math.random() * 255) - 0
        this.balloon1.color = cc.color(r, g, b, 255)
        this.balloon2.color = cc.color(r, g, b, 255)
        this.startAnimation()
    }

    startAnimation() {
        var move = cc.moveTo(3, 0, 246)
        var balloon1Move = cc.moveBy(2, cc.p(cc.winSize.width - 40, cc.winSize.height - 40))
        var balloon2Move = cc.moveBy(2, cc.p(cc.winSize.width + 40, cc.winSize.height + 40))
        var ballonsMoveAcion = cc.callFunc(() => {
            this.balloon1.runAction(balloon1Move)
            this.balloon2.runAction(balloon2Move)
        })
        var balloonsDestroy = cc.callFunc(() => {
            this.balloon1.destroy()
            this.balloon2.destroy()
        })
        var startBtnsAnim = cc.callFunc(() => {
            this.settingsBtnAnimation()
            this.recordBtnAnimation()
            this.playBtnAnimation()
            this.block.enabled = false
        })
        var seq = cc.sequence(move, ballonsMoveAcion, cc.delayTime(1), balloonsDestroy, cc.delayTime(0.5), startBtnsAnim)
        this.label.runAction(seq)
    }
    settingsBtnAnimation() {
        let posX = cc.winSize.width / 2 - this.settingsBtn.width / 2
        let posY = cc.winSize.height / 2 - this.settingsBtn.height / 2
        var move = cc.moveTo(1, posX, posY)
        this.settingsBtn.runAction(move)
    }
    recordBtnAnimation() {
        let posX = -cc.winSize.width / 2 + this.settingsBtn.width / 2
        let posY = cc.winSize.height / 2 - this.settingsBtn.height / 2
        var move = cc.moveTo(1, posX, posY)
        this.recordBtn.runAction(move)
    }
    playBtnAnimation() {
        var fade = cc.fadeIn(1)
        this.playBtn.runAction(fade)
    }
    playBtnClick() {
        cc.director.loadScene("Game")
    }
    openSettingsDialog() {
        MainController.dC.openDialog("SettingsDialog")
    }
    openRecordsDialog() {
        MainController.dC.openDialog("RecordsDialog")
    }

}
