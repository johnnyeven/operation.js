var models = require('../models');
var Host = models.Host;

/**
 * 保存
 * callback
 * - err 数据库错误
 * - row 保存的数据
 * @param params 数据内容
 * @param callback 回调
 */
exports.save = function(params, callback) {
    var host = Host.build(params);
    host.save().complete(callback);
};