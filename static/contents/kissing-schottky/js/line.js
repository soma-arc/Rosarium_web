var line = function (args) {
    if (arguments.length === 2) {
        this.p1 = arguments[0];
        this.p2 = arguments[1];
        var xDiff = this.p2.re - this.p1.re;
        var yDiff = this.p2.i - this.p1.i;
        if (Math.abs(xDiff) < line.EPSILON) {
            this.a = 1;
            this.b = 0;
            this.c = this.p1.re;
        } else if (Math.abs(yDiff) < line.EPSILON) {
            this.a = 0;
            this.b = 1;
            this.c = this.p1.i;
        } else {
            this.a = yDiff / xDiff;
            this.b = this.p1.i - this.p1.re * this.a;
            this.c = 0;
        };
    } else if (arguments.length === 3) {
        this.a = arguments[0];
        this.b = arguments[1];
        this.c = arguments[2];
    };
    return this;
};
line.EPSILON = 0.00001;
line.prototype = { getX : function (y) {
    return Math.abs(this.c) < line.EPSILON ? (y - this.b) / this.a : null;
}, getY : function (x) {
    return Math.abs(this.c) < line.EPSILON ? this.a * x + this.b : null;
} };
function getIntersection(l1, l2) {
    if (l1.c === 0 && l2.c === 0) {
        var x1 = 1;
        var x2 = 5;
        var y1 = l1.getY(x1);
        var y2 = l1.getY(x2);
        var x3 = 4;
        var x4 = 8;
        var y3 = l2.getY(x3);
        var y4 = l2.getY(x4);
        var coeff = ((y4 - y3) * (x4 - x1) - (x4 - x3) * (y4 - y1)) / ((x2 - x1) * (y4 - y3) - (y2 - y1) * (x4 - x3));
        return new complex(x1 + coeff * (x2 - x1), y1 + coeff * (y2 - y1));
    } else if (l1.a === 1) {
        return new complex(l1.c, l2.getY(l1.c));
    } else if (l1.b === 1) {
        return new complex(l2.getX(l1.c), l1.c);
    } else if (l2.a === 1) {
        return new complex(l2.c, l1.getY(l2.c));
    } else {
        return new complex(l1.getX(l2.c), l2.c);
    };
};