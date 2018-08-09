import FinishDialog from "../Dialogs/FinishDialog";
import Balloon from "../Core/Balloon";
import AudioController from "../Controllers/AudioController";
import MainController from "../Controllers/MainController";
const { ccclass, property } = cc._decorator;

@ccclass
export default class GameScene extends cc.Component {


    @property(cc.Prefab) balloonPrefab: cc.Prefab = null
    @property(cc.Node) balloonsParent: cc.Node = null
    @property(cc.Label) scoreText: cc.Label = null
    @property([cc.Sprite]) lifesSprite: cc.Sprite[] = []

    onLoad() {

        MainController.game.gameScene = this
        MainController.game.startGame()
    }
    createBalloon() {
        if (!MainController.game.finish) {
            let screenWidth = cc.winSize.width
            let screenHeight = cc.winSize.height

            let balloon = cc.instantiate(this.balloonPrefab)
            balloon.parent = this.balloonsParent

            let balloonPositionX = Math.floor(Math.random() * (screenWidth - balloon.width)) - screenWidth / 2 + balloon.width / 2
            balloon.setPosition(balloonPositionX, -screenHeight / 2 - balloon.height)

            balloon.getComponent(Balloon).hitCount = MainController.game.balloonHitCount
            balloon.getComponent(Balloon).hitCountLabel.string = MainController.game.balloonHitCount.toString()

            let move = cc.moveTo((Math.random() * 4) + MainController.game.balloonFlyTime, balloonPositionX, screenHeight - balloon.height)
            let remove = cc.removeSelf()
            let finish = cc.callFunc(() => MainController.game.lossingLifes())
            let seq = cc.sequence(move, finish, remove)
            balloon.runAction(seq)
        }
    }
    public updateScoreLabel(score) {
        this.scoreText.string = "Результат : " + score
    }
    public showFinish(score) {
        MainController.dC.openDialog("FinishDialog", score)
    }
    openPauseDialog() {
        MainController.dC.openDialog("PauseDialog")
    }
}
