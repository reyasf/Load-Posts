jQuery(document).ready(function($) {

// The number of the next page to load (/page/x/).
var pageNum = parseInt(pbd_alp.startPage) + 1;

// The maximum number of pages the current query can return.
var max = parseInt(pbd_alp.maxPages);

// The link of the next page of posts.
var nextLink = pbd_alp.nextLink;

var doing_ajax = false;


/**
 * Replace the navigation with our own,
 * but only if there is at least one page of new posts to load.
 */
if(pageNum <= max && $('.page-numbers').length  != 0) {

$('.main')
.append('<div class="pbd-alp-placeholder-'+ pageNum +'"></div>')

.append('<div class="clear"></div><p id="pbd-alp-load-posts"><a href="#">Load More</a></p>');

// Remove the navigation.
$('.pagination').remove();
}



/**
 * Load new posts when the link is clicked.
 */
$('#pbd-alp-load-posts a').click(function() {

doing_ajax = true;
// If more posts to load
if(pageNum <= max) {

// Show that we're working.
$(this).text('Loading...');



	$('.pbd-alp-placeholder-'+ pageNum).load(nextLink + ' .product',  function() {
		doing_ajax = true;

	// Update page number and nextLink.
	$('.products').append($('.pbd-alp-placeholder-'+ pageNum).html()).children().animate({ opacity:'1' },  1000);
	$('.pbd-alp-placeholder-'+ pageNum).remove();
	initHover();

	nextLink = nextLink.replace('/page/'+pageNum, '/page/'+ ++pageNum);
	// Add a new placeholder, for when user clicks again.

		if(pageNum>2)
		{
			// Remove the traditional navigation.
			$('#pbd-alp-load-posts').before('<div class="pbd-alp-placeholder-'+ pageNum +'"></div>')
		}
		else{
			$('#pbd-alp-load-posts').before('<div class="clear"></div><div class="pbd-alp-placeholder-'+ pageNum +'"></div>')
		}

		// Update the button message.
		if(pageNum <= max) {
			$('#pbd-alp-load-posts a').text('Load More').before('<div class="clear"></div>');
		} else {
			$('#pbd-alp-load-posts').fadeOut(200);
		}
		doing_ajax = false;
	});
	
} 
else {
	doing_ajax = false;
	$('#pbd-alp-load-posts a').append('.');
}

return false;
});

$(window).scroll(function() {
  if ($(window).scrollTop() >= $(document).height() - $(window).height() - 3000) {
	if(!doing_ajax){
   		$('#pbd-alp-load-posts a').trigger('click');
                $('.checht').hide();
   		return false;
   	}
   }
});

});
