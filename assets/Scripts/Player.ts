import GameManager from "./GameManager";
import UIRoot from "./UIRoot";
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
export default class Player extends cc.Component {

    //单例
    public static Instance: Player = null;
    //刚体
    @property(cc.RigidBody)
    rigibody: cc.RigidBody = null;
    //初始坐标
    initPosition:cc.Vec2;
    //初始旋转
    initRotation:number;
    //力的强度
    @property
    forceIntension:number = 750;
    @property(cc.Node)
    mouseNode:cc.Node = null;
    @property(cc.Animation)
    anim:cc.Animation = null;
    //是否死亡
    isDie:boolean = false;
    getIsDie(){
        return this.isDie;
    }
    setIsDie(die){
        this.isDie = die;
        if(this.isDie){
            GameManager.setIsPlay(false);
        }
    }

    //游戏开始与结束处理
    setPlay(play){
        if(play)
        {
            this.setIsDie(false);
            this.node.setPosition(this.initPosition);
            //开始刚体受力
            this.rigibody.type = cc.RigidBodyType.Dynamic;
            this.anim.enabled = true;
        }
        else
        {
            //关闭刚体受力并复位
            this.rigibody.linearVelocity = cc.Vec2.ZERO;
            this.anim.enabled = false;
            UIRoot.setResetButtonOpen();
        }
    }

    onLoad() {
        //单例
        Player.Instance = this;
    }

    start() {
        //记录初始坐标旋转
        this.initPosition = this.node.position;
        this.initRotation = this.node.rotation;
        this.mouseNode.on(cc.Node.EventType.TOUCH_START, function (event) {
            this.flyOne();
          }, this);
    }

    //飞一下
    flyOne(){
        if(!GameManager.getIsPlay()){
            return;
        }
        if (this.rigibody == null)
        {
            return;
        }
        //施加一个向上的力
        this.rigibody.linearVelocity = new cc.Vec2(0,this.forceIntension);

        // //停止所有定时器
        // CancelInvoke();
        // //开启定时器 0秒后开始执行 每0.02f秒执行一次
        // InvokeRepeating("OnZLerpMax", 0, 0.02f);


        //播放声音
        AudioManager.Play(AudioType.sfx_wing);
    }



    // update (dt) {}
}
