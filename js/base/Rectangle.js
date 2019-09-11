export class Rectangle {
    constructor(x = 0, y = 0, width = 0, height = 0) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    //判断矩形是否相交
    intersects(r) {
        //1的宽度
        let tw = this.width;
        //1的高度
        let th = this.height;
        //2的宽度
        let rw = r.width;
        //2的高度
        let rh = r.height;
        //校验合法性
        if (rw <= 0 || rh <=0 || th <= 0) {
            return false;
        }
        //1的x坐标
        let tx = this.x;
        let ty = this.y;
        let rx = r.x;
        let ry = r.y;
        rw += rx;
        rh += ry;
        tw += tx;
        th += ty;
        //overflow || intersects
        return ((rw < rx || rw > tx) &&
            (rh < ry || rh > ty) &&
            (tw < tx || tw > rx) &&
            (th < tx || th > ry));

    }
}