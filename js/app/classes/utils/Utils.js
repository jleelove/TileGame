define(['jquery','Class'],function($,Class){
	var Utils = Class.extend({
		init:function(){		
			
		}
	});
	Utils.prototype.loadFileAsString = function(_path){
		var string = "";
		/*$.ajax({
			url : _path,
			type : "get",
			async: false,
			success : function(_contents) {
				string = _contents;
			},
			error: function() {
				alert("file:'" + _path +"' can not be loaded");
			}
		});*/
		string = "20 40 10 20 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 2 2 0 0 0 0 0 1 1 1 0 0 0 0 1 1 1 0 0 0 2 2 0 0 0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0 2 2 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 2 2 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 2 2 0 0 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 2 2 0 0 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 2 2 0 0 0 0 0 0 0 0 1 1 1 1 0 0 0 0 0 0 2 2 0 0 1 1 1 1 0 0 1 1 1 1 0 0 0 0 0 0 2 2 0 0 0 0 0 0 0 0 1 1 1 1 0 0 0 0 0 0 2 2 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 2 2 0 0 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 2 2 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 2 2 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 2 2 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 0 0 0 2 2 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 2 2 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 2 2 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 2 2 0 0 0 0 2 2 2 2 2 2 2 2 2 2 0 0 0 0 2 2 0 0 0 0 2 2 2 2 2 2 2 2 2 2 0 0 0 0 2 2 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 2 2 0 0 0 0 0 1 1 1 0 0 0 0 1 1 1 0 0 0 2 2 0 0 0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0 2 2 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 2 2 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 2 2 0 0 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 2 2 0 0 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 2 2 0 0 0 0 0 0 0 0 1 1 1 1 0 0 0 0 0 0 2 2 0 0 1 1 1 1 0 0 1 1 1 1 0 0 0 0 0 0 2 2 0 0 0 0 0 0 0 0 1 1 1 1 0 0 0 0 0 0 2 2 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 2 2 0 0 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 2 2 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 2 2 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 2 2 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 0 0 0 2 2 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 2 2 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 2 2 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2";
		return string;
	}
	
	
	window.Utils = new Utils();
});	