import Player from "./Player";
import AudioManager, { AudioType } from "./AudioManager";

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class PipeCollider extends cc.Component {

    onCollisionEnter(other) {
        //如果碰撞到的是Player
        if (other.node.name == "PlayerBird") {
            if (!Player.Instance.getIsDie()) {
                Player.Instance.setIsDie(true);
                cc.log("碰撞Player--死亡");
                //碰撞音效
                AudioManager.Play(AudioType.sfx_hit);
            }
        }
    }
}
