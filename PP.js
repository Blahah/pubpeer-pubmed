var PMID = new Array();
var hostname = window.location.hostname;
var address = null;
var dd = document.getElementsByTagName('dd');

for(var i=0; i<dd.length; i++){
	PMID[i] = dd[i].innerHTML.replace(/[^0-9]/g, "");
}


var PPnote = document.getElementsByClassName('links nohighlight');
var IDsURL = "http://www.pubpeer.com/f/publications/pubposts";

if(PPnote.length>0){
	function myAjaxCheck(callback) {
		$.ajax(IDsURL).done(function (data) {
              	
			callback(data);
		});
	}	

	var AllPMIDs;
	myAjaxCheck(function(returnedData){ //anonymous callback function
		AllPMIDs = returnedData;
		for(i=0; i<PPnote.length; i++){
			if(AllPMIDs.indexOf(PMID[i*2])>0){
				PPnote[i].innerHTML="This article has comments";
				$(PPnote[i]).css("background", "#ff9e29");
//				$(PPnote[i]).css("cursor", "pointer");
//				$(PPnote[i]).click(function(){
//					window.open(json.url, '_blank');
//				});
				$(PPnote[i]).css("color", "#FFFFFF");
				PPnote[i].style.textAlign="left";
				PPnote[i].style.webkitBoxShadow="1px 1px 1px #888888";
				PPnote[i].style.fontWeight="bold";
			}
		}
	});
}

else{
	address = "http://api.pubpeer.com/v1/publications/"+PMID[0]+"?devkey=PubMedChrome";
	$.ajax(address).done(function(data){
			var json = $.parseJSON(data);
			if(json.total_comments > 0){
				var messagearea = document.getElementById('messagearea');
				$(messagearea).css("background", "#ff9e29");
				$(messagearea).css("cursor", "pointer");
				$(messagearea).css("color", "#FFFFFF");
				$(messagearea).click(function(){
					window.open(json.url, '_blank');
								});
				document.getElementById('messagearea').innerHTML="This article has "+json.total_comments+" comment(s)";
				messagearea.style.textAlign="center";
				messagearea.style.textDecoration="underline";
				messagearea.style.webkitBoxShadow="1px 1px 1px #888888";
				messagearea.style.fontWeight="bold";
			}
		
	});
}
