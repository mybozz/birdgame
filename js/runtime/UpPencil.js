import {Pencil} from "./Pencil.js";
import  {DataStore} from "../base/DataStore.js";

export class UpPencil extends Pencil{
    constructor(top) {
        super(DataStore.getInstance().res.get('pie_up'),
            top
        );
        this.y = top - this.image.height;
    }
}