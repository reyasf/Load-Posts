function ajax_pagination() {
 	global $wp_query;

 		$max =  $wp_query->max_num_pages;
 		$paged = ( get_query_var('paged') > 1 ) ? get_query_var('paged') : 1;

		
 		wp_localize_script(
 			'load-posts',
 			'ajax_pagination',
 			array(
 				'start' => $paged,
 				'max' => $max,
 				'nexturl' => next_posts($max, false)
 			)
 		);
	
 }
 add_action('loop_start', 'ajax_pagination');
