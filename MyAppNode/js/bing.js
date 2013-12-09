$(document).ready(function() {
    $('#queryBtn').click(function() {
        Search();
	});
	
	$('#queryTxt').bind('keypress',function(event) {
		if(event.keyCode == 13)
		{
			Search();
		}
	});

	var accountKey = "ct+SoxmR0fqGQNoew20drxTYfKkqip70sSgWcLymrYE";
	var accountKeyEncoded = base64_encode(":" + accountKey);
	
	function Search() {
		var searchTerms = $('#queryTxt').val().replace(" ", "+");
		var requestStr = "https://api.datamarket.azure.com/Data.ashx/Bing/Search/v1/Image?Query=%27" + searchTerms + "%27&$top=50&$format=json";
		
		$.ajax({
				type: "GET",
				url: requestStr,
				beforeSend: function(xhr){
					//base64 encoded
					xhr.setRequestHeader('Authorization', "Basic " + accountKeyEncoded);
				},
				success: function(data, status) {
					document.getElementById("right_txt").innerHTML = "More results";
					document.getElementById("search_1").src = data.d.results[0].MediaUrl;
					document.getElementById("search_2").src = data.d.results[1].MediaUrl;
					document.getElementById("search_3").src = data.d.results[2].MediaUrl;
					document.getElementById("search_4").src = data.d.results[3].MediaUrl;
				},
				error: function(msg) {
					alert("Something hasn't worked\n" + msg.d);
				}
			});
	}
	
	function base64_encode(data) {
	  // http://kevin.vanzonneveld.net
	  // +   original by: Tyler Akins (http://rumkin.com)
	  // +   improved by: Bayron Guevara
	  // +   improved by: Thunder.m
	  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	  // +   bugfixed by: Pellentesque Malesuada
	  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	  // +   improved by: Rafal Kukawski (http://kukawski.pl)
	  // *     example 1: base64_encode('Kevin van Zonneveld');
	  // *     returns 1: 'S2V2aW4gdmFuIFpvbm5ldmVsZA=='
	  // mozilla has this native
	  // - but breaks in 2.0.0.12!
	  //if (typeof this.window['btoa'] == 'function') {
	  //    return btoa(data);
	  //}
	  var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	  var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
		ac = 0,
		enc = "",
		tmp_arr = [];

	  if (!data) {
		return data;
	  }

	  do { // pack three octets into four hexets
		o1 = data.charCodeAt(i++);
		o2 = data.charCodeAt(i++);
		o3 = data.charCodeAt(i++);

		bits = o1 << 16 | o2 << 8 | o3;

		h1 = bits >> 18 & 0x3f;
		h2 = bits >> 12 & 0x3f;
		h3 = bits >> 6 & 0x3f;
		h4 = bits & 0x3f;

		// use hexets to index into b64, and append result to encoded string
		tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
	  } while (i < data.length);

	  enc = tmp_arr.join('');

	  var r = data.length % 3;

	  return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);

	}
});