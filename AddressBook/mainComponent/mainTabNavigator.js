/**
 * Created by apple on 2018/4/16.
 */


import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    Image,
    View
} from 'react-native';

// 引入主页面
import Home from './home';
import Message from './message';
import Manager from './manager';
import About from './about';

// 引入自定义UI
import WKTabNavigator from '../wkCommonCustomComponent/wkTabNavigator';

// 设置数据源
let componentArr = [Home,Message,Manager,About];
let componentTitleArr = ['首页','公告','管理','关于'];

// 导出MainTabNavigator
const MainTabNavigator = WKTabNavigator.getTabNavigator(componentArr,componentTitleArr);
export default  MainTabNavigator;

