import {Spirit} from "../base/Spirit.js";

export class Pencil extends Spirit{
    constructor(image,top) {
        super(
            image,
            0,
            0,
            image.width,
            image.height,
            window.innerWidth,
            0,
            image.width,
            image.height
        );
        this.top = top;
        this.moveSpeed = 2;
    }
    draw() {
        this.x = this.x - this.moveSpeed;
        super.draw();
    }
}