/**
 * Created by Administrator on 2016/10/17.
 */
//创建layui对象
layui.use('layer',function(){

    var FMPS = new Object(),//预先飞行计划系统
        viewH = $(window).outerHeight(),
        viewW = $(window).outerWidth(); // 浏览器高

    FMPS.index = {

        //初始化加载的页面
        url : null,
        //初始化
        init : function(){

            //初始化加载页面。
            //this.loadHTML( 'coord.html' );

            //加载页面
            this.clickLoadHTML();

            //input输入时候改变DOM的value值
            this.defaultValue();

            //点击变色
            this.striped()

        },
        //用户登录菜单
        nav : function(){

            var oNav = $(".nav>li"),
                off = true;
            $(document.body).on("click",function( ev ){
                var ev = ev.target || ev.SrcElement,
                    len = $(ev).parents(".nav").length,
                    _this = null;

                if( off == false && len <= 0 ){
                    $(".nav>li").removeClass("show");
                }

                if( len > 0 ){
                    _this = $(ev).parents(".nav>li");
                    if( _this.hasClass("show") ){
                        $(ev).parents(".nav>li").removeClass("show");
                    }else{
                        $(".nav>li").removeClass("show");
                        $(ev).parents(".nav>li").addClass("show");
                    }
                    off = !off;
                }

            });

        }(),
        //左侧导航功能
        sidebar : function(){
            var sidebar = $(".sidebar"),
                a_toggle = $("#sidebar .a_toggle"),
                min_a_toggle = $(".menu_min .a_toggle"),
                list_li = $(".ul_list>li"),
                shrink = $(".sidebar_foot .shrink"),
                prevH = 0;
            a_toggle.on("click" , aqiToggle1 );
            function aqiToggle1(){
                var li = $(this).parent("li"),
                    ul = $(this).siblings(".ul_list"),
                    currentH = 0,
                    openLi = a_toggle.parent("li.active");

                if( li.hasClass("active") ){
                    li.removeClass("active");
                    ul.stop().animate({
                        height : prevH
                    },300,function(){
                        $(this).hide();
                    });
                }else{
                    openLi.removeClass("active");
                    openLi.children(".ul_list").stop().animate({
                        height : prevH
                    },300,function(){
                        $(this).hide();
                    });
                    li.addClass("active");

                    if( !ul.prop("h") ){
                        ul.prop("h",ul.outerHeight())
                    }
                    currentH = ul.prop("h");
                    ul.show().css("height",prevH).stop().animate({
                        height : currentH
                    },300);
                }
            };

            list_li.on("click" , function(){
                $(".menu_min .sidebar_body>ul>li").removeClass("active");
                $(this).parents("li").first().addClass("open").siblings("li").removeClass("open").find(".ul_list>li").removeClass("active");
                $(this).addClass("active").siblings("li").removeClass("active");
            });

            //左侧缩放按钮时间
            shrink.on("click" , function(){
                sidebar.find(".ul_list").css({
                    display : "none" ,
                    height : "auto"
                });
                if( $(this).attr("data-off") == 'true' ){
                    a_toggle.off("click" , aqiToggle1 );
                    $(this).addClass("active");
                    sidebar.addClass("menu_min");
                    $("#main_content").css("marginLeft","43px");

                    $(this).attr("data-off" , "false")
                }else{
                    a_toggle.on("click" , aqiToggle1 );
                    $(this).removeClass("active");
                    sidebar.removeClass("menu_min");
                    $("#main_content").css("marginLeft","190px");
                    $(this).attr("data-off" , "true")
                };

                //主体表格宽度自适应
                var w = $("#list2").jqGrid().parent().width();
                if( $(this).attr("data-off") == "true" ){
                    $("#list2").setGridWidth( w - 147);
                }else{
                    $("#list2").setGridWidth( w + 147);
                };
            });

        }(),
        //content加载页面
        loadHTML : function( html ){
            var content = $("#content");
            var _this = this;
            var time = setTimeout(function(){
                content.addClass("loading_animate");
            },1000);

            //如果是相同的url， 只加载一次
            if( _this.url == null ){
                _this.url = html;
                content.load(html,function(){
                    clearTimeout( time );
                    content.removeClass("loading_animate");
                });
            };

            //如果是相同的url， 只加载一次
            if( html == _this.url ){
                clearTimeout( time );
                return;
            }else{
                content.load(html,function(){
                    clearTimeout( time );
                    content.removeClass("loading_animate");
                    _this.url = html;
                });
            }

            //切换页面的时候关闭所有弹出层。
            layer.closeAll();
        },
        //点击加载相应页面
        clickLoadHTML : function(){
            var _this = this;

            $(document).on("click",function(ev){
                var ev = ev || event,
                    nodes = ev.target || ev.srcElement;
                //加载申请页面
                if( $(nodes).eventHasClass("coordHTML") ){
                    _this.loadHTML("coord.html")

                    //加载查找页面
                }else if( $(nodes).eventHasClass("applyHTML") ){
                    _this.loadHTML("apply.html");

                    //加载基础信息检索 - 航站流量库 页面
                }else if( $(nodes).eventHasClass("basisFlowHTML") ){
                    _this.loadHTML("basisFlow.html");

                    //加载基础信息检索 - 地方代码 页面
                }else if( $(nodes).eventHasClass("basisLocalHTML") ){
                    _this.loadHTML("basisLocal.html");

                    //加载基础信息检索 - 机型代码 页面
                }else if( $(nodes).eventHasClass("basisModelHTML") ){
                    _this.loadHTML("basisModel.html");

                    //加载基础信息检索 - 航段时间库 页面
                }else if( $(nodes).eventHasClass("basisTimeHTML") ){
                    _this.loadHTML("basisTime.html");

                    //加载基础信息检索 - 公司代码 页面
                }else if( $(nodes).eventHasClass("basisCompanyHTML") ){
                    _this.loadHTML("basisCompany.html");

                    //加载日常计划管理 - 批量计划上传 页面
                }else if( $(nodes).eventHasClass("dailyUploadHTML") ){
                    _this.loadHTML("dailyUpload.html");

                    //加载日常计划管理 - 日常计划管理 页面
                }else if( $(nodes).eventHasClass("dailyDailyHTML") ){
                    _this.loadHTML("dailyDaily.html");

                //加载日常计划管理 - 临时航路申请 页面
                }else if( $(nodes).eventHasClass("dailyApplyHTML") ){
                    _this.loadHTML("dailyApply.html");

                //加载日常计划管理 - 预先飞行计划库管理 页面
                }else if( $(nodes).eventHasClass("dailyPreHTML") ){
                    _this.loadHTML("dailyPre.html");

                //加载时刻协调 - 导入历史库 页面
                }else if( $(nodes).eventHasClass("timeImportHTML") ){
                    _this.loadHTML("timeImport.html");

                //加载时刻协调 - 数据合并 页面
                }else if( $(nodes).eventHasClass("timeMergeHTML") ){
                    _this.loadHTML("timeMerge.html");

                //加载时刻协调 - 历史航班查询 页面
                }else if( $(nodes).eventHasClass("timeHistoryHTML") ){
                    _this.loadHTML("timeHistory.html");

                //加载时刻协调 - 外机计划查询 页面
                }else if( $(nodes).eventHasClass("timeAbroadHTML") ){
                    _this.loadHTML("timeAbroad.html");

                //加载时刻协调 - 计划审批查询 页面
                }else if( $(nodes).eventHasClass("timeApproveHTML") ){
                    _this.loadHTML("timeApprove.html");

                //加载时刻协调 - 换季统计 页面
                }else if( $(nodes).eventHasClass("timeCountHTML") ){
                    _this.loadHTML("timeCount.html");

                //加载时刻协调 - 航段时间管理 页面
                }else if( $(nodes).eventHasClass("timeLegHTML") ){
                    _this.loadHTML("timeLeg.html");

                //加载时刻协调 - 核对航路 页面
                }else if( $(nodes).eventHasClass("timeCheckHTML") ){
                    _this.loadHTML("timeCheck.html");

                //加载时刻协调 - 数据刷新 页面
                }else if( $(nodes).eventHasClass("timeRefreshHTML") ){
                    _this.loadHTML("timeRefresh.html");

                //加载系统管理 - 日志管理 页面
                }else if( $(nodes).eventHasClass("systemDayHTML") ){
                    _this.loadHTML("systemDay.html");

                //加载系统管理 - 修改密码 页面
                }else if( $(nodes).eventHasClass("systemPasswordHTML") ){
                    _this.loadHTML("systemPassword.html");

                //加载系统管理 - 系统备份 页面
                }else if( $(nodes).eventHasClass("systemBackupsHTML") ){
                    _this.loadHTML("systemBackups.html");

                //加载系统管理 - 系统初始化设置 页面
                }else if( $(nodes).eventHasClass("systemInitHTML") ){
                    _this.loadHTML("systemInit.html");

                //加载用户管理 - 站内通知 页面
                }else if( $(nodes).eventHasClass("userNoticeHTML") ){
                    _this.loadHTML("userNotice.html");

                }else{
                    return;
                }

            })

        },
        //input输入的时候改变DOM的value
        defaultValue : function(){
            $(document).on("input",function(ev){
                var ev = ev || event,
                    nodes = ev.target || ev.srcElement;
                if( nodes.tagName == "INPUT" ||  nodes.tagName == "SELECT" || nodes.tagName == "TEXTAREA"){
                    nodes.defaultValue = nodes.value;
                }else{
                    return;
                }
            })
        },

        //striped  Tr 点击变色
        striped : function(){

            $(document).on("click",function(ev){
                var ev = ev || event,
                    nodes = ev.target || ev.srcElement;
                if( $(nodes).eventHasClass("table_striped") ){
                    $(nodes).parents("tr").first().addClass("trRay").siblings().removeClass("trRay");
                }else{
                    return;
                }

            })
        }
    };
    //初始化调用
    FMPS.index.init();

});


