import Player from "./Player";
import Ground from "./Ground";
import UIRoot from "./UIRoot";

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
export default class GameManager extends cc.Component {
    //单例
    public static Instance:GameManager = null;

    private static score:number = 0;
    //钢管预制体
    @property(cc.Node)
    ground: cc.Node = null;
    onLoad(){
        GameManager.Instance = this;
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getCollisionManager().enabled = true;
    }
    //游戏是否开始
    private static IsPlay:boolean = false;

    public static getScore(){
        return GameManager.score;
    }

    public static setScore(sc:number){
        GameManager.score = sc;
        UIRoot.setScore(sc);
    }

    static setIsPlay(play){
        if(play){
            //关闭所有钢管显示
            for(var i = 0; i < GameManager.Instance.ground.childrenCount; i++){
                var g =  GameManager.Instance.ground.children[i].getComponent("Ground");
                if(g!=null){
                    g.PipeActive();
                }
            }
            GameManager.setScore(0);
        }
        GameManager.IsPlay = play;
        //设置Player开始
        Player.Instance.setPlay(play);
    }

    static getIsPlay(){
        return GameManager.IsPlay;
    }
}
