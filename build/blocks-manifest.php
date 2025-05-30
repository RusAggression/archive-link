<?php
// This file is generated. Do not modify it manually.
return array(
	'build' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'archive-link/archive-link',
		'version' => '1.0.0',
		'title' => 'Archive Link',
		'category' => 'design',
		'parent' => array(
			'core/navigation'
		),
		'icon' => 'archive',
		'description' => 'A block for inserting links to post type archives',
		'supports' => array(
			'html' => false
		),
		'textdomain' => 'archive-link',
		'editorScript' => 'file:./index.js',
		'attributes' => array(
			'postType' => array(
				'type' => 'string',
				'default' => 'post'
			),
			'label' => array(
				'type' => 'string',
				'default' => ''
			),
			'openInNewTab' => array(
				'type' => 'boolean',
				'default' => false
			),
			'url' => array(
				'type' => 'string',
				'default' => '#'
			)
		)
	)
);
