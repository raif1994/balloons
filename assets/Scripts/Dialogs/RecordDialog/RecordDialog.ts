import DataItem from "./DataItem";
import Dialog from "../Dialog";
import MainController from "../../Core/MainController";

const { ccclass, property } = cc._decorator;

@ccclass
export default class RecordDialog extends Dialog{

    @property(cc.Prefab) item: cc.Prefab = null
    @property(cc.Node) content: cc.Node = null
    private isInited: boolean = false
    private dataItems: DataItem[] = []
    onLoad() {
        let gameData = MainController.gameData
        if (!this.isInited) {
            for (let i = 0; i < gameData.recordItemCount; i++) {
                var newItem = cc.instantiate(this.item)
                this.content.addChild(newItem)
                newItem.getComponent(DataItem).init(i + 1, gameData.data[i].name, gameData.data[i].score)
                this.dataItems.push(newItem.getComponent(DataItem))
            }
        }
        else {
            for (let i = 0; i < gameData.recordItemCount; i++) {
                this.dataItems[i].init(i + 1, gameData.data[i].name, gameData.data[i].score)
            }
        }
    }

}
