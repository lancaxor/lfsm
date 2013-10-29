var TextBefore="";
function checkLength() {
	$('text').readonly=false;
	var curSmsLenght=0;				//max length of corrent sms in cycle
	var totalLenght=0;				//summary length of sms that was in cicle before current irrigation
	var additionalLength = 0;
	if ($("lengthOfContatPartsSigns") != null){
		additionalLength = parseInt($("lengthOfContatPartsSigns").value);
	}
	var charsTyped=$("text").value.length + $("promotionText").innerHTML.length + $("signature").value.length + additionalLength;		//langht of chars typed in text&signature +protion text
	var allowedSmsPerMessage=$("allowedSmsPerMessage").value;
	
	var freeSmsRemain=$("freeSmsRemain").innerHTML;
	
	
	var mode=$("viewMode").value;
    if (escape($("text").value).indexOf('%u')>-1 || escape($("signature").value).indexOf('%u')>-1){	//UTF8
    	multiPartReserve = 6;
    	smsLength=parseInt($('smsLengthUtf16bf').value);
    	$("SmsCharset").innerHTML=$("SmsCharsetTextCyr").value;
    }else{											//Latin
    	multiPartReserve =14;
    	smsLength=parseInt($('smsLengthLatin').value);
    	$("SmsCharset").innerHTML=$("SmsCharsetTextLatin").value;
    }
	for(var i=1;i<=allowedSmsPerMessage;i++){
   		if((allowedSmsPerMessage-i)>=0 && ((freeSmsRemain-i)>=0 || mode=="RegUser")){		//if free SMS left for today
	   		curSmsLenght=(i<2?smsLength:(smsLength-multiPartReserve));
	   		$("allowedCharPerSms"+i).innerHTML=curSmsLenght;
	   		if(charsTyped>=totalLenght && charsTyped<(totalLenght+curSmsLenght)){	//if current sms typing
	   			$("charsCurrent"+i).innerHTML = charsTyped-totalLenght;
	   			if((charsTyped-totalLenght)>0){
	   				(freeSmsRemain-i)>=0?$("letter"+i).src=$("pathToLetterBlue").value:$("letter"+i).src=$("pathToLetterYellow").value;
	   				$("allowedCharPerSms"+i).className="TextSmallBlue";
	   			}else{
	   				(freeSmsRemain-i)>=0?$("letter"+i).src=$("pathToLetterDisabled").value:$("letter"+i).src=$("pathToLetterYellowDisabled").value;
	   				$("allowedCharPerSms"+i).className="TextSmallDisabled";
	   			}
	   		}else if(charsTyped<totalLenght){										//if previous sms typing
	   			$("charsCurrent"+i).innerHTML=0;
	   			(freeSmsRemain-i)>=0?$("letter"+i).src=$("pathToLetterDisabled").value:$("letter"+i).src=$("pathToLetterYellowDisabled").value;
	   			$("allowedCharPerSms"+i).className="TextSmallDisabled";
	   		}else{																	//if this sms already filled
	   			$("charsCurrent"+i).innerHTML=curSmsLenght;
	   			(freeSmsRemain-i)>=0?$("letter"+i).src=$("pathToLetterBlue").value:$("letter"+i).src=$("pathToLetterYellow").value;
	   			$("allowedCharPerSms"+i).className="TextSmallBlue";
	   		}
	   		totalLenght+=curSmsLenght;
   		}else{
   			$("charsCurrent"+i).innerHTML=0;
	   		$("letter"+i).src=$("pathToLetterRed").value;
	   		$("allowedCharPerSms"+i).innerHTML=0;
	   		$("allowedCharPerSms"+i).className="TextSmallDisabled";
   		}
   	}
	if(freeSmsRemain<1 && mode=='UnregUser'){	//If all free SMS in FREE SMS MODE used - disable all and stop
		DisableComposer('true');
		return;
	}
	if(charsTyped>totalLenght){
		var OverFlow=$("text").value.substring(totalLenght-$("promotionText").innerHTML.length-$("signature").value.length - additionalLength, $("text").value.length);
		var ConfirmText=$("ConfirmText").value.replace("nnnn", OverFlow.length);
			
		$('text').readonly=false;
		if(confirm(ConfirmText)==true){
			$("text").value=$("text").value.slice(0,(totalLenght-$("promotionText").innerHTML.length-$("signature").value.length-additionalLength));
			checkLength();
		}else{
			//$("text").value=TextBefore;
			//checkLength();
		}
	}
	TextBefore=$('text').value;
}
function DisableComposer(status){
	var Elements=new Array($('smsPrefix'), $('smsNumber'), $('text'), $('signature'), $('antibot'));
	if (status=='true'){
		Elements.each(function(el){
			el.disabled=true;
			el.style.background="#F8F8F8";
		});
	}else{
		Elements.each(function(el){
			el.disabled=false;
		});
	}
}
function checkSmsNumber(ChangePromotext){
	var smsNo=$("smsNumber").value;
	var str="";
	var curChar="";
	for(var i=0;i<$("smsNumber").value.length;i++){
		curChar=smsNo.charAt(i);
		if(parseInt(curChar)==curChar)str+=curChar;
	}
	$("smsNumber").value=str;
	if(ChangePromotext=="WithPromotext"){
		if($("smsNumber").value.length>6){		//if smsNumber is full correct
			var fullNumber="38"+$("smsPrefix").value + $("smsNumber").value
			getPromoTextByAjax("ajax_promotext.html",fullNumber,"promotionTextObj.id","promotionText");
		}
	}
}
function getPromoTextByAjax(url,param,elemId,elemText){
    new Ajax.Request(url, {
        method: "post",
        requestHeaders: {Accept: 'application/json'},
	    parameters: {phone: param},
	    onComplete: function(transport){
        var json = transport.responseText.evalJSON();
            $(elemId).value = json.id;
        	$(elemText).innerHTML = json.text;
        	checkLength();
        }
	}); 
}
function checkSmsNumberText(text, ev){
	if(ev=="select"){if($('smsNumber').value==text){$('smsNumber').value="";}
	}else{if($('smsNumber').value==""){$('smsNumber').value=text;}}
}