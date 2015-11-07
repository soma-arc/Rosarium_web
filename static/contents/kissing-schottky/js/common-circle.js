var commonCircle = function (center, r) {
    if (center === undefined) {
        center = complex.ZERO;
    };
    if (r === undefined) {
        r = 0;
    };
    this.center = center;
    this.r = r;
    this.a = new complex(center.re, center.i + r);
    this.b = new complex(center.re - r, center.i);
    this.c = new complex(center.re, center.i - r);
    this.d = new complex(center.re + r, center.i);
    var abMidPoint = new complex((this.a.re + this.b.re) / 2, (this.a.i + this.b.i) / 2);
    var dist = cDist(center, abMidPoint);
    var ux = (abMidPoint.re - center.re) / dist;
    var uy = (abMidPoint.i - center.i) / dist;
    this.h = new complex(center.re + ux * r, center.i + uy * r);
    calcContactCircles(this);
    return this;
};
commonCircle.ELEMENTS = { CENTER : 0,
                       A : 1,
                       B : 2,
                       C : 3,
                       D : 4,
                       H : 5,
                       CIRCUMFERENCE : 6
                     };
function isClicked(obj, point, mouseX, mouseY) {
    return obj.isClicked(point, mouseX, mouseY);
};
function getSelectedElement(obj, mouseX, mouseY) {
    return obj.getSelectedElement(mouseX, mouseY);
};
function mousedown(obj, mouseX, mouseY) {
    return obj.mousedown(mouseX, mouseY);
};
function mousemove(obj, mouseX, mouseY) {
    return obj.mousemove(mouseX, mouseY);
};
function mouseup(obj, mouseX, mouseY) {
    return obj.mouseup(mouseX, mouseY);
};
commonCircle.prototype = { isClicked : function (point, mouseX, mouseY) {
    return Math.sqrt(Math.pow(point.re - mouseX, 2) + Math.pow(point.i - mouseY, 2)) < 5;
},
                        getSelectedElement : function (mouseX, mouseY) {
    if (isClicked(this, this.center, mouseX, mouseY)) {
        return commonCircle.ELEMENTS.CENTER;
    } else if (isClicked(this, this.a, mouseX, mouseY)) {
        return commonCircle.ELEMENTS.A;
    } else if (isClicked(this, this.b, mouseX, mouseY)) {
        return commonCircle.ELEMENTS.B;
    } else if (isClicked(this, this.c, mouseX, mouseY)) {
        return commonCircle.ELEMENTS.C;
    } else if (isClicked(this, this.d, mouseX, mouseY)) {
        return commonCircle.ELEMENTS.D;
    } else if (isClicked(this, this.h, mouseX, mouseY)) {
        return commonCircle.ELEMENTS.H;
    } else {
        return -1;
    };
},
                        mousedown : function (mouseX, mouseY) {
    return this.selectedElement = getSelectedElement(this, mouseX, mouseY);
},
                        mouseup : function (mouseX, mouseY) {
    return this.selectedElement = -1;
},
                        mousemove : function (mouseX, mouseY) {
    if (this.selectedElement === commonCircle.ELEMENTS.CENTER) {
        return console.log('center');
    } else if (this.selectedElement === commonCircle.ELEMENTS.A) {
        var theta = Math.atan2(mouseY - this.center.i, mouseX - this.center.re);
        var abMidPoint = null;
        var dist = null;
        var ux = null;
        var uy = null;
        this.a = new complex(this.center.re + this.r * Math.cos(theta), this.center.i + this.r * Math.sin(theta));
        abMidPoint = new complex((this.a.re + this.b.re) / 2, (this.a.i + this.b.i) / 2);
        dist = cDist(this.center, abMidPoint);
        ux = (abMidPoint.re - this.center.re) / dist;
        uy = (abMidPoint.i - this.center.i) / dist;
        this.h = new complex(this.center.re + ux * cDist(this.h, this.center), this.center.i + uy * cDist(this.h, this.center));
        return console.log('a');
    } else if (this.selectedElement === commonCircle.ELEMENTS.B) {
        var theta6 = Math.atan2(mouseY - this.center.i, mouseX - this.center.re);
        var abMidPoint7 = null;
        var dist8 = null;
        var ux9 = null;
        var uy10 = null;
        this.b = new complex(this.center.re + this.r * Math.cos(theta6), this.center.i + this.r * Math.sin(theta6));
        abMidPoint7 = new complex((this.a.re + this.b.re) / 2, (this.a.i + this.b.i) / 2);
        dist8 = cDist(this.center, abMidPoint7);
        ux9 = (abMidPoint7.re - this.center.re) / dist8;
        uy10 = (abMidPoint7.i - this.center.i) / dist8;
        this.h = new complex(this.center.re + ux9 * cDist(this.h, this.center), this.center.i + uy10 * cDist(this.h, this.center));
        return console.log('b');
    } else if (this.selectedElement === commonCircle.ELEMENTS.C) {
        var theta11 = Math.atan2(mouseY - this.center.i, mouseX - this.center.re);
        this.c = new complex(this.center.re + this.r * Math.cos(theta11), this.center.i + this.r * Math.sin(theta11));
        return console.log('c');
    } else if (this.selectedElement === commonCircle.ELEMENTS.D) {
        var theta12 = Math.atan2(mouseY - this.center.i, mouseX - this.center.re);
        this.d = new complex(this.center.re + this.r * Math.cos(theta12), this.center.i + this.r * Math.sin(theta12));
        return console.log('d');
    } else if (this.selectedElement === commonCircle.ELEMENTS.H) {
        this.recalcH(mouseX, mouseY);
        return console.log('h');
    } else if (this.selectedElement === commonCircle.ELEMENTS.CIRCUMFERENCE) {
        return console.log('circumference');
    };
},
                        recalcH : function (mouseX, mouseY) {
    var abMidPoint = new complex((this.a.re + this.b.re) / 2, (this.a.i + this.b.i) / 2);
    var abMidPerpendicular = new line(this.center, abMidPoint);
    return this.h = new complex(mouseX, abMidPerpendicular.getY(mouseX));
}
                      };
