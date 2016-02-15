
function focusBlurSet(element) {
    for (i = 0; i < element.length; i++)
    {
        element[i].addEventListener("focus", function() {
            this.className = "crveno";
        });
        element[i].addEventListener("blur", function() {
            this.className = "";
        });
    }
}
window.onload = function(){
	input = document.getElementsByTagName("input");
	label = document.getElementsByTagName("label");

	focusBlurSet(input);

	
	for (i = 0; i < label.length; i++)
	{
	    label[i].onmouseover = function() {
		this.className = "pozadinaCrveno";
	    };
	    label[i].onmouseout = function() {
		this.className = "";
	    };
	}
};
