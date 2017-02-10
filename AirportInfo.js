/**
 * Created by Administrator on 2016/12/07.
 */
 
window.AirportInfo = {};

$(function(){
	
	//创建弹窗对象
	//var layer = layui.layer;

	//创建页面级对象
	AirportInfo = {
			
			//数据地址
			dateUrl : null ,
			
			//分页地址
			pageUrl : null ,
			
			//参数
			options: {
			    page: 1, //当前页
			    rows: 20, //每页显示多少
			    pageSize: 0, //总条数
			    AllPage: 0 //总共多少页			   
			} ,
			
			//数据
			data : null ,
			
			//查询开关
			off : false ,
			
			//dom节点
			element : { 
				
				searchText : $("#search_text") , //查询文本框
				
				searchBtn : $("#search_btn") , //查询按钮
				
				searchSelect : $("#search_select"), //下拉菜单
				
				_body : $("body"),
				
				terminalONE : $("#search_text_terminalONE") , //航路时间库  search 1
				
				terminalTWO : $("#search_text_terminalTWO")  //航路时间库  search 2
				
			},
			
			//初始化
			init : function( dateUrl , pageUrl , type ){
			    var _this = this;
				
				//生成表格的类型
				//this["type"] = type;
				
				//初始化数据URL
				//this.dateUrl = dateUrl;
				
				//初始化分页URL
				//this.pageUrl = pageUrl;
				
				//初始化执行数据请求
				//this.ajax(this.dateUrl);
				
				//总数据 - 分页
				//this.ajaxPage();
				
				//初始化滚动加载数据
				//this.scroll();
			    
				//初始化点击事件
				this.clicks();
				
				//初始化聚焦事件
				//this._focus();
				
				//初始化blur事件
				//this._blur();
				
				//初始化keydown事件
				//this.keydown();
				
				
					
			},
			
			//focus事件 
			_focus : function(){ 
				
				var _this = this ,
					text = _this.element.searchText , 
					terminalONE = _this.element.terminalONE , 
					terminalTWO = _this.element.terminalTWO;
					
				text.on("focus",function(){ 
					_this.off = true;
				});
				terminalONE.on("focus",function(){ 
					_this.off = true;
				});
				terminalTWO.on("focus",function(){ 
					_this.off = true;
				});
				
			},
			
			//blur事件
			_blur : function(){ 
				var _this = this ,
					text = _this.element.searchText,
					terminalONE = _this.element.terminalONE , 
					terminalTWO = _this.element.terminalTWO;
					
				text.on("blur",function(){ 
					_this.off = false;
				});
				terminalONE.on("blur",function(){ 
					_this.off = false;
				});
				terminalTWO.on("blur",function(){ 
					_this.off = false;
				});
			},
			
			//click事件
			clicks : function(){ 
				
				var _this = this,
					btn = _this.element.searchBtn;
				
				//查询按钮
				btn.click(function(){
					 
					_this.search();
				});
				
			},
			
			//onkeydown事件
			keydown : function(){ 
			
				var _this = this;
				
				//回车查询
				$(document).on("keydown",function(ev){ 
					var ev = ev || event , 
						keyCode = ev.keyCode;
					
					if( keyCode == 13 ){ 
						if( _this.off ){ 
							_this.search();
						};
					}else{ 
						return;
					};					
				})
			},
			
			//搜索
			search : function(value){
				
				var _this = this , 
					value1 = _this.element.searchText.val(),
					value2 = _this.element.searchSelect.val(); 
				$("#airportData tbody").html("");
				
				_this.options.page = 1;
				
				if( _this.type == "Airport" ){ //地方代码查询
				
				    _this.options.THREE_CODE = value1 != "" && value2 == "THREE_CODE" ? value1 : "";
					_this.options.FOUR_CODE = value1 != "" && value2 == "FOUR_CODE" ? value1 : "";
					
				}else if( _this.type == "Airline" ){ //公司代码查询
				
					_this.options.TWO_CODE = value1 != "" && value2 == "TWO_CODE" ? value1 : "";
					_this.options.THREE_CODE = value1 != "" && value2 == "THREE_CODE" ? value1 : "";
					
				}else if( _this.type == "Aircraft" ){ //机型代码查询
					
					_this.options.ThreeCode = value1 != "" && value2 == "ThreeCode" ? value1 : "";
					
				}else if( _this.type == "CityPair" ){ //航段时间库查询
					
					value1 = _this.element.terminalONE.val();
					value2 = _this.element.terminalTWO.val();					 
					_this.options.terminalONE = value1;
					_this.options.terminalTWO = value2;
				}else{ 
					return;
				}; 
				
				
				_this.ajax(_this.dateUrl);
                _this.ajaxPage();
				
			},
			
			//滚动加载数据
			scroll : function(){
				var _this = this;
				var fun = $(".fun")
					h = fun.offset().top , 
					time = null;
					
				$(window).on("scroll",function(){
					var scrollTop = $(document).scrollTop();
					var scrollLeft = $(document).scrollLeft();
					
					_this.headX( scrollLeft );
					
					//监测固定
					_this.fixed( scrollTop , h );
					
					//滚动条置地加载数据
					if( scrollTop != 0 && scrollTop >= $(document).height() - $(window).height() ){
						
						_this.options.page ++;
						
						if( _this.options.page > _this.options.AllPage ){
							
							//如果没有数据创建提示
							layer.msg('没有数据了哦！', {icon: 5}); 
							
							return;
						};
						
						_this.ajax( _this.dateUrl );
						
					}else{ 
						return;
					};	
				});	
			},
			
			//滚动功能区 表头固定
			fixed : function( top , h){
				var fun = $(".fun") , 
					head = $(".overflow_head"),
					bodys = $(".AirportB");
										
				if( top >= h ){ 
					fun.addClass("AirportFix1");
					head.addClass("AirportFix2");
					bodys.addClass("AirportFix3")
				}else{ 
					fun.removeClass("AirportFix1");
					head.removeClass("AirportFix2");	
					bodys.removeClass("AirportFix3");	
				};
					
			},
			
			//解决小分辨率下 表头X轴不动问题
			headX : function(left){ 
				var head = $(".overflow_head");
				
				if( left > 0 ){ 
					head.css({ 
						left : -left
					})
				}else{ 
					head.css({ 
						left : "auto"
					})
				};				
			},
			
			//请求总页数
			ajaxPage : function(){
				var _this = this;
				$.ajax({
					type: "POST",
					url: _this.pageUrl,
					data: _this.options,
					success: function (result) {
						
						//总数据数
						_this.options.pageSize = result;
						//计算总页数
						_this.options.AllPage = (result/20) ? ( Math.ceil(result/20) ) : (result/20);				
					}
				});
			},
			
			//请求数据
			ajax : function(url){
				
				var _this = this,
					time = null ,
					loding;
				time = setTimeout(function(){ 
					loding = layer.open({
						type : 3,
						id : "loding"
					});
				},200);		
				$.ajax({
					type: "POST",
					url: url,
					data: _this.options,
					success: function (result) {
						
						_this.data = result;
						
						//初始化生成表格
						var off = _this.createTable(_this.data);
						
						//如果生成表格成功  消除加载层
						if( off ){ 
							clearTimeout(time);
							layer.close(loding);
						};

						return;
					}
				});		
			},
			
			//生成表格
			createTable : function(){
				
				var html; 
				
				var _this = this,
					data = arguments[0],
					line = 0;
					
				if( !data ){
					data = _this.data;
				}else{ 
					data = arguments[0];
				};
				//console.log( _this.options.page )
				$.each( data , function (i, item) {
					
					//计算行号
					if( _this.options.page == 1){ 
						line = i + 1;
					}else{ 
						if( _this.options.page == 2 ){
							line = _this.options.page*10 + i + 1;	
						}else{ 
							line = (_this.options.page*10 + (_this.options.page-2)*10 ) + i + 1;	
						};
					};
					
					//判断类型生成表格
					if (_this.type == "Airport") { html = _this.Airport(line, item); }
					else if (_this.type == "Airline") {html = _this.Airline(line, item);}
					else if (_this.type == "Aircraft") { html = _this.Aircraft(line, item); }
					else if (_this.type == "CityPair") {html = _this.CityPair(line, item);};
					
					$("#airportData tbody").append( html );
				});
				
				//如果成功输出true;
				return true;
			},
			
			//地方代码的表格
			Airport : function( line , date ){
				var str = []; 
				str.push('<tr>');
					str.push('<td>'+ line + '</td>');
					str.push('<td> ' + date.FOUR_CODE + '</td>');
					str.push('<td> ' + date.THREE_CODE + '</td>');
					str.push('<td> ' + date.ISSC + '</td>');
					str.push('<td> ' + date.SHORT_NAME + '</td>');
					str.push('<td> ' + date.EN_NAME + '</td>');
					str.push('<td> ' + date.CH_NAME + '</td>');
				str.push('</tr>');
				
				return str.join('');
			},
			
			//公司代码的表格
			Airline : function( line , date ){
				var str = []; 
				str.push('<tr>');
					str.push('<td>' + line + '</td>');
					str.push('<td> ' + date.THREE_CODE + '</td>');
					str.push('<td> ' + date.TWO_CODE + '</td>');
					str.push('<td> ' + date.CH_NAME_SHORT + '</td>');
					str.push('<td> ' + date.CH_NAME + '</td>');
					str.push('<td> ' + date.EN_NAME + '</td>');
					str.push('<td> ' + date.BASECODE + '</td>');
                str.push('</tr>');
				
				return str.join('');
			},
			
			//机型代码的表格
			Aircraft: function (line, date) {
			    var str = [];
			    str.push('<tr>');
			    str.push('<td>' + line + '</td>');
			    str.push('<td> ' + date.ThreeCode + '</td>');
			    str.push('<td> ' + date.Longname + '</td>');
			    str.push('<td> ' + date.Aclevel + '</td>');
			    str.push('<td> ' + date.Seats + '</td>');
			    str.push('<td> ' + date.Speed + '</td>');
			    str.push('<td> ' + date.Actype + '</td>');
			    str.push('<td> ' + date.citypairactype + '</td>');
			    str.push('<td> ' + date.PickOutTime + '</td>');
			    str.push('<td> ' + date.OtherTime + '</td>');
			    str.push('</tr>');
			    return str.join('');
			},
			
			//航段时间库的表格
			CityPair: function (line, date) {
			    var str = [];
			    str.push('<tr>');
			    str.push('<td>' + line + '</td>');
			    str.push('<td> ' + date.terminalONE + '</td>');
			    str.push('<td> ' + date.terminalTWO + '</td>');
			    str.push('<td> ' + date.summer_8OUT + '</td>');
			    str.push('<td> ' + date.summer_8IN + '</td>');
			    str.push('<td> ' + date.winter_8OUT + '</td>');
			    str.push('<td> ' + date.winter_8IN + '</td>');
			    str.push('<td> ' + date.summer_7OUT + '</td>');
			    str.push('<td> ' + date.summer_7IN + '</td>');
			    str.push('<td> ' + date.winter_7OUT + '</td>');
			    str.push('<td> ' + date.winter_7IN + '</td>');
			    str.push('<td> ' + date.summer_6OUT + '</td>');
			    str.push('<td> ' + date.summer_6IN + '</td>');
			    str.push('<td> ' + date.winter_6OUT + '</td>');
			    str.push('<td> ' + date.winter_6IN + '</td>');
			    str.push('<td> ' + date.summer_5OUT + '</td>');
			    str.push('<td> ' + date.summer_5IN + '</td>');
			    str.push('<td> ' + date.winter_5OUT + '</td>');
			    str.push('<td> ' + date.winter_5IN + '</td>');
			    str.push('<td> ' + date.summer_4OUT + '</td>');
			    str.push('<td> ' + date.summer_4IN + '</td>');
			    str.push('<td> ' + date.winter_4OUT + '</td>');
			    str.push('<td> ' + date.winter_4IN + '</td>');
			    str.push('</tr>');
			    return str.join('');
			}			
		};
		
	//初始化执行
	AirportInfo.init( dateUrl , pageUrl , type);
});

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