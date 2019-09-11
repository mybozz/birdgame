//加载资源类
import Resource from './Resource.js';
export class ResourceLoader {
    //存储所有image对象(资源的数组转换成map)
    constructor(){
        this.map = new Map(Resource);
        // console.log(this.map);
        for (let [key,value] of this.map){
            const image = new Image();
            image.src = value;
            //创建好的image放大map中
            this.map.set(key,image);
            //console.log(this.map);
        }
    }
    //浏览器加载完成
    onLoaded(callback){
        //计数器
        let loadCount = 0;
        for (let value of this.map.values()){
            //console.log(value);
            value.onload = () => {
                loadCount++;
                if (loadCount >= this.map.size){
                    // 调用回调函数传递map集合
                    callback(this.map)
                }
            }
        }
    }
}