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

const { ccclass, property } = cc._decorator;

@ccclass
export default class UIRoot extends cc.Component {

    private static Instance: UIRoot = null;

    //设置重新开始按钮打开
    public static setResetButtonOpen() {
        UIRoot.Instance.reset.node.active = true;
    }

    //游戏开始Button
    @property(cc.Button)
    playButton: cc.Button = null;

    //重新开始Button
    @property(cc.Button)
    reset: cc.Button = null;

    
    //分数
    @property(cc.Label)
    score: cc.Label = null;

    onPlayEvent: cc.Component.EventHandler = new cc.Component.EventHandler();
    onResetEvent: cc.Component.EventHandler = new cc.Component.EventHandler();
    onLoad() {
        UIRoot.Instance = this;
    }

    start() {
        this.onPlayEvent.target = this.node;
        this.onPlayEvent.component = "UIRoot";
        this.onPlayEvent.handler = "OnPlayClick";
        if (this.playButton != null) {
            this.playButton.clickEvents.push(this.onPlayEvent);
        }

        this.onResetEvent.target = this.node;
        this.onResetEvent.component = "UIRoot";
        this.onResetEvent.handler = "onResetClick";
        if (this.reset != null) {
            this.reset.clickEvents.push(this.onResetEvent);
        }
    }
    OnPlayClick() {
        cc.log("游戏开始");
        GameManager.setIsPlay(true);
        this.playButton.node.active = false;
        this.score.node.active = true;
    }
    onResetClick() {
        cc.log("游戏开始");
        GameManager.setIsPlay(true);
        this.reset.node.active = false;
        this.score.node.active = true;
    }

    public static setScore(sc:number){
        UIRoot.Instance.score.string = sc.toString();
    }
}
