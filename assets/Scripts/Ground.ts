import GameManager from "./GameManager";
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
export default class Ground extends cc.Component {

    //单个地面宽度
    @property
    width: number = 720;
    //背景循环个数
    @property
    groundNumber: number = 3;
    //地面移动速度
    @property
    moveSpeed: number = 200;
    //x临界值
    @property
    cutOffX: number = -720;
    //钢管预制体
    @property(cc.Prefab)
    pipe: cc.Prefab = null;
    //钢管实例
    //@property(cc.Node)
    pipeInstan: cc.Node = null;


    onBeginContact(contact, selfCollider, otherCollider) {
        //如果碰撞到的是Player
        if (otherCollider.node.name == "PlayerBird") {
            if (!Player.Instance.getIsDie()) {
                Player.Instance.setIsDie(true);
                cc.log("碰撞Player--死亡");
                //碰撞音效
                AudioManager.Play(AudioType.sfx_hit);
            }
        }
    }


    PipeActive() {
        if (this.pipeInstan != null) {
            this.pipeInstan.active = false;
        }
    }

    //生成钢管
    InstancePipe() {
        if (!GameManager.getIsPlay()) {
            return;
        }
        //如果钢管不存在 则实例化
        if (this.pipeInstan == null) {
            this.pipeInstan = cc.instantiate(this.pipe);
            this.pipeInstan.parent = this.node.parent;
            this.pipeInstan.position = this.node.getPosition();
            this.pipeInstan.setSiblingIndex(0);
        }

        this.pipeInstan.active = false;
        this.pipeInstan.active = true;
    }

    update(dt) {
        if (Player.Instance.getIsDie()) {
            return;
        }
        var v2 = this.node.position;
        v2.x -= this.moveSpeed * dt;
        this.node.setPosition(v2);
        //判断X坐标是否小于左临界值
        if (this.node.position.x < this.cutOffX) {
            var v2 = this.node.position;
            v2.x += this.width * this.groundNumber;
            //改变x坐标 移动到最右边
            this.node.setPosition(v2);

            this.InstancePipe();
        }
        if (this.pipeInstan != null) {
            this.pipeInstan.setPosition(this.node.position);
            //cc.log(this.pipeInstan.position);
        }
    }
}
