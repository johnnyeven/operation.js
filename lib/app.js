var app = function() {
    var program = require("commander");
    program.version("0.1.0")
        .command("add [name] [host] [port]")
        .description("增加一个新的主机 [name]主机名 [host]ssh主机IP [port]ssh端口")
        .action(require("./func/add"))

    program.parse(process.argv);
};

module.exports = app;