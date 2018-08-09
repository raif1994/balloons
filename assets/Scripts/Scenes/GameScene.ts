import FinishDialog from "../Dialogs/FinishDialog";
import Balloon from "../Core/Balloon";
import AudioController from "../AudioControl/AudioController";
import MainController from "../Core/MainController";
const { ccclass, property } = cc._decorator;

@ccclass
export default class GameScene extends cc.Component {


    @property(cc.Prefab) balloonPrefab: cc.Prefab = null
    @property(cc.Node) balloonsParent: cc.Node = null
    @property(cc.Label) scoreText: cc.Label = null
    @property([cc.Sprite]) lifesSprite: cc.Sprite[] = []
    @property(FinishDialog) finishDialog: FinishDialog = null
    @property(cc.AudioSource) music: cc.AudioSource = null

    onLoad() {

        MainController.game.gameScene = this
        MainController.game.startGame()
        AudioController.playMusic(this.music)
    }
    public updateScoreLabel(score) {
        this.scoreText.string = "Результат : " + score
    }
    public showFinish(score) {
        this.balloonsParent.removeAllChildren()
        this.finishDialog.finishDialogOpen(score)
    }
    createBalloon() {
        if (!MainController.game.finish) {
            let screenWidth = cc.winSize.width
            let screenHeight = cc.winSize.height

            let balloon = cc.instantiate(this.balloonPrefab)
            balloon.parent = this.balloonsParent

            let balloonPositionX = Math.floor(Math.random() * (screenWidth - balloon.width)) - screenWidth / 2 + balloon.width / 2
            balloon.setPosition(balloonPositionX, -screenHeight / 2 - balloon.height)

            balloon.getComponent(Balloon).level = MainController.game.level
            balloon.getComponent(Balloon).levelText.string = MainController.game.level.toString()
            let move = cc.moveTo((Math.random() * 4) + MainController.game.speed, balloonPositionX, screenHeight - balloon.height)
            let remove = cc.removeSelf()
            let finish = cc.callFunc(() => MainController.game.lossingLifes())
            var seq = cc.sequence(move, finish, remove)
            balloon.runAction(seq)
        }
    }
}
