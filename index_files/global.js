/* This function is used to change the style class of an element */
function swapClass(obj, newStyle) {
    obj.className = newStyle;
}
function isUndefined(value) {   
    var undef;
    return value == undef;     
}
function checkAll(theForm) { // check all the checkboxes in the list
  for (var i=0;i<theForm.elements.length;i++) {
    var e = theForm.elements[i];
        var eName = e.name;
        if (eName != 'allbox' && 
            (e.type.indexOf("checkbox") == 0)) {
            e.checked = theForm.allbox.checked;        
        }
    } 
}
function setCheckStatusAll(theForm, checked) { // check all the checkboxes in the list
	  for (var i=0;i<theForm.elements.length;i++) {
	    var e = theForm.elements[i];
	        var eName = e.name;
	        if (e.type.indexOf("checkbox") == 0) {
	            e.checked = checked;        
	        }
	    } 
	}
/* Function to clear a form of all it's values */
function clearForm(frmObj) {
    for (var i = 0; i < frmObj.length; i++) {
        var element = frmObj.elements[i];
        if(element.type.indexOf("text") == 0 || 
                element.type.indexOf("password") == 0) {
                    element.value="";
        } else if (element.type.indexOf("radio") == 0) {
            element.checked=false;
        } else if (element.type.indexOf("checkbox") == 0) {
            element.checked = false;
        } else if (element.type.indexOf("select") == 0) {
            for(var j = 0; j < element.length ; j++) {
                element.options[j].selected=false;
            }
            element.options[0].selected=true;
        }
    } 
}
/* Function to get a form's values in a string */
function getFormAsString(frmObj) {
    var query = "";
    for (var i = 0; i < frmObj.length; i++) {
        var element = frmObj.elements[i];
        if (element.type.indexOf("checkbox") == 0 || 
            element.type.indexOf("radio") == 0) { 
            if (element.checked) {
                query += element.name + '=' + escape(element.value) + "&";
            }
        } else if (element.type.indexOf("select") == 0) {
            for (var j = 0; j < element.length ; j++) {
                if (element.options[j].selected) {
                    query += element.name + '=' + escape(element.value) + "&";
                }
            }
        } else {
            query += element.name + '=' 
                  + escape(element.value) + "&"; 
        }
    } 
    return query;
}
/* Function to hide form elements that show through
   the search form when it is visible */
function toggleForm(frmObj, iState){ // 1 visible, 0 hidden 
    for(var i = 0; i < frmObj.length; i++) {
        if (frmObj.elements[i].type.indexOf("select") == 0 || frmObj.elements[i].type.indexOf("checkbox") == 0) {
            frmObj.elements[i].style.visibility = iState ? "visible" : "hidden";
        }
    } 
}
/* Helper function for re-ordering options in a select */
function opt(txt,val,sel) {
    this.txt=txt;
    this.val=val;
    this.sel=sel;
}
/* Function for re-ordering <option>'s in a <select> */
function move(list,to) {     
    var total=list.options.length;
    index = list.selectedIndex;
    if (index == -1) return false;
    if (to == +1 && index == total-1) return false;
    if (to == -1 && index == 0) return false;
    to = index+to;
    var opts = new Array();
    for (i=0; i<total; i++) {
        opts[i]=new opt(list.options[i].text,list.options[i].value,list.options[i].selected);
    }
    tempOpt = opts[to];
    opts[to] = opts[index];
    opts[index] = tempOpt
    list.options.length=0; // clear
    for (i=0;i<opts.length;i++) {
        list.options[i] = new Option(opts[i].txt,opts[i].val);
        list.options[i].selected = opts[i].sel;
    }
    list.focus();
} 
/*  This function is to select all options in a multi-valued <select> */
function selectAll(elementId) {
    var element = document.getElementById(elementId);
    len = element.length;
    if (len != 0) {
        for (i = 0; i < len; i++) {
            element.options[i].selected = true;
        }
    }
}
/* This function is used to select a checkbox by passing
 * in the checkbox id
 */
