import {Pencil} from "./Pencil.js";
import {DataStore} from "../base/DataStore.js";


export class DownPencil extends Pencil{
    constructor(top) {
        super(DataStore.getInstance().res.get('pie_down'),
            top
        );
        this.y = this.y + top + (window.innerHeight / 5);
    }
}