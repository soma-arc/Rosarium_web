function getMobiusTransform(c1, c2) {
    var z1 = c1.p1;
    var z2 = c1.p2;
    var z3 = c1.p3;
    var w1 = c2.p1;
    var w2 = c2.p2;
    var w3 = c2.p3;
    var m1 = new matrix(cSub(z2, z3), cMult(-1, z1, cSub(z2, z3)), cSub(z2, z1), cMult(-1, z3, cSub(z2, z1)));
    var m2 = new matrix(cSub(w2, w3), cMult(-1, w1, cSub(w2, w3)), cSub(w2, w1), cMult(-1, w3, cSub(w2, w1)));
    return mMult(inverse(m2), m1);
};
function getSchottkyGens(c1, c2, c3, c4) {
    var gens = [];
    gens.push(getMobiusTransform(c1, c3));
    gens.push(getMobiusTransform(c2, c4));
    gens.push(inverse(gens[0]));
    gens.push(inverse(gens[1]));
    return gens;
};
function mobiusOnPoint(m, c) {
    if (cInfinityp(c)) {
        if (cZerop(m.c)) {
            return complex.INFINITY;
        } else {
            return cDiv(m.a, m.c);
        };
    } else {
        var numerix = cAdd(cMult(m.a, c), m.b);
        var denominator = cAdd(cMult(m.c, c), m.d);
        if (cZerop(denominator)) {
            return complex.INFINITY;
        } else {
            return cDiv(numerix, denominator);
        };
    };
};
function mobiusOnCircle(m, c) {
    var z = cSub(c.center, cDiv(c.r * c.r, cConjugate(cAdd(cDiv(m.d, m.c), c.center))));
    var newCenter = mobiusOnPoint(m, z);
    return new circle(newCenter, cAbs(cSub(newCenter, mobiusOnPoint(m, cAdd(c.center, c.r)))));
};