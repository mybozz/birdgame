import {Spirit} from "../base/Spirit.js";
import {DataStore} from "../base/DataStore.js";
export class Background extends Spirit{
    constructor(){
        super(DataStore.getInstance().res.get('background'));
    }

}