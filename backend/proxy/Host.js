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

/**
 * 更新
 * callback
 * - affectedRows 更新的行数
 * @param params 查询条件
 * @param updated 更新项目
 * @param callback 回调
 */
exports.update = function(params, updated, callback) {
    Host.update(updated, {
        where: params
    }, callback);
};

/**
 * 读取
 * callback
 * - err 数据库错误
 * - results 数据行
 * @param params 查询条件
 * @param extension 额外条件 比如 offset limit order group
 * @param callback 回调
 */
exports.read = function(params, extension, callback) {
    var _ = require('underscore');
    var tmp = {
        where: params
    };
    _.extend(tmp, extension);
    Host.findAll(tmp).complete(callback);
}

/**
 * 删除
 * callback
 * - affectedRows 删除的行数
 * @param params 查询条件
 * @param extension 额外条件 比如 offset limit order group
 * @param callback 回调
 */
exports.delete = function(params, extension, callback) {
    var _ = require('underscore');
    var tmp = {
        where: params
    };
    _.extend(tmp, extension);
    Host.destroy(tmp).then(callback);
};