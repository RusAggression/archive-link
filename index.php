<?php
/**
 * Plugin Name: Archive Link Block
 * Description: A custom Gutenberg block for inserting post archive permalinks
 * Version: 1.0.0
 * Author: Prometheus
 * Text Domain: archive-link
 * Domain Path: /lang
 */

use RusAggression\ArchiveLink\Plugin;

if ( defined( 'ABSPATH' ) ) {
	$autoload_path = 'vendor/autoload.php';
	
	if ( file_exists( __DIR__ . '/' . $autoload_path ) ) {
		require_once __DIR__ . '/' . $autoload_path;
	} elseif ( file_exists( ABSPATH . $autoload_path ) ) {
		require_once ABSPATH . $autoload_path;
	}

	Plugin::get_instance();
}
