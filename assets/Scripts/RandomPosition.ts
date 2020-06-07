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
export default class RandomPosition extends cc.Component {
    
    //对象开启时调用
    onEnable() {
        this.StartRandom();
    }
    //随机生成钢管位置
    StartRandom() {
        for(var i = 0; i < this.node.childrenCount; i++){
            var v2 =  this.node.children[i].position;
            v2.y = Math.random() * 600;
            this.node.children[i].setPosition(v2);
        }
    }

}
