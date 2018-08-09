const { ccclass, property } = cc._decorator;

@ccclass
export default class Dialog extends cc.Component {

    @property(cc.Node)
    dialog: cc.Node = null

    openDialog() {
        let open = cc.callFunc(() => this.dialog.active = true)
        let fadeIn = cc.fadeIn(0.2)
        var seq = cc.sequence(open,fadeIn)
        this.node.runAction(seq)
        
    }
    closeDialog() {
        var fadeOut = cc.fadeOut(0.05)
        this.node.runAction(fadeOut)
        this.dialog.active = false
    }
}
