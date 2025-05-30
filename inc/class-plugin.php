<?php

namespace RusAggression\ArchiveLink;

final class Plugin {
	/** @var self|null */
	private static $instance;

	public static function get_instance(): self {
		if ( ! self::$instance ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	private function __construct() {
		add_action( 'init', [ $this, 'init' ] );
	}

	public function init(): void {
		load_plugin_textdomain( 'archive-link', false, dirname( plugin_basename( __DIR__ ) ) . '/lang' );
		add_action( 'rest_api_init', [ REST::class, 'get_instance' ] );

		$path = dirname( __DIR__ ) . '/build';
		register_block_type( $path );

		$script_handle = generate_block_asset_handle( 'archive-link/archive-link', 'editorScript' );
		wp_set_script_translations( $script_handle, 'archive-link', plugin_dir_path( __DIR__ ) . 'lang' );
	}
}
