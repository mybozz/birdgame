import {Spirit} from "../base/Spirit.js";
import {DataStore} from "../base/DataStore.js";


export class Bird extends Spirit{
    constructor() {
        super(DataStore.getInstance().res.get('birds'));

        this.x = window.innerWidth / 8;
        this.y = window.innerHeight / 2.5;

        //小鸟宽34，高24，上下边距10，左右边距9
        this.cutX = [
            9,
            9 + 34 + 18,
            9 + 34 +18 + 34 + 18
        ];
        this.cutY = [
            10, 10, 10
        ];
        this.width = 34;
        this.height = 24;

        this.index = 0;
        this.count = 0;
        //表示时间，用来做自由落体运动
        this.time = 0;
        this.offSet = 0;

    }

    draw() {

        //小鸟的垂直移动
        const g = 0.98 / 2.4;
        //起始偏移量
        const offSetUp = 30;

        this.offSet = (g * this.time * (this.time - offSetUp)) / 2;
        this.time++;

        let num = this.index;

        this.dataStore.ctx.drawImage(
            this.image,
            this.cutX[num],
            this.cutY[num],
            34,
            24,
            this.x,
            this.y + this.offSet,
            34,
            24
        );

        this.count += 0.1;
        this.index = Math.floor(this.index + this.count);
        if (this.index == 2) {
            this.index = 0;
            this.count = 0;
        }
    }

    birdClick() {
        this.time = 0;
        //改变y
        this.y = this.y + this.offSet;
        if (this.y <= 0) {
            this.y = 0;
        }

    }
}
