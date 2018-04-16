/**
 * Created by apple on 2018/4/16.
 */


import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    View
} from 'react-native';

export default class Message extends Component {
    render(){
        return(
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {/*两个tab 间的相互切换*/}
                <TouchableOpacity style={{marginBottom:30}} activeOpacity={0.5} onPress={()=>{alert('跳转到设置')}}>
                    <Text style={styles.btnSty}>我是公告</Text>
                </TouchableOpacity>
                {/*跳转二级子页面*/}
                <TouchableOpacity activeOpacity={0.5} onPress={()=>{alert('跳转到详情')}}>
                    <Text style={styles.btnSty}>跳转到详情</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

// 自定义的样式
const styles = StyleSheet.create({
    btnSty:{
        color:'white',
        backgroundColor:'blue',
        height:60,
        width:250,
    },
});