//jq 扩展方法 ：
(function($){
    //获取事件源或者事件源父级包含 特定class的元素
    $.fn.eventHasClass = function( className ){
        var _this = this;
        if(!_this){
            return;
        };
        //初始化
        this.init = function(){
            if( _this.hasClass( className) ){
                return true;
            }else if( _this.parents("*").hasClass(className) ){
                return true
            }else{
                return false;
            }
        }
        return _this.init();
    };

    //监听功能区 fun 高度， 如果功能区出现了换行了， 下面details区padding-top增加
    $.fn.funBr = function(){
        if( !this ){
            return;
        }
        var _this = this;
        var h = 0;
        var details = $(".details");

        //初始化
        _this.init = function(){

            //初始化H值
            _this.funH();

            //初始化details  pladding-top
            _this.setPadding( details );

            //添加 resize
            _this.resize();
        };

        //设置padding-top ： margin-top
        _this.setPadding = function( obj ){
            obj.css({
                marginTop : -h,
                paddingTop : h
            });
        }

        //初始化的时候监听fun功能区的高度
        _this.funH = function(){
            if( $(".switch").length > 0 ){
                h = $(".fun:visible").outerHeight() + $(".switch").outerHeight();
            }else{
                h = _this.outerHeight();
            };
        }
        //window resize事件 ，
        _this.resize = function(){

            $(window).resize(function(){
                _this.funH();
                _this.setPadding( details );
            });
        };

        return _this.init();
    };

    //table 表格 添加隔行变色，及 点击高亮
    /*$.fn.tableModulo = function(){

        var _this = this;
        if(!_this){
            return;
        };
        var aTr = this.find("tr");
        //初始化
        _this.init = function(){
            aTr.each(function(i){
                if( i%2 ){
                    $(this).addClass("trEven");
                }else{
                    $(this).addClass("trOdd");
                }
            });
            aTr.hover(function(){
                $(this).addClass("trHover")
            },function(){
                $(this).removeClass("trHover")
            })
        };
        return this.init();
    };*/

})(jQuery);

function addFavorite(obj, opts) {
    var _t, _u;
    if (typeof opts != 'object') {
        _t = document.title;
        _u = location.href;
    } else {
        _t = opts.title || document.title;
        _u = opts.url || location.href;
    }
    try {
        window.external.addFavorite(_u, _t);
    } catch (e) {
        if (window.sidebar) {
            obj.href = _u;
            obj.title = _t;
            obj.rel = 'sidebar';
        } else {
            var ctrl = (navigator.userAgent.toLowerCase()).indexOf('mac') != -1 ? 'Command/Cmd' : 'CTRL';
            alert("抱歉，您所使用的浏览器无法完成此操作。\n\n您可以尝试通过快捷键" + ctrl + " + D 加入到收藏夹");
        }
    }
}













