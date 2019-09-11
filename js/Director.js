//负责游戏逻辑控制
import {DataStore} from "./base/DataStore.js";
import {UpPencil} from "./runtime/UpPencil.js";
import {DownPencil} from "./runtime/DownPencil.js";
import {Rectangle} from "./base/Rectangle.js";


export class Director {
    constructor(){
        this.dataStore = DataStore.getInstance();
    }
    static getInstance(){
        if(!Director.instance){
            Director.instance = new Director();
        }
        return Director.instance;
    }

    //创建一对铅笔
  createPencil(){
        const minTop = window.innerHeight / 8;
        const maxTop = window.innerHeight / 2;
        const top = minTop + (Math.random() * (maxTop - minTop));
        this.dataStore.get('pencils').push(new UpPencil(top));
        this.dataStore.get('pencils').push(new DownPencil(top));
  }
    //判断是否应该生成一对铅笔
    isCreatePencil() {
        const pencils = this.dataStore.get('pencils');
        //判断第一对铅笔右边缘走过屏幕的一边，并且铅笔数组中只能有两个
        if ((pencils[0].x + pencils[0].width) < (window.innerWidth / 2) && pencils.length == 2) {
            this.createPencil();
        }
    }

    //移除铅笔的判断
    outPencil() {
        const pencils = this.dataStore.get('pencils');
        //判断第一对铅笔右边缘走过屏幕左边缘，并且铅笔数组中有4个
        if ((pencils[0].x + pencils[0].width) < 0 && pencils.length == 4) {
            pencils.shift();
            pencils.shift();
            this.dataStore.get('score').isScore = true;
        }
    }

    //小鸟碰撞碰撞地板检测
    crashLand(){
        let s = false;
        const bird = this.dataStore.get('bird');
        const land = this.dataStore.get('land');
        if (bird.y + bird.offSet + bird.height >= land.y){
           s = true;

        }
        return s;
    }

    //小鸟碰撞铅笔的判断方法
    crashPencil() {

        const pencils = this.dataStore.get('pencils');
        const bird = this.dataStore.get('bird');

        /* const birdBorder = {
             x: bird.x,
             y: bird.y + bird.offset,
             width: bird.width,
             height: bird.height
         };*/

        //先创建小鸟的矩形
        const birdRect = new Rectangle(bird.x, bird.y + bird.offSet, bird.width, bird.height);

        for ( let pencil of pencils) {

            /*const pencilBorder = {
                x: pencil.x,
                y: pencil.y,
                width: pencil.width,
                height: pencil.height
            };*/
            const pencilRect = new Rectangle(pencil.x, pencil.y, pencil.width, pencil.height);
            if (birdRect.intersects(pencilRect)) {
                return true;
            }

        }
        return false;
    }
    addScoreNumber(){
        const pencils = this.dataStore.get('pencils');
        const bird = this.dataStore.get('bird');
        const score = this.dataStore.get('score');
        if (bird.x + bird.width >= pencils[0].x && score.isScore){
            score.scoreNumber++
            score.isScore = false;
        }
    }


    //控制游戏运行
    run(){
        //图片的名字，图片x,y ,裁剪宽度，裁剪高度，画布x,y 画的宽度，高度
        /*this.dataStore.ctx.drawImage(this.dataStore.res.get('background'),
            0,
            0,
            this.dataStore.res.get('background').width,
            this.dataStore.res.get('background').height,
            0,
            0,
            this.dataStore.res.get('background').width,
            this.dataStore.res.get('background').height);*/


        if (!this.isGameOver){

            //绘制背景
            this.dataStore.get('background').draw();
            //绘制铅笔
            for (let pencil of this.dataStore.get('pencils')){
                pencil.draw();
            }
            //绘制陆地
            this.dataStore.get('land').draw();
            //移除铅笔
            this.outPencil();
            //调用判断是否生成铅笔的逻辑
            this.isCreatePencil();
            //绘制小鸟
            this.dataStore.get('bird').draw();
            this.addScoreNumber();
            //绘制分数
            this.dataStore.get('score').draw();

            if(this.crashPencil()) {
                this.isGameOver =true;
            }
            if (this.crashLand()){

                this.isGameOver = true;
            }

            //定时器
            let timer = requestAnimationFrame(() => {this.run()});
            this.dataStore.put('timer', timer);

        } else {
            cancelAnimationFrame(this.dataStore.get('timer'));
        }
    }
}