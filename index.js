/**
 *  @switer
 **/
var child = require('child_process'),
    colors = require('colors');

function exec (cmd, label, color, onexit) {
    label = label || '';
    color = color || 'white';
    var cmdChild = child.exec(cmd, {});
    cmdChild.stdout.on('data', function (data) {
        if (data && data.trim() && data.replace(/\s/gm, '')) {

            console.log(setColor('\n' + label, color));
            console.log(setColor( (new Array(maxLineLength(data))).join('=') , color));
            console.log(data);
            // console.log('\n');
        }
    });

    cmdChild.stderr.on('data', function (data) {
        if (data && data.trim() && data.replace(/\s/gm, '')) {
            console.log(setColor(label, color));
            console.log(setColor( (new Array(maxLineLength(data))).join('=') , color));
            console.log(data.red);
            // console.log('\n');
        }
    });

    cmdChild.on('exit', function (code) {
        code && (code = code.toString());
        if (code && code.trim() && code.replace(/\s/gm, '')) {
            code = 'exit with code ' + code;
            console.log(setColor(label, color));
            console.log(setColor( (new Array(maxLineLength(code))).join('=') , color));
            console.log(code.green);
            // console.log('\n');
        } else {
            console.log("exit with code " + code);
        }
        onexit && onexit('process exit', code);
    });
}
function setColor (dest, colorStr) {
    var colors = colorStr.split('.');
    for (var i =0 ; i < colors.length; i ++) {
        dest = dest[colors[i]];
    };
    return dest;
}
function getLength (str) {
    var len = 0;

    for (var i =0 ; i < str.length; i ++) {
        if (str.charCodeAt(i) >= 256) {
            len += 2;
        } else {
            len ++;
        }
    }
    return len > 100 ? 100:len;
}
function maxLineLength (str) {
    var lines = str.split('\n'),
        index = 0,
        max = lines[0].length;
    for (var i =0 ; i < lines.length; i ++) {
        if (lines[i].length > max) {
            max = lines[i].length;
            index = i;
        }
    }
    return getLength(lines[index]);
}
module.exports = {
    exec: exec,
    log: function (msg) {
        msg && console.log(msg.yellow.grey);
    }
};