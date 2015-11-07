var circle = function (center, r, p1, p2, p3) {
    if (center === undefined) {
        center = complexp.ZERO;
    };
    if (r === undefined) {
        r = 0;
    };
    if (p1 === undefined) {
        p1 = new complex(center.re, center.i + r);
    };
    if (p2 === undefined) {
        p2 = new complex(center.re + r, center.i);
    };
    if (p3 === undefined) {
        p3 = new complex(center.re, center.i - r);
    };
    this.center = center;
    this.r = r;
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;
    return this;
};
circle.prototype = { draw : function (ctx) {
    ctx.beginPath();
    ctx.arc(this.center.re, this.center.i, this.r, 0, 2 * Math.PI, false);
    return ctx.fill();
} };