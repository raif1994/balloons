import Game from "./Game";
import GameData from "./GameData";
import DialogsController from "../Controllers/DialogsController";

export default class MainController {


    private static _instance: MainController = null;
    public static get instance() { return this._instance || (this._instance = new this()) }

    private _game = new Game()
    static get game() { return this.instance._game }

    private _gameData = new GameData()
    static get gameData() { return this.instance._gameData }
    private _dC = new DialogsController()
    static get dC() { return this.instance._dC }
}
