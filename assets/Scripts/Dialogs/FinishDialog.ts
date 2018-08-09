import Dialog from "./Dialog";
import MainController from "../Core/MainController";

const { ccclass, property } = cc._decorator;

@ccclass
export default class FinishDialog extends Dialog {
    @property(cc.Label) scoreText: cc.Label = null
    @property(cc.EditBox) resultBox: cc.EditBox = null
    @property(cc.Button) saveButton: cc.Button = null
    @property(cc.Node) lablesNode: cc.Node = null
    private result: number = 0
    finishSnd: cc.AudioSource = null

    onLoad() {
        this.finishSnd = this.node.getComponent(cc.AudioSource)
    }

    finishDialogOpen(score) {
        this.finishSnd.play()
        let open = cc.callFunc(() => this.openDialog())
        let loadData = cc.callFunc(() => {
            this.scoreText.string = score.toString()
            if (MainController.gameData.checkScore(score)) {
                this.resultBox.node.active = true
                this.saveButton.node.active = true
                this.lablesNode.setPositionY(0)
            }
            this.result = score
        })
        var seq = cc.sequence(open, loadData)
        this.node.runAction(seq)
    }

    checkMinimalLettersCount() {
        if (this.resultBox.string.length < 3) {
            this.saveButton.interactable = false
        } else {
            this.saveButton.interactable = true
        }

    }

    saveBtnHandler() {
        MainController.gameData.newRecord(this.resultBox.string, this.result)
        this.resultBox.node.active = false
        this.saveButton.node.active = false
        this.lablesNode.setPositionY(-67)
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

