import {DataStore} from "../base/DataStore.js";

export  class Score {
    constructor() {
        this.scoreNumber = 0;
        this.isScore = true;
    }

    draw() {
        let ctx = DataStore.getInstance().ctx;
        //设置画笔字体
        ctx.font = '25px Arial';
        //设置颜色
        ctx.fillStyle = '#ffcbeb';
        ctx.fillText(
            this.scoreNumber,
            window.innerWidth / 2,
            window.innerHeight / 18,
            1000);
    }
}