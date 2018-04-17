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

// 设置主页面数据源
let componentArr = [Home,Message,Manager,About];

// 导出MainTabNavigator
const MainTabNavigator = WKTabNavigator.getTabNavigator(componentArr);
export default  MainTabNavigator;

