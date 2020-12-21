/* Style Switcher */
$(document).ready(function () {

    var styleswitcherstr = ' \
	<h2>Style Switcher <a href="#"></a></h2> \
    <div class="content"> \
    <div class="clear"></div> \
    <h3>Light Theme</h3> \
	<a href="../Facebuk-Dark/index.html" class="white-style">Dark Theme</a> \
    </div><!-- End content --> \
	';


    var wrap = $('<div/>');
    wrap.addClass('switcher');
    wrap.append(styleswitcherstr);
    $("#copyright").after(wrap);

});
