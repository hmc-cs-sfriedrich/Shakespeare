/*  We update the completion value of the progress
    bar as the percentage of how far through the whole
    page the user has scrolled.

    Source:
    http://stackoverflow.com/questions/19700020/
    change-progress-bar-value-based-on-scrolling
*/
$(window).scroll(function () {
  var scroll = $(window).scrollTop(),
        docHeight = $(document).height(),
        winHeight = $(window).height();
        var scrollPercent = (scroll / (docHeight-winHeight)) * 100;
   $("#progressbar").attr('value', scrollPercent);
});