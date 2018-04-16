/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

// 导入main
import MainTabNavigator from './mainComponent/mainTabNavigator'

// 忽略这两个警告
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

type Props = {};
export default class App extends Component<Props> {
  render() {
      // 渲染主页面
      return (
      <MainTabNavigator
          style={{flex:1}}
      />
    );
  }
}

const styles = StyleSheet.create({

});
