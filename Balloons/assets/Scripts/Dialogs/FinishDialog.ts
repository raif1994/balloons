import Dialog from "./Dialog";
import MainController from "../Controllers/MainController";
import Audio from "../Audio";

const { ccclass, property } = cc._decorator;

@ccclass
export default class FinishDialog extends Dialog {
    @property(cc.Label) scoreText: cc.Label = null
    @property(cc.EditBox) resultBox: cc.EditBox = null
    @property(cc.Button) saveButton: cc.Button = null
    @property(cc.Node) inputNode: cc.Node = null
    private result: number = 0
    finishSnd: Audio = null

    onLoad() {
        this.finishSnd = this.node.getComponent(Audio)
    }

    openDialog(cb) {
        this.finishSnd.playSound()
        super.openDialog(cb)
    }

    setScore(score) {
        this.scoreText.string = score.toString()
        this.inputNode.active = MainController.gameData.checkScore(score)
        this.result = score

    }
    checkMinimalLettersCount() {
        this.saveButton.interactable = this.resultBox.string.length >= 3
    }

    saveBtnHandler() {
        MainController.gameData.newRecord(this.resultBox.string, this.result)
        this.inputNode.active = false
    }

    menuBtn() {
        cc.director.loadScene("Menu")
        cc.game.resume()
    }
    restartBtn() {
        this.closeDialog()
        MainController.game.startGame()
        cc.game.resume()
    }

}

