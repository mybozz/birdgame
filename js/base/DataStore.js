//数据存储类
//利用map集合存储
export  class DataStore {
    constructor(){
        this.map = new Map();
    }
    put(key,value){
        this.map.set(key,value);
    }
    get(key){
        return this.map.get(key);
    }
    //单例模式
    static getInstance(){
        if (!DataStore.instance){
            DataStore.instance = new DataStore();
        }
        return DataStore.instance;
    }
    //清空数据方法
    destory(){
        this.map.clear();
    }

}