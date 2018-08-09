import Audio from "../Audio";
import MainController from "../Controllers/MainController";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Balloon extends cc.Component {
    @property hitCount: number = 0
    @property(cc.Label) hitCountLabel: cc.Label = null
    destroySnd: Audio = null

    onLoad() {
        let r = Math.floor(Math.random() * 255) - 0
        let g = Math.floor(Math.random() * 255) - 0
        let b = Math.floor(Math.random() * 255) - 0
        this.node.color = cc.color(r, g, b, 255)
        this.destroySnd = this.node.getComponent(Audio)

        this.node.on(cc.Node.EventType.TOUCH_START, () => {
            this.hitCount--;
            this.hitCountLabel.string = this.hitCount.toString()
            if (this.hitCount == 0) {
                this.destroySnd.playSound()
                this.hitCountLabel.enabled = false
                this.node.stopAllActions()
                this.node.getComponent(cc.Animation).enabled = false

                let deathTime = 0.25                
                let pos = this.node.getPosition()
                let ws = cc.winSize
                let xDirection = pos.x > 0 ? 1 : -1
                let yDirection = Math.random() > 0.5 ? -1 : 1
                let yEnd = pos.y + this.node.height / 4 * yDirection
                let points = new Array(
                    cc.p(pos),
                    cc.p(xDirection * (ws.width / 2 - Math.abs(pos.x)), yEnd),
                    cc.p(xDirection * ws.width / 2, yEnd))
                let bezier = cc.bezierTo(deathTime, points).easing(cc.easeOut(3))
                let rotate = cc.rotateBy(deathTime, xDirection * yDirection * 15).easing(cc.easeOut(3))
                let destroy = cc.callFunc(() => this.node.destroy())
                let scale = cc.scaleTo(deathTime, 0.0, 0)
                let seq = cc.sequence(cc.spawn(scale, bezier, rotate), destroy)
                this.node.runAction(seq)

                MainController.game.addScore()
            }

        }, this)
    }

}
