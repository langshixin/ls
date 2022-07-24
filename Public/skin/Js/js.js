function AddFav(sURL,sTitle){try{window.external.addFavorite(sURL,sTitle);}catch(e){try{window.sidebar.addPanel(sTitle,sURL,"");}catch(e){alert("加入收藏失败，您的浏览器不支持此操作，请使用Ctrl+D进行添加");}}}

function SetHome(obj,vrl){try{obj.style.behavior='url(#default#homepage)';obj.setHomePage(vrl);}catch(e){if(window.netscape){try{netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");}catch(e){alert("您的浏览器不支持此操作！\n请在浏览器地址栏输入“about:config”并回车\n然后将 [signed.applets.codebase_principal_support]的值设置为'true',双击即可。");};var prefs=Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);prefs.setCharPref('browser.startup.homepage',vrl);}}}

function dk_slideplayer(object,config){
	this.obj = object;
	this.config = config ? config : {width:"300px",height:"200px",fontsize:"12px",right:"10px",bottom:"10px",time:"5000"};
	this.pause = false;
	var _this = this;
	if(!this.config.right){
		this.config.right = "0px"
	}
	if(!this.config.bottom){
		this.config.bottom = "3px"
	}
	if(this.config.fontsize == "12px" || !this.config.fontsize){
		this.size = "12px";
		this.height = "21px";
		this.right = "6px";
		this.bottom = "10px";
	}else if(this.config.fontsize == "14px"){
		this.size = "14px";
		this.height = "23px";
		this.right = "6px";
		this.bottom = "15px";
	}
	this.count = jQuery(this.obj + " li").size();
	this.n =0;
	this.j =0;
	var t;
	this.factory = function(){
		jQuery(this.obj).css({position:"relative",zIndex:"0",margin:"0",padding:"0",width:this.config.width,height:this.config.height,overflow:"hidden"})
		jQuery(this.obj).prepend("<div style='position:absolute;z-index:20;right:"+this.config.right+";bottom:"+this.config.bottom+"'></div>");
		jQuery(this.obj + " li").css({width:"100%",height:"100%",overflow:"hidden"}).each(function(i){jQuery(_this.obj + " div").append("<a>"+(i+1)+"</a>")});

		jQuery(this.obj + " img").css({border:"none",width:"100%",height:"100%"})

		this.resetclass(this.obj + " div a",0);

		jQuery(this.obj + " p").each(function(i){			
			jQuery(this).parent().append(jQuery(this).clone(true));
			jQuery(this).html("");
			jQuery(this).css({position:"absolute",margin:"0",padding:"0",zIndex:"1",bottom:"0",left:"0",height:_this.height,width:"100%",background:"#000",opacity:"0.4",overflow:"hidden"})
			jQuery(this).next().css({position:"absolute",margin:"0",padding:"0",zIndex:"2",bottom:"0",left:"0",height:_this.height,lineHeight:_this.height,textIndent:"5px",width:"100%",textDecoration:"none",fontSize:_this.size,color:"#FFFFFF",background:"none",zIndex:"1",opacity:"1",overflow:"hidden"})
			if(i!= 0){jQuery(this).hide().next().hide()}
		});

		this.slide();
		this.addhover();
		t = setInterval(this.autoplay,this.config.time);
	}
	
	this.slide = function(){
		jQuery(this.obj + " div a").mouseover(function(){
			_this.j = jQuery(this).text() - 1;
			_this.n = _this.j;
			if (_this.j >= _this.count){return;}
			jQuery(_this.obj + " li").hide();
			jQuery(_this.obj + " p").hide();
			jQuery(_this.obj + " li").eq(_this.j).fadeIn("slow");
			jQuery(_this.obj + " li").eq(_this.j).find("p").show();
			_this.resetclass(_this.obj + " div a",_this.j);
		});
	}

	this.addhover = function(){
		jQuery(this.obj).hover(function(){clearInterval(t);}, function(){t = setInterval(_this.autoplay,_this.config.time)});
	}
	
	this.autoplay = function(){
		_this.n = _this.n >= (_this.count - 1) ? 0 : ++_this.n;
		jQuery(_this.obj + " div a").eq(_this.n).triggerHandler('mouseover');
	}
	
	this.resetclass =function(obj,i){
		jQuery(obj).css({float:"left",marginRight:"3px",width:"15px",height:"14px",lineHeight:"15px",textAlign:"center",fontWeight:"800",fontSize:"12px",color:"#000",background:"#FFFFFF",cursor:"pointer"});
		jQuery(obj).eq(i).css({color:"#FFFFFF",background:"#FF9900",textDecoration:"none"});
	}

	this.factory();
}

var flag = "left";
function dy_scroll(wraper,prev,next,img,speed,or){  
	var wraper = $(wraper); 
	var prev = $(prev); 
	var next = $(next); 
	var img = $(img).find('ul'); 
	var w = img.find('li').outerWidth(true); 
	var s = speed; 
	next.click(function(){ 
		img.animate({'margin-left':-w}/*,1500,'easeOutBounce'*/,function(){ 
			img.find('li').eq(0).appendTo(img); 
			img.css({'margin-left':0}); 
		}); 
		flag = "left";
	}); 
	prev.click(function(){ 
		img.find('li:last').prependTo(img); 
		img.css({'margin-left':-w}); 
		img.animate({'margin-left':0}/*,1500,'easeOutBounce'*/); 
		flag = "right";
	}); 
	if (or == true){ 
		ad = setInterval(function() { flag == "left" ? next.click() : prev.click()},s*1000); 
		wraper.hover(function(){clearInterval(ad);},function(){ad = setInterval(function() {flag == "left" ? next.click() : prev.click()},s*1000);});
	} 
} 


/*更换显示样式*/
function setTab(name,cursel,n){
 for(i=1;i<=n;i++){
  var menu=document.getElementById(name+i);
  var con=document.getElementById("con_"+name+"_"+i);
  menu.className=i==cursel?"hover":"";
  con.style.display=i==cursel?"block":"none";
 }
}

//重载验证码
function fleshVerify(){
	var timenow = new Date().getTime();
	document.getElementById('verifyImg').src= URL+'/verify?'+timenow;
}
	
//字体大小转换
function changeFontSize(value) {
  var htmlContent;
  if(value == "12") {
    htmlContent = " 选择字号：<strong>小</strong> <a href=\"javascript:changeFontSize('14');\">中</a> <a href=\"javascript:changeFontSize('16');\">大</a> ";
  }
  if(value == "14") {
    htmlContent = " 选择字号：<a href=\"javascript:changeFontSize('12');\">小</a> <strong>中</strong> <a href=\"javascript:changeFontSize('16');\">大</a> ";
  }
  if(value == "16") {
    htmlContent = " 选择字号：<a href=\"javascript:changeFontSize('12');\">小</a> <a href=\"javascript:changeFontSize('14');\">中</a> <strong>大</strong> ";
  }
  $('span.fontSwitcher').html(htmlContent);
  $('#zoom p').css("font-size", value+"px");
  $('#zoom div').css("font-size", value+"px");
  $('#zoom').css("font-size", value+"px");
}

//复制地址
function copy_url(){
	var clipBoardContent=""; 
	clipBoardContent+=document.title; //获取标题 
	clipBoardContent+="\n"; 
	clipBoardContent+=this.location.href; //获取地址
	if (window.clipboardData){
	window.clipboardData.setData("Text", clipBoardContent);}
	else if (window.netscape){
	netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');
	var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance

	(Components.interfaces.nsIClipboard);
	if (!clip) return;
	var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance

	(Components.interfaces.nsITransferable);
	if (!trans) return;
	trans.addDataFlavor('text/unicode');
	var str = new Object();
	var len = new Object();
	var str = Components.classes["@mozilla.org/supports-string;1"].createInstance

	(Components.interfaces.nsISupportsString);
	var copytext=clipBoardContent;
	str.data=copytext;
	trans.setTransferData("text/unicode",str,copytext.length*2);
	var clipid=Components.interfaces.nsIClipboard;
	if (!clip) return false;
	clip.setData(trans,null,clipid.kGlobalClipboard);}
	alert("复制成功,您可以发送给你的好友啦!\n（谷歌浏览器不支持此操作，请手动复制）");
}

$(function(){
	// -- Constants --
	var PLACE_HOLDER_COLOR = "rgb(98,98,98)"; // "darkGrey" does not work in IE6
	var PLACE_HOLDER_DATA_NAME = "original-font-color";
	
	// -- Util Methods --	
	var getContent = function(element){
		return $(element).val();		
	}

	var setContent = function(element, content){
		$(element).val(content);		
	}
	
	var getPlaceholder = function(element){
		return $(element).attr("placeholder");
	}
	
	var isContentEmpty = function(element){
		var content = getContent(element);
		return (content.length === 0) || content == getPlaceholder(element);
	}
		
	var setPlaceholderStyle = function(element){
		$(element).data(PLACE_HOLDER_DATA_NAME, $(element).css("color"));
		$(element).css("color", PLACE_HOLDER_COLOR);		
	}
	
	var clearPlaceholderStyle = function(element){
		$(element).css("color", $(element).data(PLACE_HOLDER_DATA_NAME));		
		$(element).removeData(PLACE_HOLDER_DATA_NAME);
	}
	
	var showPlaceholder = function(element){
		setContent(element, getPlaceholder(element));
		setPlaceholderStyle(element);	
	}
	
	var hidePlaceholder = function(element){
		if($(element).data(PLACE_HOLDER_DATA_NAME)){
			setContent(element, "");
			clearPlaceholderStyle(element);
		}
	}
	
	// -- Event Handlers --
	var inputFocused = function(){
		if(isContentEmpty(this)){
			hidePlaceholder(this);		
		}
	}
	
	var inputBlurred = function(){
		if(isContentEmpty(this)){
			showPlaceholder(this);
		}
	}
	
	var parentFormSubmitted = function(){
		if(isContentEmpty(this)){
			hidePlaceholder(this);		
		}	
	}
	
	// -- Bind event to components --
	$("textarea, input[type='text']").each(function(index, element){
		if($(element).attr("placeholder")){
			$(element).focus(inputFocused);
			$(element).blur(inputBlurred);
			$(element).bind("parentformsubmitted", parentFormSubmitted);
			
			// triggers show place holder on page load
			$(element).trigger("blur");
			// triggers form submitted event on parent form submit
			$(element).parents("form").submit(function(){
				$(element).trigger("parentformsubmitted");
			});
		}
	});
});

function Get_Spider(){
	$.ajax({
	type: "get",
	cache:false,
	url: "/index.php/Ajax/spider",
	timeout: 20000,
	error: function(){},
	success: function(){}
	});
}

function submitOrder(src, _oid) {
    var _contact = $("#txtContact").val();  
    var _mobile = $("#txtMobile").val();
    var _email = $("#txtEmail").val();
    var _content = $("#txtContent").val();
    var errorMsg = "";
    if (_contact.length == 0 || _contact == "请填写联系人") {
        alert("请填写联系人!");
		return false;
    }
    if (_mobile.length == 0) {
        alert("请填写手机!");
		return false;
    }
    var ptns = /^\d{11,13}$/;
    if (_mobile.length > 0 && !ptns.test(_mobile)) {
        alert("手机格式错误!");
		return false;
    }
    var ptn = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    if (_email.length > 0 && !ptn.test(_email)) {
        alert("邮件格式错误!");
		return false;
    }
    if (_content.length == 0 || _content == "请填写您要咨询的信息") {
        alert("请填写留言内容!");
		return false;
    }
	 $.ajax({
		type: "POST",
		url:"/index.php/Products/order?t=" + Math.random(),
		data: ({
			products_id: _oid,
			name: _contact,   
			mob: _mobile,
			email: _email,   
			content: _content,
			onv: 1
		}),
		dataType: "json",
		success: function(data) {
			if (data.status == 1) {
				info = data.info;
				alert(info);
				emptyText('tbForm1');
			} else {
				info = data.info;
				alert(info);
			}
		}
	});
}
function emptyText(cntrId) {
    var jTxts;
    if (cntrId == null) {
        jTxts = $("body").find("input[type=text]");
    } else {
        jTxts = $("#"+cntrId).find("input[type=text]");
    }
    var jTxtss;
    if (cntrId == null) {
        jTxtss = $("body").find("input[type=password]");
    } else {
        jTxtss = $("#"+cntrId).find("input[type=password]");
    }
    jTxts.each(function () {
        $(this).attr("value", "");
    });
    jTxtss.each(function () {
        $(this).attr("value", "");
    });
    if (cntrId == null)
        jTxts = $("body").find("textarea");
    else
        jTxts = $("#"+cntrId).find("textarea");
    jTxts.each(function () {
        $(this).attr("value", "");
    });
}