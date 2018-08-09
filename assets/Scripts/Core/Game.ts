import GameScene from "../Scenes/GameScene";

export default class Game {

    private _gameScene: GameScene = null

    private _score: number = 0
    private _lifes: number = 5
    private _speed: number = 3.5
    private _finish: boolean = false
    private _level: number = 1
    public get gameScene() { return this._gameScene }
    public set gameScene(gameScene) { this._gameScene = gameScene }


    public get finish() { return this._finish }
    public get lifes() { return this._lifes }
    public get speed() { return this._speed }
    public get level() { return this._level }


    public startGame() {
        this._finish = false
        this._score = 0
        this._speed = 3.5
        this._level = 1
        this._lifes = 5
        this._gameScene.updateScoreLabel(this._score)
        this.runGenerator()
        for (let i = 0; i < 5; i++) {
            this._gameScene.lifesSprite[i].enabled = true
        }
    }

    public addScore() {
        this._gameScene.updateScoreLabel(++this._score)
        this.gameDifficulty(this._score)
    }
    private gameDifficulty(score: number) {
        if (score >= 40) {
            this._speed = 3
            this._level = 2
        }
        if (score >= 80) {
            this._speed = 2.5
            this._level = 3
        }
        if (score >= 120) {
            this._speed = 1.5
            this._level = 4
        }
        if (score >= 200) {
            this._speed = 1
            this._level = 5
        }
    }
    public lossingLifes() {
        if (!this._finish) {
            this._gameScene.lifesSprite[--this._lifes].enabled = false
            if (this._lifes == 0) {
                cc.log("lose")
                this._finish = true
                this._gameScene.showFinish(this._score)
            }
        }
    }

    private runGenerator() {
        this._gameScene.schedule(this._gameScene.createBalloon, (Math.random() * (1 - 0.5)) + 0.5)
    }
}
