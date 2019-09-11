//游戏主文件
import {ResourceLoader} from "./js/base/ResourceLoader.js";
import {DataStore} from "./js/base/DataStore.js";
import {Director} from "./js/Director.js";
import {Background} from "./js/runtime/Background.js";
import {Land} from "./js/runtime/Land.js";
import {Bird} from "./js/player/Bird.js";
import {Score} from "./js/player/Score.js";


export class Main {
    constructor(){
        this.canvas = document.getElementById('bird');
        //获取canvas画笔
        this.ctx = this.canvas.getContext('2d');
        this.dataStore = DataStore.getInstance();
        this.director = Director.getInstance();
        //加载图片资源
        const loader = new  ResourceLoader();
        loader.onLoaded(map =>this.onFirstLoaded(map));
    }
    onFirstLoaded(map){
        this.dataStore.res = map;
        this.dataStore.ctx = this.ctx;
        this.init();
    }
    //初始化游戏
    init(){
        //添加背景对象
        this.dataStore.put('background',new Background());
        //添加陆地
        this.dataStore.put('land',new Land());
        //添加铅笔
        this.dataStore.put('pencils',[]);
        this.director.createPencil();
        //添加分数
        this.dataStore.put('score',new Score())
        //添加一个小鸟
        this.dataStore.put('bird',new Bird());
        this.director.isGameOver = false;
        this.director.run();
        this.registerEvent();

    }
    //注册事件
    registerEvent() {
        this.canvas.addEventListener('touchstart', e => {
            //屏蔽事件冒泡
            e.preventDefault();
            if (this.director.isGameOver) {
                this.init();
            } else {
                this.dataStore.get('bird').birdClick();
            }
        })
    }
}