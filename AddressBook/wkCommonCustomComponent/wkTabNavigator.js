/**
 * Created by apple on 2018/4/16.
 */


import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View
} from 'react-native';

// 引入第三方react-navigation库
import {StackNavigator,TabNavigator,TabBarBottom} from 'react-navigation';

// 图片的背景
class TabBarItem extends Component<> {
    render() {
        return(
            <Image source={ this.props.focused ? this.props.selectedImage : this.props.normalImage }
                   style={ { tintColor:this.props.tintColor,width:37,height:30 } }
            />
        )
    }
}

export default class WKTabNavigator extends Component<Props> {

    // 返回TabNavigator
    static getTabNavigator(componentArr:Array,componentTitleArr:Array){
        // 取得 TabNavigator 需要的screen 对象
        let screenItems = WKTabNavigator.getScreenItems(componentArr,componentTitleArr);

        return(
            TabNavigator(
                // 设置Items
                screenItems,

                // 配置标签栏的一些安卓和iOS的属性
                {
                    tabBarOptions:{
                        // 整个tabItem的前景色 活跃状态下
                        activeTintColor:'orange',
                        // 整个tabItem的前景色 不活跃状态下
                        inactiveTintColor:'#979797',

                        // 是否显示label，默认开启
                        showLabel:true,
                        // 是否显示图标，默认是关闭
                        // label的样式属性
                        labelStyle: {
                            // 文字大小
                            // fontSize: 20,
                        },

                        showIcon:true,
                        // 图标样式
                        iconStyle:{
                        },

                        //标签指示器的样式对象（选项卡底部的行）。安卓底部会多出一条线，可以将height设置为0来暂时解决这个问题
                        indicatorStyle:{
                            height:0,
                        },

                        // 设置tabBar的样式
                        style:{
                            backgroundColor:'#ffffff',
                        },
                        // label和icon所在View的样式
                        tabStyle:{
                            // label和icon的背景色为红色
                            // backgroundColor:'red',
                        },

                        // 是否启用可滚动选项卡
                        scrollEnabled:true,
                    },

                    tabBarComponent:TabBarBottom,
                    // 设置tabbar的位置，iOS默认在底部，安卓默认在顶部。（属性值：'top'，'bottom'）
                    tabBarPosition:'bottom',
                    // 是否允许在标签之间进行滑动
                    swipeEnabled:false,
                    // 是否根据需要懒惰呈现标签，而不是提前，意思是在app打开的时候将底部标签栏全部加载，默认false,推荐为true
                    lazy:true,
                }
            )
        );
    }

    // 取得ScreenItems对象
    static getScreenItems(componentArr:Array,componentTitleArr:Array){
        // 获得screen的titleArr
        let screenTitles = [];
        for (let i=0;i<componentTitleArr.length;i++) {
            let componentTitle = componentTitleArr[i];
            let screenTitle = '';
            if(componentTitle ==='首页'){
                screenTitle = 'HomeStack';

            }else if(componentTitle ==='公告'){
                screenTitle = 'MessageStack';

            }else if(componentTitle ==='管理'){
                screenTitle = 'ManagerStack';

            }else if(componentTitle ==='关于'){
                screenTitle = 'AboutStack';

            }
            screenTitles.push(screenTitle);
        }

        // 所有的screen 对象
        let screenItems = {};
        for (let i=0;i<componentArr.length;i++){
            let component = componentArr[i];
            let componentTitle = componentTitleArr[i];
            let screenTitle = screenTitles[i];

            // 单个screen对象
            let screenItem = WKTabNavigator.getScreenItem(component,componentTitle);

            // 添加的screen 对象
            screenItems[screenTitle] = screenItem;
        }

        // console.log(screenItems);
        return screenItems;
    }

    // 返回对应的ScreenItem
    static getScreenItem(component,componentTitle){
        // screen类
        const  componentStack = WKTabNavigator.getComponentStack(component,componentTitle);

        // 图片
        let normalImage = null;
        let selectedImage = null;
        if(componentTitle ==='首页'){
            normalImage = require('../img/icon_home_nor.png');
            selectedImage = require('../img/icon_home_press.png');

        }else if(componentTitle ==='公告'){
            normalImage = require('../img/icon_touzi_nor.png');
            selectedImage = require('../img/icon_touzi_press.png');

        }else if(componentTitle ==='管理'){
            normalImage = require('../img/icon_faxian_nor.png');
            selectedImage = require('../img/icon_faxian_press.png');

        }else if(componentTitle ==='关于'){
            normalImage = require('../img/icon_wode_nor.png');
            selectedImage = require('../img/icon_wode_press.png');

        }

        // 最终的item
        let screenItem ={
            // 设置导航栏
            screen:componentStack,

            // 设置导航栏选项
            navigationOptions: ({navigation}) => ({
                // 设置标签栏的title。推荐
                tabBarLabel: componentTitle,
                // 是否隐藏标签栏。默认不隐藏(true)
                tabBarVisible:true,
                // 设置标签栏的图标。需要给每个都设置
                tabBarIcon: ({focused, tintColor}) => (
                    <TabBarItem
                        focused={focused}
                        normalImage={normalImage}
                        selectedImage={selectedImage}
                    />
                )

            }),
        };

        // console.log(screenItem);
        return screenItem;
    }

    // 返回对应的stack
    static getComponentStack(component,componentTitle){
        let screenTitle = '';
        if(componentTitle ==='首页'){
            screenTitle = 'Home';

        }else if(componentTitle ==='公告'){
            screenTitle = 'Message';

        }else if(componentTitle ==='管理'){
            screenTitle = 'Manager';

        }else if(componentTitle ==='关于'){
            screenTitle = 'About';

        }

        let stackObj = {};
        // 设置stackObj
        stackObj[screenTitle] = {
            screen: component,
        };

        // console.log(stackObj);
        return(StackNavigator(stackObj));
    }


}

