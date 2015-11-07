var cCircle = new commonCircle(complex.ZERO, 50);
var magnification = 1;
var ctx;
var circles = [];
var maxLevel = 3;
var dragging = false;
function ad(c1, c2){
    return {re:c1.re + c2.re,i: c1.i + c2.i};
}
function add(c1, c2){
//    arguments = [].map.call(arguments, toComplex);
    return c1.add(c2);
}

window.onload = function () {
    console.time('timer1');
    var hoge={re: 1, i: 2};
    console.timeEnd('timer1');
    console.time('timer1');
    var foo = new complex(1, 2);
    console.timeEnd('timer1');
    console.time('timer1');
    console.log(foo.add(hoge));
    console.timeEnd('timer1');
    console.time('timer1');
    console.log(cAdd(hoge, foo));
    console.timeEnd('timer1');
    console.time('timer1');
    console.log(ad(hoge, foo));
    console.timeEnd('timer1');
    console.log("オーバーロードしたadd関数を呼び出す");
    console.time('timer1');
    console.log(add( foo, hoge));
    console.timeEnd('timer1');
    var canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvas.addEventListener('mousedown', function (e) {
        var rect = e.target.getBoundingClientRect();
        var mouseX = e.clientX - rect.left - canvas.width / 2;
        var mouseY = e.clientY - rect.top - canvas.height / 2;
        return mousedown(cCircle, mouseX / magnification, mouseY / magnification) !== -1 ? (dragging = true) : null;
    });
    canvas.addEventListener('mousemove', function (e) {
        var rect = e.target.getBoundingClientRect();
        var mouseX = e.clientX - rect.left - canvas.width / 2;
        var mouseY = e.clientY - rect.top - canvas.height / 2;
        if (dragging) {
            mousemove(cCircle, mouseX / magnification, mouseY / magnification);
            var bfs = new bfsOperator(cCircle);
	    console.time('timer1');
	    circles = run(bfs, maxLevel, 1);
	    console.timeEnd('timer1');

            return drawCircles();
        };
    });
    canvas.addEventListener('mouseup', function (e) {
        var rect = e.target.getBoundingClientRect();
        var mouseX = e.clientX - rect.left - canvas.width / 2;
        var mouseY = e.clientY - rect.top - canvas.height / 2;
        dragging = false;
        return mouseup(cCircle, mouseX / magnification, mouseY / magnification);
    });
    var bfs = new bfsOperator(cCircle);
    circles = run(bfs, maxLevel, 1);
    return drawCircles();
};
function drawCircles() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.save();
    ctx.scale(magnification, magnification);
    calcContactCircles(cCircle);
    ctx.fillStyle = 'rgb(255, 50, 0)';
    drawContactCircles(cCircle, ctx);
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'blue';
    ctx.restore();
    var g = 100;
    for (var level = 0; level < maxLevel; level += 1) {
        for (var c = null, _js_arrvar7 = circles[level], _js_idx6 = 0; _js_idx6 < _js_arrvar7.length; _js_idx6 += 1) {
            c = _js_arrvar7[_js_idx6];
            ctx.fillStyle = 'rgb(255, ' + g + ', 0)';
            c.draw(ctx);
        };
        g += 50;
    };
    ctx.fillStyle = 'white';
    drawControlPoints(cCircle, ctx);
    circles = [];
    return ctx.restore();
};
