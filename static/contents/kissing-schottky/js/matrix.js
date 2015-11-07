var matrix = function (a, b, c, d) {
    if (a === undefined) {
        a = complex.ONE;
    };
    if (b === undefined) {
        b = complex.ZERO;
    };
    if (c === undefined) {
        c = complex.ZERO;
    };
    if (d === undefined) {
        d = complex.ONE;
    };
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    return this;
};
function mMult(args) {
    return [].reduce.call(arguments, function (m1, m2) {
        return (m2 instanceof matrix) ? new matrix(cAdd(cMult(m1.a, m2.a), cMult(m1.b, m2.c)), cAdd(cMult(m1.a, m2.b), cMult(m1.b, m2.d)), cAdd(cMult(m1.c, m2.a), cMult(m1.d, m2.c)), cAdd(cMult(m1.c, m2.b), cMult(m1.d, m2.d))) : new matrix(cMult(m1.a, m2), cMult(m1.b, m2), cMult(m1.c, m2), cMult(m1.d, m2));
    });
};
function inverse(m) {
    return mMult(new matrix(m.d, cMult(m.b, -1), cMult(m.c, -1), m.a), cDiv(complex.ONE, cSub(cMult(m.a, m.d), cMult(m.b, m.c))));
};
