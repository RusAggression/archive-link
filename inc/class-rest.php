<?php

namespace RusAggression\ArchiveLink;

use WP_Error;
use WP_REST_Request;
use WP_REST_Response;
use WP_REST_Server;

final class REST {
	/** @var self|null */
	private static $instance;

	public static function get_instance(): self {
		if ( ! self::$instance ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	private function __construct() {
		$this->rest_api_init();
	}

	public function rest_api_init(): void {
		register_rest_route( 'post-archive-link/v1', '/url', [
			'methods'             => WP_REST_Server::READABLE,
			'callback'            => [ $this, 'post_archive_link_url_callback' ],
			'permission_callback' => '__return_true',
		] );
	}

	public function post_archive_link_url_callback( WP_REST_Request $request ): WP_REST_Response|WP_Error {
		$post_type = sanitize_key( $request->get_param( 'type' ) ?? 'post' );

		if ( 'post' === $post_type && get_option( 'page_for_posts' ) ) {
			$url = get_permalink( get_option( 'page_for_posts' ) );
		} else {
			$url = get_post_type_archive_link( $post_type );
		}

		$response = is_string( $url ) ? [ 'url' => $url ] : new WP_Error( 'not_found', 'No archive found', [ 'status' => 404 ] );
		return rest_ensure_response( $response );
	}
}
