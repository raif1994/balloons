import AudioController from "../AudioControl/AudioController";
import MainController from "./MainController";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Balloon extends cc.Component {
    @property level: number = 0
    @property(cc.Label) levelText: cc.Label = null
    destroySnd: cc.AudioSource = null

    
    onLoad() {

        let r = Math.floor(Math.random() * 255) - 0
        let g = Math.floor(Math.random() * 255) - 0
        let b = Math.floor(Math.random() * 255) - 0
        this.node.color = cc.color(r, g, b, 255)
        this.destroySnd = this.node.getComponent(cc.AudioSource)


        this.node.on(cc.Node.EventType.TOUCH_START, () => {
            this.level--;
            this.levelText.string = this.level.toString()
            if (this.level == 0) {
                AudioController.playEffect(this.destroySnd)
                this.levelText.enabled = false
                this.node.stopAllActions()
                this.node.getComponent(cc.Animation).enabled = false;
                var destroy = cc.callFunc(() => this.node.destroy())
                var scale = cc.scaleTo(0.2, 0.0, 0)
                var seq = cc.sequence(scale, destroy)
                this.node.runAction(seq)
                MainController.game.addScore()
            }

        }, this)
    }

}
