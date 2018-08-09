import GameScene from "../Scenes/GameScene";

export default class Game {

    private _gameScene: GameScene = null

    private _score: number = 0
    private _lifes: number = 5
    private _balloonFlyTime: number = 3.5
    private _finish: boolean = false
    private _balloonHitCount: number = 1
    public get gameScene() { return this._gameScene }
    public set gameScene(gameScene) { this._gameScene = gameScene }


    public get finish() { return this._finish }
    public get lifes() { return this._lifes }
    public get balloonFlyTime() { return this._balloonFlyTime }
    public get balloonHitCount() { return this._balloonHitCount }

    static diffMap = new Map<number, {}>([
        [20, { t: 3, hc: 2 }],
        [40, { t: 2.5, hc: 3 }],
        [70, { t: 1.5, hc: 4 }],
        [100, { t: 1, hc: 5 }],
    ])

    startGame() {
        this._finish = false
        this._score = 0
        this._balloonFlyTime = 3.5
        this._balloonHitCount = 1
        this._lifes = 5
        this._gameScene.updateScoreLabel(this._score)
        this.runGenerator()
        this._gameScene.balloonsParent.removeAllChildren()
        for (let s of this._gameScene.lifesSprite) { s.enabled = true }
    }

    addScore() {
        this._gameScene.updateScoreLabel(++this._score)
        this.gameDifficulty(this._score)
    }
    private gameDifficulty(score) {
        Game.diffMap.forEach((v, k) => {
            if (score >= k) { this._balloonFlyTime = v['t']; this._balloonHitCount = v['hc'] }
        });
    }
    lossingLifes() {
        if (!this._finish) {
            this._gameScene.lifesSprite[--this._lifes].enabled = false
            if (this._lifes == 0) {
                this._finish = true
                this._gameScene.showFinish(this._score)
                this._gameScene.balloonsParent.removeAllChildren()
            }
        }
    }

    private runGenerator() {
        this._gameScene.schedule(this._gameScene.createBalloon, (Math.random() * (1 - 0.5)) + 0.5)
    }
}
