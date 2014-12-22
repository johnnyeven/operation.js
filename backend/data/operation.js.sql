/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50614
Source Host           : localhost:3306
Source Database       : operation.js

Target Server Type    : MYSQL
Target Server Version : 50614
File Encoding         : 65001

Date: 2014-12-22 16:12:51
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for hosts
-- ----------------------------
DROP TABLE IF EXISTS `hosts`;
CREATE TABLE `hosts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(32) NOT NULL,
  `host` char(32) NOT NULL,
  `port` int(11) NOT NULL,
  `login_type` int(11) NOT NULL,
  `username` char(32) NOT NULL,
  `password` char(32) NOT NULL,
  `key` char(128) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
