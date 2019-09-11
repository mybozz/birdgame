import {Spirit} from "../base/Spirit.js";
import {DataStore} from "../base/DataStore.js";

export class Land extends Spirit{
    constructor() {
        const image = DataStore.getInstance().res.get('land');
        super(image,
            0,
            0,
            image.width,
            image.height,
            0,
            window.innerHeight-image.height,
            image.width,
            image.height
        );
        this.moveSpeed = 2;
    }

    draw() {
        //在父类绘制之前改变x位置
        this.x = this.x -  this.moveSpeed;
        if ((-this.x) > (this.image.width - window.innerWidth)) {
            this.x = 0;
        }
        super.draw();
    }
}