function calcContactCircles(commonCircle) {
    var lineBcMid = new line(commonCircle.center, new complex((commonCircle.b.re + commonCircle.c.re) / 2, (commonCircle.b.i + commonCircle.c.i) / 2));
    var lineCdMid = new line(commonCircle.center, new complex((commonCircle.c.re + commonCircle.d.re) / 2, (commonCircle.c.i + commonCircle.d.i) / 2));
    var lineDaMid = new line(commonCircle.center, new complex((commonCircle.d.re + commonCircle.a.re) / 2, (commonCircle.d.i + commonCircle.a.i) / 2));
    var circleH = new circle(commonCircle.h, cDist(commonCircle.h, commonCircle.a), commonCircle.a, 1, commonCircle.b);
    var lineHb = new line(commonCircle.h, commonCircle.b);
    var i = getIntersection(lineBcMid, lineHb);
    var circleI = new circle(i, cDist(i, commonCircle.c), commonCircle.b, 1, commonCircle.c);
    var lineIc = new line(i, commonCircle.c);
    var j = getIntersection(lineCdMid, lineIc);
    var circleJ = new circle(j, cDist(j, commonCircle.d), commonCircle.d, 1, commonCircle.c);
    var lineJd = new line(j, commonCircle.d);
    var k = getIntersection(lineDaMid, lineJd);
    var circleK = new circle(k, cDist(k, commonCircle.d), commonCircle.a, 1, commonCircle.d);
    circleH.p2 = calcP2(commonCircle, circleH);
    circleI.p2 = calcP2(commonCircle, circleI);
    circleJ.p2 = calcP2(commonCircle, circleJ);
    circleK.p2 = calcP2(commonCircle, circleK);
    return commonCircle.contactCircles = [circleH, circleI, circleJ, circleK];
};
function calcP2(commonCircle, circle) {
    var dist = cDist(commonCircle.center, circle.center);
    var ux = (commonCircle.center.re - circle.center.re) / dist;
    var uy = (commonCircle.center.i - circle.center.i) / dist;
    return new complex(circle.center.re + ux * circle.r, circle.center.i + uy * circle.r);
};
function drawContactCircles(commonCircle, ctx) {
    for (var circle = null, _js_idx13 = 0; _js_idx13 < commonCircle.contactCircles.length; _js_idx13 += 1) {
        circle = commonCircle.contactCircles[_js_idx13];
        circle.draw(ctx);
    };
};
function drawCommonCircle(commonCircle, ctx) {
    ctx.beginPath();
    ctx.arc(commonCircle.center.re, commonCircle.center.i, commonCircle.r, 0, 2 * Math.PI, false);
    return ctx.stroke();
};
function drawControlPoints(commonCircle, ctx) {
    for (var p = null, _js_arrvar15 = [commonCircle.a, commonCircle.b, commonCircle.c, commonCircle.d, commonCircle.h], _js_idx14 = 0; _js_idx14 < _js_arrvar15.length; _js_idx14 += 1) {
        p = _js_arrvar15[_js_idx14];
        ctx.beginPath();
        ctx.arc(p.re, p.i, 5, 0, 2 * Math.PI, false);
        ctx.fill();
    };
};