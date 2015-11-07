var bfsOperator = function (cCircle) {
    this.gens = getSchottkyGens(cCircle.contactCircles[0], cCircle.contactCircles[1], cCircle.contactCircles[2], cCircle.contactCircles[3]);
    this.baseCircles = [cCircle.contactCircles[0], cCircle.contactCircles[2], cCircle.contactCircles[1], cCircle.contactCircles[3]];
    return this;
};
function init(operator) {
    operator.circles = [];
    operator.tags = [];
    operator.circles.push([]);
    operator.tags.push([]);
    var baseTags = [2, 0, 3, 1];
    var index = 0;
    for (var c = null, _js_idx4 = 0; _js_idx4 < operator.baseCircles.length; _js_idx4 += 1) {
        c = operator.baseCircles[_js_idx4];
        for (var i = 0; i <= 3; i += 1) {
            if ((baseTags[index] + 2) % 4 !== i) {
                operator.circles[0].push(mobiusOnCircle(operator.gens[i], c));
                operator.tags[0].push(i);
            };
        };
        ++index;
    };
};
function run(operator, maxLevel, epsilon) {
    init(operator);
    for (var level = 1; level <= maxLevel; level += 1) {
        operator.circles.push([]);
        operator.tags.push([]);
        var index = -1;
        for (var c = null, _js_arrvar6 = operator.circles[level - 1], _js_idx5 = 0; _js_idx5 < _js_arrvar6.length; _js_idx5 += 1) {
            c = _js_arrvar6[_js_idx5];
            ++index;
            for (var i = 0; i <= 3; i += 1) {
                if ((operator.tags[level - 1][index] + 2) % 4 !== i) {
                    operator.circles[level].push(mobiusOnCircle(operator.gens[i], c));
                    operator.tags[level].push(i);
                };
            };
        };
    };
    return operator.circles;
};