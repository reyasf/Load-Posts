jQuery(document).ready(function($) {

// next page to load
var nxt_page = parseInt(ajax_pagination.start) + 1;

// The maximum number of pages the current query can return.
var total = parseInt(ajax_pagination.max);

// The link of the next page of posts.
var next_url = ajax_pagination.nexturl;

var doing_ajax = false;


/**
 * Replace the navigation with our own,
 * but only if there is at least one page of new posts to load.
 */
if(nxt_page <= total && $('.page-numbers').length  != 0) {

$('.main')
.append('<div class="ajax-pagination-container-'+ nxt_page +'"></div>')

.append('<div class="clear"></div><p id="ajax-pagination-posts"><a href="#">More</a></p>');

// Remove the navigation.
$('.pagination').remove();
}



/**
 * Load new posts when the link is clicked.
 */
$('#ajax-pagination-posts a').click(function() {

doing_ajax = true;
// If more posts to load
if(nxt_page <= total) {

// Show that we're working.
$(this).text('Loading...');



	$('ajax-pagination-container-'+ nxt_page).load(next_url + ' .product',  function() {
		doing_ajax = true;

	// Update nxt_page and next_url.
	$('.products').append($('ajax-pagination-container-'+ nxt_page).html()).children().animate({ opacity:'1' },  1000);
	$('ajax-pagination-container-'+ nxt_page).remove();

	next_url = next_url.replace('/page/'+nxt_page, '/page/'+ ++nxt_page);
	// Add a new placeholder, for when user clicks again.

		if(nxt_page>2)
		{
			// Remove the navigation.
			$('#ajax-pagination-posts').before('<div class="ajax-pagination-container-'+ nxt_page +'"></div>')
		}
		else{
			$('#ajax-pagination-posts').before('<div class="clear"></div><div class="ajax-pagination-container-'+ nxt_page +'"></div>')
		}

		// Update the button message.
		if(nxt_page <= total) {
			$('#ajax-pagination-posts a').text('More').before('<div class="clear"></div>');
		} else {
			$('#ajax-pagination-posts').hide();
		}
		doing_ajax = false;
	});
	
} 
else {
	doing_ajax = false;
	$('#ajax-pagination-posts a').append('.');
}

return false;
});

$(window).scroll(function() {
  if ($(window).scrollTop() >= $(document).height() - $(window).height() - 3000) {
	if(!doing_ajax){
   		$('#ajax-pagination-posts a').trigger('click');
                $('.checht').hide();
   		return false;
   	}
   }
});

});
