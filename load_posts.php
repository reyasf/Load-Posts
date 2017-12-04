function pbd_alp_init() {
 	global $wp_query;

 		$max =  $wp_query->max_num_pages;
 		$paged = ( get_query_var('paged') > 1 ) ? get_query_var('paged') : 1;

		
 		wp_localize_script(
 			'load-posts',
 			'pbd_alp',
 			array(
 				'startPage' => $paged,
 				'maxPages' => $max,
 				'nextLink' => next_posts($max, false)
 			)
 		);
	
 }
 add_action('loop_start', 'pbd_alp_init');
