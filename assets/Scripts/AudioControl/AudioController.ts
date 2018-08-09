
export default class AudioController {

    private static _effectVolume: number = cc.sys.localStorage.getItem("SoundVolume")
    private static _musicVolume: number = cc.sys.localStorage.getItem("MusicVolume")
    private static _currentMusic: cc.AudioSource = null

    static set effectVolume(value) {
        this._effectVolume = value
        cc.sys.localStorage.setItem("SoundVolume", value)
    }

    static set musicVolume(value) {
        this._musicVolume = value
        if (this._currentMusic) this._currentMusic.volume = value
        cc.sys.localStorage.setItem("MusicVolume", value)
    }
    static get effectVolume() { return this._effectVolume }
    static get musicVolume() { return this._musicVolume }

    static playEffect(effect) {
        if (this._effectVolume != 0) effect.play()
    }
    static playMusic(music) {
        this._currentMusic = music
        music.volume  = this._musicVolume
        music.play()
    }
}
