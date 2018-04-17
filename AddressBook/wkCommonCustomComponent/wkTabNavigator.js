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


/*定义一个工具类*/
export default class WKTabNavigator {


    // 返回TabNavigator
    static getTabNavigator(componentArr:Array){

        // 创建一个示例对象
        let tabObj = new WKTabNavigator(componentArr);
        // 设置对象的属性
        tabObj.setupComponentTitleArr();
        // console.log('componentArr',componentArr,'tabObj.componentArr',tabObj.componentArr);
        // console.log('tabObj.componentTitleArr',tabObj.componentTitleArr)

        // 取得 TabNavigator 需要的screen 对象
        let screenItems = tabObj.getScreenItems();

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


    // 构造
      constructor(componentArr:Array) {
        // 初始状态
          this.componentArr = componentArr;
          this.componentTitleArr = [];
      }


    // 配置 componentTitleArr
    setupComponentTitleArr = ()=>{
        let titleArr = [];

        // 根据组件类型 配置title等属性
        for (let i=0;i<this.componentArr.length;i++){
            let component = this.componentArr[i];
            let titleDic = {};
            let componentFuncName = component.name;
            // console.log(componentFuncName);
            // console.log(typeof(componentFuncName));

            if(componentFuncName === 'Home'){
                // 是Home类
                titleDic.tabItemTitle = '首页';
                titleDic.stackKey = 'HomeStack';
                titleDic.stackTitle = '首页';
                titleDic.stackTopComponentKey = 'Home';
                titleDic.normalImage = require('../img/icon_home_nor.png');
                titleDic.selectedImage = require('../img/icon_home_press.png');

            }else if (componentFuncName === 'Message'){
                // 是Message类
                titleDic.tabItemTitle = '公告';
                titleDic.stackKey = 'MessageStack';
                titleDic.stackTitle = '公告';
                titleDic.stackTopComponentKey = 'Message';
                titleDic.normalImage = require('../img/icon_touzi_nor.png');
                titleDic.selectedImage = require('../img/icon_touzi_press.png');

            }else if (componentFuncName === 'Manager'){
                // 是Manager类
                titleDic.tabItemTitle = '管理';
                titleDic.stackKey = 'ManagerStack';
                titleDic.stackTitle = '管理';
                titleDic.stackTopComponentKey = 'Manager';
                titleDic.normalImage = require('../img/icon_faxian_nor.png');
                titleDic.selectedImage = require('../img/icon_faxian_press.png');

            }else if (componentFuncName === 'About'){
                // 是About类
                titleDic.tabItemTitle = '关于';
                titleDic.stackKey = 'AboutStack';
                titleDic.stackTitle = '关于';
                titleDic.stackTopComponentKey = 'About';
                titleDic.normalImage = require('../img/icon_wode_nor.png');
                titleDic.selectedImage = require('../img/icon_wode_press.png');

            }
            titleArr.push(titleDic);
        }

        // 设置componentTitleArr
        this.componentTitleArr = titleArr;
    }


    // 取得ScreenItems对象
    getScreenItems=()=>{
        // 所有的screen 对象
        let screenItems = {};
        for (let i=0;i<this.componentTitleArr.length;i++){
            let component = this.componentArr[i];
            let componentTitleDic = this.componentTitleArr[i];
            let screenTitle = componentTitleDic.stackKey;

            // 单个screen对象
            let screenItem = this.getScreenItem(component, componentTitleDic);

            // 添加的screen 对象
            screenItems[screenTitle] = screenItem;
        }

        // console.log(screenItems);
        return screenItems;
    }


    // 返回对应的ScreenItem
    getScreenItem=(component,componentTitleDic)=>{
        // screen类
        const  componentStack = this.getComponentStack(component,componentTitleDic);

        // 最终的item
        let screenItem ={
            // 设置导航栏
            screen:componentStack,

            // 设置导航栏选项
            navigationOptions: ({navigation}) => ({
                // 设置标签栏的title。推荐
                tabBarLabel: componentTitleDic.tabItemTitle,
                // 是否隐藏标签栏。默认不隐藏(true)
                tabBarVisible:true,
                // 设置标签栏的图标。需要给每个都设置
                tabBarIcon: ({focused, tintColor}) => (
                    <TabBarItem
                        focused={focused}
                        normalImage={componentTitleDic.normalImage}
                        selectedImage={componentTitleDic.selectedImage}
                    />
                )
            }),
        };

        // console.log(screenItem);
        return screenItem;
    }


    // 返回对应的stack
    getComponentStack=(component,componentTitleDic)=>{
        let screenTitle = componentTitleDic.stackTopComponentKey;
        let stackTitle = componentTitleDic.stackTitle;
        let stackObj = {};

        // 设置stackObj
        stackObj[screenTitle] = {
            screen: component,

        };

        // 设置配置选项
        let options = {
            /* 定义跳转风格
                card：使用iOS和安卓默认的风格
                modal：iOS独有的使屏幕从底部画出。类似iOS的present效果
                headerMode：返回上级页面时动画效果
                float：iOS默认的效果
                screen：滑动过程中，整个页面都会返回
                none：无动画
            */
            mode:'card',
        };
        options.navigationOptions = {
            // 设置导航栏标题，推荐
            headerTitle:stackTitle,

            /*
             设置跳转页面左侧返回箭头后面的文字，默认是上一个页面的标题。
             可以自定义，也可以设置为null
             */
            headerBackTitle:null,

            /*
             设置当上个页面标题不符合返回箭头后的文字时，默认改成"返回"
             */
            headerTruncatedBackTitle:'返回',

            /*
             设置导航栏文字样式
             */
            headerTitleStyle:{
                /*测试中发现，在iphone上标题栏的标题为居中状态，而在Android上则是居左对齐。
                 * 所以需要在navigationOptions中设置headerTitleStyle
                 * 的alignSelf为 ' center '即可解决。
                 * */
                alignSelf:'center',
            },

            /*
             设置导航栏前景色
             */
            headerTintColor:'#333333',

            /*
             是否支持滑动返回手势，iOS默认支持，安卓默认关闭
             */
            gesturesEnabled:true,

            showIcon:true,
            swipeEnabled:false,
            animationEnabled:false,
        };

        // console.log(stackObj);
        return(StackNavigator(stackObj,options));
    }

}