function toggleChoice(elementId) {
    var element = document.getElementById(elementId);
    if (element.checked) {
        element.checked = false;
    } else {
        element.checked = true;
    }
}
/* This function is used to select a radio button by passing
 * in the radio button id and index you want to select
 */
function toggleRadio(elementId, index) {
    var element = document.getElementsByName(elementId)[index];
    element.checked = true;
}
/* This function is used to open a pop-up window */
function openWindow(url, winTitle, winParams) {
    winName = window.open(url, winTitle, winParams);
    winName.focus();
}
/* This function is to open search results in a pop-up window */
function openSearch(url, winTitle) {
    var screenWidth = parseInt(screen.availWidth);
    var screenHeight = parseInt(screen.availHeight);
    var winParams = "width=" + screenWidth + ",height=" + screenHeight;
        winParams += ",left=0,top=0,toolbar,scrollbars,resizable,status=yes";

    openWindow(url, winTitle, winParams);
}
/* This function is used to set cookies */
function setCookie(name,value,expires,path,domain,secure) {
  document.cookie = name + "=" + escape (value) +
    ((expires) ? "; expires=" + expires.toGMTString() : "") +
    ((path) ? "; path=" + path : "") +
    ((domain) ? "; domain=" + domain : "") + ((secure) ? "; secure" : "");
}
/* This function is used to get cookies */
function getCookie(name) {
    var prefix = name + "=" 
    var start = document.cookie.indexOf(prefix) 
    if (start==-1) {
        return null;
    }
    var end = document.cookie.indexOf(";", start+prefix.length) 
    if (end==-1) {
        end=document.cookie.length;
    }
    var value=document.cookie.substring(start+prefix.length, end) 
    return unescape(value);
}
/* This function is used to delete cookies */
function deleteCookie(name,path,domain) {
  if (getCookie(name)) {
    document.cookie = name + "=" +
      ((path) ? "; path=" + path : "") +
      ((domain) ? "; domain=" + domain : "") +
      "; expires=Thu, 01-Jan-70 00:00:01 GMT";
  }
}
// This function is for stripping leading and trailing spaces
String.prototype.trim = function () {
    return this.replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1");
};
// This function is used by the login screen to validate user/pass
// are entered. 
function validateRequired(form){
    var bValid = true;
    var focusField = null;
    var i = 0;                                                                                          
    var fields = new Array();                                                                           
    oRequired = new required();                                                                         
                                                                                                        
    for (x in oRequired) {                                                                              
        if ((form[oRequired[x][0]].type == 'text' || form[oRequired[x][0]].type == 'textarea' || form[oRequired[x][0]].type == 'select-one' || form[oRequired[x][0]].type == 'radio' || form[oRequired[x][0]].type == 'password') && form[oRequired[x][0]].value == '') {
           if (i == 0)
              focusField = form[oRequired[x][0]]; 
              
           fields[i++] = oRequired[x][1];
            
           bValid = false;                                                                             
        }                                                                                               
    }                                                                                                   
                                                                                                       
    if (fields.length > 0) {
       focusField.focus();
       alert(fields.join('\n'));                                                                      
    }                                                                                                   
                                                                                                       
    return bValid;                                                                                      
}
// This function is a generic function to create form elements
function createFormElement(element, type, name, id, value, parent) {
    var e = document.createElement(element);
    e.setAttribute("name", name);
    e.setAttribute("type", type);
    e.setAttribute("id", id);
    e.setAttribute("value", value);
    parent.appendChild(e);
}
function confirmDelete(obj) {   
    var msg = "Are you sure you want to delete this " + obj + "?";
    ans = confirm(msg);
    if (ans) {
        return true;
    } else {
        return false;
    }
}
function highlightTableRows(tableId) {
    var previousClass = null;
    var table = document.getElementById(tableId); 
    var startRow = 0;
    // workaround for Tapestry not using thead
    if (!table.getElementsByTagName("thead")[0]) {
	    startRow = 1;
    }
    var tbody = table.getElementsByTagName("tbody")[0];
    var rows = tbody.getElementsByTagName("tr");
    // add event handlers so rows light up and are clickable
    for (i=startRow; i < rows.length; i++) {
        rows[i].onmouseover = function() { previousClass=this.className;this.className+=' over' };
        rows[i].onmouseout = function() { this.className=previousClass };
        rows[i].onclick = function() {
            var cell = this.getElementsByTagName("td")[0];
            var link = cell.getElementsByTagName("a")[0];
            if (link.onclick) {
                call = link.getAttribute("onclick");
                if (call.indexOf("return ") == 0) {
                    call = call.substring(7);
                } 
                // this will not work for links with onclick handlers that return false
                eval(call);
            } else {
                location.href = link.getAttribute("href");
            }
            this.style.cursor="wait";
            return false;
        }
    }
}
function highlightFormElements() {
    // add input box highlighting
    addFocusHandlers(document.getElementsByTagName("input"));
    addFocusHandlers(document.getElementsByTagName("textarea"));
}
function addFocusHandlers(elements) {
    for (i=0; i < elements.length; i++) {
        if (elements[i].type != "button" && elements[i].type != "submit" &&
            elements[i].type != "reset" && elements[i].type != "checkbox" && elements[i].type != "radio") {
            if (!elements[i].getAttribute('readonly') && !elements[i].getAttribute('disabled')) {
                elements[i].onfocus=function() {this.style.backgroundColor='#ffd';this.select()};
                elements[i].onmouseover=function() {this.style.backgroundColor='#ffd'};
                elements[i].onblur=function() {this.style.backgroundColor='';}
                elements[i].onmouseout=function() {this.style.backgroundColor='';}
            }
        }
    }
}
function radio(clicked){
    var form = clicked.form;
    var checkboxes = form.elements[clicked.name];
    if (!clicked.checked || !checkboxes.length) {
        clicked.parentNode.parentNode.className="";
        return false;
    }
    for (i=0; i<checkboxes.length; i++) {
        if (checkboxes[i] != clicked) {
            checkboxes[i].checked=false;
            checkboxes[i].parentNode.parentNode.className="";
        }
    }
    // highlight the row    
    clicked.parentNode.parentNode.className="over";
}
window.onload = function() {
    //highlightFormElements();
    if ($('successMessages')) {
        new Effect.Highlight('successMessages');
        // causes webtest exception on OS X : http://lists.canoo.com/pipermail/webtest/2006q1/005214.html
        // window.setTimeout("Effect.DropOut('successMessages')", 3000);
    }
    if ($('errorMessages')) {
        new Effect.Highlight('errorMessages');
    }
    /* Initialize menus for IE */
    if ($("primary-nav")) {
        var navItems = $("primary-nav").getElementsByTagName("li");
        for (var i=0; i<navItems.length; i++) {
            if (navItems[i].className == "menubar") {
                navItems[i].onmouseover=function() { this.className += " over"; }
                navItems[i].onmouseout=function() { this.className = "menubar"; }
            }
        }
    }
}
// Show the document's title on the status bar
window.defaultStatus=document.title;
function filterKey(evt,obj) {
	var keycode;
	keycode = (evt.keyCode==0) ? evt.which : evt.keyCode;
	if( keycode == 8 || keycode == 46){
		obj.value="";
	}
}
function getUrlParam( name ){
	  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	  var regexS = "[\\?&]"+name+"=([^&#]*)";
	  var regex = new RegExp( regexS );
	  var results = regex.exec( window.location.href );
	  if( results == null )
	    return "";
	  else
	    return results[1];
}
function setUrlParam(name, value, dropParameters){
	if(location.search.length>0){
		var params=location.href.toQueryParams();
		eval("params."+name+"='"+value+"'");
		dropParameters.each(function(curPar) {
			eval("delete params."+curPar);
		});
		return location.href.slice(0, location.href.search(/\?/))+"?"+$H(params).toQueryString();
	}else return location.href+"?"+name+"="+value;
}
function ShowHidder(status, cursorStyle, opacity, duration){
	if(status==true){
		if(!$('HidderDiv')){									//Creating hider blocks
			var HidderIframe=document.createElement("IFRAME");
			var HidderDiv=document.createElement("DIV");
			HidderIframe.setAttribute("id","HidderIframe");
			HidderIframe.setAttribute("frameborder","0");
			HidderIframe.setAttribute("hspace","0");
			HidderIframe.setAttribute("vspace","0");
			HidderDiv.setAttribute("id","HidderDiv");
			document.lastChild.lastChild.appendChild(HidderIframe);
			document.lastChild.lastChild.appendChild(HidderDiv);
		}
		var WindowWidth=document.body.clientWidth+"px";
		var WindowHeight=document.lastChild.scrollHeight+300+"px";
		$('HidderDiv').setStyle({position: 'absolute', background: '#000000',zIndex: '3', display:'none', left:'0px', top:'0px', cursor: cursorStyle, width: WindowWidth, height: WindowHeight});
		$('HidderIframe').setStyle({position: 'absolute',zIndex: '2', display:'block', left:'0px', top:'0px', opacity: '0.0', width: WindowWidth, height: WindowHeight});
		Effect.toggle('HidderDiv','appear',{duration: duration, from: 0.0 , to: opacity});
	}else{
		if($('HidderDiv')&&(!$('HidderDiv').style.display)){
			var DivOpacity=$('HidderDiv').getOpacity();
			$('HidderIframe').style.display="none";
			Effect.toggle('HidderDiv','appear',{duration: duration, from: DivOpacity , to: 0.0});
		}
	}
}
function ShowTooltip(status, textFF, event){
	if(status==true){
		if (!$('TooltipDiv')){
			var TooltipDiv=document.createElement("DIV");
			TooltipDiv.setAttribute("id","TooltipDiv");
			document.lastChild.lastChild.appendChild(TooltipDiv);
		}
		var LeftIndent=(Event.pointerX(event)-105)+"px";
		var RightIndent=(Event.pointerY(event))+"px";
		$('TooltipDiv').setStyle({position: 'absolute', background: '#F7F7F7',zIndex: '4', display:'block', border: 'solid #D0E9F2 1px', width: '90px', fontSize: '10px', left: LeftIndent, top: RightIndent});
		$('TooltipDiv').innerHTML=textFF;
	}else {if($('TooltipDiv')) {$('TooltipDiv').style.display="none";}}
}
/*
function ShowCalendar(serverDay,serverMonth,serverYear){
	if(serverDay>0 && serverMonth>0 && serverYear>0){
		serverMonth-=1;
		var daysDisabled=new Array();
		var monthDisabled=new Array();
		for (var i=1; i<serverDay;i++) daysDisabled.push(i);
		for (var i=1; i<32;i++) monthDisabled.push(i);
		var specialDaysStr="SPECIAL_DAYS = {";
		for (var i=0; i<12;i++){
			if (i<serverMonth) specialDaysStr+=i+":monthDisabled";
			else if(i==serverMonth) specialDaysStr+=i+":daysDisabled";
			else specialDaysStr+=i+":[]";
			if(i!=11)specialDaysStr+=",";
		}
		specialDaysStr+="}";
		eval(specialDaysStr);

//		var SPECIAL_DAYS = {
//			0 : monthDisabled,
//			1 : monthDisabled,
//			2 : monthDisabled,
//			3 : daysDisabled,
//			4 : [3,5]
//		};
		function dateIsSpecial(year, month, day){
			var m = SPECIAL_DAYS[month];
			if (!m || serverYear+2000!=year) return false;
			for (var i in m) if (m[i] == day) return true;
			return false;
		}
		function ourDateStatusFunc(date, y, m, d) {
			if (dateIsSpecial(y, m, d))return "special";
			else return false; // other dates are enabled
			// return true if you want to disable other dates
		}
		function CalendarSelection(calendar, date) {
			if (dateIsSpecial(calendar.date.getFullYear(),calendar.date.getMonth(),calendar.date.getDate())){
				$("dateField").value="";
			}else{
				var hoursField=document.getElementsByClassName('hour')[0];
				var minutesField=document.getElementsByClassName('minute')[0];
				var timeSelected="";
				if (hoursField && minutesField) timeSelected=" "+hoursField.innerHTML+":"+minutesField.innerHTML;
				$("dateField").value=date+timeSelected;
			}
		}
		//function closed(cal) {
		//	try{document.getElementsByClassName('calendar')[0].remove();}catch(er){}
		//}
		var yearRange=new Array(serverYear+2000, serverYear+2001);
		Calendar.setup(
			{	dateStatusFunc	:ourDateStatusFunc,
				onSelect	:	CalendarSelection,
				range		:	yearRange,
				onClose		:	closed,
				showsTime	:	true,
				timeFormat	:	"24",
				ifFormat	:	"%Y/%m/%d %H:%M", // the date format
				button		:	"dateButton"      // ID of the button
			}
		);
	}else{
		function closed(cal) {
			try{document.getElementsByClassName('calendar')[0].remove();}catch(er){}
		}
		Calendar.setup(
				{	inputField  : "dateField",      // ID of the input field
					showsTime	: true,
					timeFormat	: "24",
					ifFormat	: "%Y/%m/%d %H:%M", // the date format
					onClose		: closed,
					button		: "dateButton"      // ID of the button	:	"dateButton"      // ID of the button
				}
			);
	}
}
*/
function ShowCalendar(serverDay,serverMonth,serverYear){	//this calendar for 30 days period from current date
	var myDate=new Date();
	dateValue=$("dateField").value;
	if(dateValue!=""){										//set date which in data field, if it was inputed
		myDate.setFullYear(dateValue.slice(0,4));
		myDate.setMonth(parseInt(dateValue.slice(5,7))-1);
		myDate.setDate(dateValue.slice(8,10));
		myDate.setHours(dateValue.slice(11,13));
		myDate.setMinutes(dateValue.slice(14,16));
	}
	if(serverDay>0 && serverMonth>0 && serverYear>0){
		serverMonth-=1;
		var daysDisabledTill=new Array();
		var daysDisabledFrom=new Array();
		var monthDisabled=new Array();
		for (var i=1; i<serverDay;i++) daysDisabledTill.push(i);
		for (var i=serverDay; i<32;i++) daysDisabledFrom.push(i);
		for (var i=1; i<32;i++) monthDisabled.push(i);
		var specialDaysStr="SPECIAL_DAYS = {";
		for (var i=0; i<12; i++){
			if (i<serverMonth) specialDaysStr+=i+":monthDisabled";
			else if(i==serverMonth) specialDaysStr+=i+":daysDisabledTill";
			else if(i==serverMonth+1) specialDaysStr+=i+":daysDisabledFrom";
			else specialDaysStr+=i+":monthDisabled";
			if(i!=11)specialDaysStr+=",";
		}
		specialDaysStr+="}";
		eval(specialDaysStr);
		if(serverMonth==11){
			var specialDaysYear2Str="SPECIAL_DAYS_YEAR2 = {";
			specialDaysYear2Str+="0:daysDisabledFrom,";
			for (var i=1; i<12; i++){
				specialDaysYear2Str+=i+":monthDisabled";
				if(i!=11)specialDaysYear2Str+=",";
			}
			specialDaysYear2Str+="}";
			eval(specialDaysYear2Str);
		}
		/*
		var SPECIAL_DAYS = {
			0 : monthDisabled,
			1 : monthDisabled,
			2 : monthDisabled,
			3 : daysDisabled,
			4 : [3,5]
		};
		*/
		function dateIsSpecial(year, month, day){
			if(year==serverYear+2000) var m = SPECIAL_DAYS[month]; else var m = SPECIAL_DAYS_YEAR2[month];
			if (!m) return false;
			for (var i in m) if (m[i] == day) return true;
			return false;
		}
		function ourDateStatusFunc(date, y, m, d) {
			if (dateIsSpecial(y, m, d))return "special";
			else return false; // other dates are enabled
			// return true if you want to disable other dates
		}
		function CalendarSelection(calendar, date) {
			if (dateIsSpecial(calendar.date.getFullYear(),calendar.date.getMonth(),calendar.date.getDate())){
				$("dateField").value="";
			}else{
				var hoursField=calendar.date.getHours();
				hoursField=hoursField==0?"00":hoursField.toString();
				var minutesField=calendar.date.getMinutes();
				minutesField=minutesField<10?"0"+minutesField.toString():minutesField.toString();
				var timeSelected="";
				if (calendar.showsTime) timeSelected=" "+hoursField+":"+minutesField;
				$("dateField").value=date+timeSelected;
			}
		}
		//function closed(cal) {
		//	try{document.getElementsByClassName('calendar')[0].remove();}catch(er){}
		//}
		
		if (serverMonth==11)var yearRange=new Array(serverYear+2000, serverYear+2001);
		else var yearRange=new Array(serverYear+2000);
		Calendar.setup(
			{	dateStatusFunc	:ourDateStatusFunc,
				onSelect	:	CalendarSelection,
				range		:	yearRange,
				//onClose		:	closed,
				showsTime	:	true,
				timeFormat	:	"24",
				ifFormat	:	"%Y/%m/%d %H:%M", // the date format
				button		:	"dateButton",     // ID of the button
				date		:	myDate
			}
		);
	}else{
		function closed(cal) {
			try{document.getElementsByClassName('calendar')[0].remove();}catch(er){}
		}
		Calendar.setup(
			{	inputField  : "dateField",      // ID of the input field
				showsTime	: true,
				timeFormat	: "24",
				ifFormat	: "%Y/%m/%d %H:%M", // the date format
				onClose		: closed,
				button		: "dateButton",     // ID of the button	:	"dateButton"      // ID of the button
				date		:	myDate
			}
		);
	}
}
function ShowConfirmForm(formText, yesText, noText, ifYes){
	if($('ConfirmForm')){
		alert("Document already contains 'ConfirmForm'.");
		return false;
	}
	var ConfirmFormInner="";
	ConfirmFormInner+='<br />';
	ConfirmFormInner+='<center>'+formText+'</center>';
	ConfirmFormInner+='<br /><br />';
	ConfirmFormInner+='<input type="button" name="ajaxDelete" class="Button_114x19"';
	ConfirmFormInner+='	style="float: left; margin-left: 30px"';
	ConfirmFormInner+='	onclick="'+ifYes;
	ConfirmFormInner+='		ShowHidder(false, 0, 0.3, 0);';
	ConfirmFormInner+='		Effect.Puff(\'ConfirmForm\',{duration: 0.3, afterFinish: function(){$(\'ConfirmForm\').parentNode.removeChild($(\'ConfirmForm\'));}});';
	ConfirmFormInner+='	"';
	ConfirmFormInner+='	value="'+yesText+'" />';
	ConfirmFormInner+='<input type="button" name="ajaxDelete" class="Button_114x19"';
	ConfirmFormInner+='	style="float: right; margin-right: 30px"';
	ConfirmFormInner+='	onclick="';
	ConfirmFormInner+='		ShowHidder(false, 0, 0.3, 0);';
	ConfirmFormInner+='		Effect.Puff(\'ConfirmForm\',{duration: 0.3, afterFinish: function(){$(\'ConfirmForm\').parentNode.removeChild($(\'ConfirmForm\'));}});';
	ConfirmFormInner+='	"';
	ConfirmFormInner+='	value="'+noText+'" />';
	
	ConfirmForm=document.createElement("div");
	ConfirmForm.className="ObjectConfirmForm";
	ConfirmForm.id="ConfirmForm";
	ConfirmForm.style.display="block";
	ConfirmForm.innerHTML=ConfirmFormInner;
	document.lastChild.lastChild.appendChild(ConfirmForm);
	
	ShowHidder(true, 'default', 0.3, 0.2);
	Effect.Puff('ConfirmForm',{duration: 0.3, from: 1.0, to: 0.0
				,beforeStart :function(){ConfirmForm.setStyle({display: 'block', opacity: 0.0});}
				,afterFinish: function(){ConfirmForm.style.display='block';}
	});
}
function ShowInfoForm(formText, okText){
	if($('InfoForm')){
		alert("Document already contains 'InfoForm'.");
		return false;
	}
	var InfoFormInner="";
	InfoFormInner+='<br />';
	InfoFormInner+='<center>'+formText+'</center>';
	InfoFormInner+='<br /><br />';
	InfoFormInner+='<center>';
	InfoFormInner+='	<input type="button" name="ajaxDelete" class="Button_114x19"';
	InfoFormInner+='		onclick="';
	InfoFormInner+='			ShowHidder(false, 0, 0.3, 0);';
	InfoFormInner+='			Effect.Puff(\'InfoForm\',{duration: 0.3, afterFinish: function(){$(\'InfoForm\').parentNode.removeChild($(\'InfoForm\'));}});';
	InfoFormInner+='		"';
	InfoFormInner+='		value="'+okText+'" />';
	InfoFormInner+='</center>';
	
	InfoForm=document.createElement("div");
	InfoForm.className="ObjectConfirmForm";
	InfoForm.id="InfoForm";
	InfoForm.style.display="block";
	InfoForm.innerHTML=InfoFormInner;
	document.lastChild.lastChild.appendChild(InfoForm);
	
	ShowHidder(true, 'default', 0.3, 0.2);
	Effect.Puff('InfoForm',{duration: 0.3, from: 1.0, to: 0.0
				,beforeStart :function(){InfoForm.setStyle({display: 'block', opacity: 0.0});}
				,afterFinish: function(){InfoForm.style.display='block';}
	});
}
function PutToTheCenter(elem){
	var popupDimension =elem.getDimensions();
	var scrollOffset = document.viewport.getScrollOffsets();
	var viewDimention= document.viewport.getDimensions();
	var th=((viewDimention.height - popupDimension.height)/2) + scrollOffset.top;
	var tw=((viewDimention.width - popupDimension.width)/2) + scrollOffset.left;
	elem.style.left=tw+'px';
	elem.style.top=th+'px';
}
function getUrlFileName(){return location.href.split("/").last().split("?").first();}
//----------
window.onresize=function(){WindowResizeEvent();}
function WindowResizeEvent(){
	if($('HidderDiv')){
		var WindowWidth=document.body.clientWidth+"px";
		var WindowHeight=document.lastChild.scrollHeight+"px";
		$('HidderDiv').setStyle({width: WindowWidth, height: WindowHeight});
		$('HidderIframe').setStyle({width: WindowWidth, height: WindowHeight});
	}
}
//----------
function showTooltipForElement(el, text){			//function not finished, do not use it
	var tooltip = document.createElement("div");
	tooltip.setAttribute("class", "tooltip");
	tooltip.setAttribute("id", "tooltip");
	parent.appendChild(tooltip);
	tooltip.innerHTML=text;
}
//----------