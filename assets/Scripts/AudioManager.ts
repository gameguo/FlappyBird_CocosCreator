// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

//所有声音名称枚举
export enum AudioType {
    sfx_hit,
    sfx_point,
    sfx_wing,
}

const { ccclass, property } = cc._decorator;
@ccclass
export default class AudioManager extends cc.Component {

    //单例
    public static Instance: AudioManager = null;
    @property(cc.AudioClip)
    public audioClip:cc.AudioClip[] = [];

    onLoad(){
        AudioManager.Instance = this;
    }
    public static Play(t: AudioType) {
        switch (t) {
            case AudioType.sfx_hit:
                cc.audioEngine.playEffect(AudioManager.Instance.audioClip[0], false);
                break;
            case AudioType.sfx_point:
                cc.audioEngine.playEffect(AudioManager.Instance.audioClip[1], false);
                break;
            case AudioType.sfx_wing:
                cc.audioEngine.playEffect(AudioManager.Instance.audioClip[2], false);
                break;
            default:
                break;
        }
    }

}
