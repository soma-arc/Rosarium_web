var complex = function (re, i) {
    if (re === undefined) {
        re = 0;
    };
    if (i === undefined) {
        i = 0;
    };
    this.re = re;
    this.i = i;
    return this;
};
complex.prototype = {
    add: function(c){
	if(c === undefined){
	    return null;
	}
	return new complex(this.re + c.re, this.i + c.i);
    }
}

complex.ZERO = new complex();
complex.INFINITY = new complex(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
complex.ONE = new complex(1);
complex.I = new complex(0, 1);
complex.EPSILON = 0.000001;
function toComplex(n) {
    return typeof n == 'number' ? new complex(n) : n;
};
function cAdd(args) {
    arguments = [].map.call(arguments, toComplex);
    return [].reduce.call(arguments, function (c1, c2) {
        return new complex(c1.re + c2.re, c1.i + c2.i);
    });
};
function cSub(args) {
    arguments = [].map.call(arguments, toComplex);
    return [].reduce.call(arguments, function (c1, c2) {
        return cInfinityp(c1) || cInfinityp(c2) ? complex.INFINITY : new complex(c1.re - c2.re, c1.i - c2.i);
    });
};
function cMult(args) {
    arguments = [].map.call(arguments, toComplex);
    return [].reduce.call(arguments, function (c1, c2) {
        return cInfinityp(c1) || cInfinityp(c2) ? complex.INFINITY : new complex(c1.re * c2.re - c1.i * c2.i, c1.re * c2.i + c1.i * c2.re);
    });
};
function cDiv(args) {
    arguments = [].map.call(arguments, toComplex);
    return [].reduce.call(arguments, function (c1, c2) {
        var denom = c2.re * c2.re + c2.i * c2.i;
        if (denom < complex.EPSILON) {
            return complex.INFINITY;
        } else if (denom === Number.POSITIVE_INFINITY) {
            return complex.ZERO;
        } else {
            return new complex((c1.re * c2.re + c1.i * c2.i) / denom, (c1.i * c2.re - c1.re * c2.i) / denom);
        };
    });
};
function cConjugate(c) {
    return cInfinityp(c) ? complex.INFINITY : new complex(c.re, -c.i);
};
function cAbs(c) {
    return cInfinityp(c) ? complex.INFINITY : Math.sqrt(c.re * c.re + c.i * c.i);
};
function cArg(c) {
    return Math.atan2(c.i, c.re);
};
function cZerop(c) {
    return Math.abs(c.re) < complex.EPSILON && Math.abs(c.i) < complex.EPSILON;
};
function cInfinityp(c) {
    return !(isFinite(c.re) && isFinite(c.i));
};
function cRealp(c) {
    return Math.abs(c.i) < complex.EPSILON;
};
function cDist(c1, c2) {
    return Math.sqrt((c1.re - c2.re) * (c1.re - c2.re) + (c1.i - c2.i) * (c1.i - c2.i));
};
