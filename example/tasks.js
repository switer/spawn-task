var exec = require('../index').exec,
    log = require('../index').log,
    colors = require('colors'),
    fs = require('fs');

var tasks = {
    run: function () {
        this.watch().proxy();
    },
    watch: function (msg, code) {
        log(msg);
        exec('grunt watch:tpl', 'grunt-watch', 'blue.grey', tasks.watch);
        return tasks;
    },
    proxy: function (msg, code) {
        log(msg);
        exec('node proxy.js', 'http-route-proxy', 'green.grey', tasks.proxy);
        return tasks;
    }
}
tasks.run();
