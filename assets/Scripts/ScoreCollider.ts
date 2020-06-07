import AudioManager, { AudioType } from "./AudioManager";
import GameManager from "./GameManager";

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class ScoreCollider extends cc.Component {

    onCollisionExit(other) {
        if(!GameManager.getIsPlay()){
            return;
        }
        //如果碰撞到的是Player
        if (other.node.name == "PlayerBird") {
            GameManager.setScore(GameManager.getScore() + 1);
            AudioManager.Play(AudioType.sfx_point);
        }
    }
}
