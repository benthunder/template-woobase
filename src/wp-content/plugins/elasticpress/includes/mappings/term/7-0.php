<?php
/**
 * Elasticsearch mapping for terms
 *
 * @since   3.1
 * @package elasticpress
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

return [
	'settings' => [
		'index.mapping.total_fields.limit' => apply_filters( 'ep_term_total_field_limit', 5000 ),
		'index.max_result_window'          => apply_filters( 'ep_term_max_result_window', 1000000 ),

		/**
		 * Filter Elasticsearch term maximum shingle difference
		 *
		 * @hook ep_max_shingle_diff
		 * @param  {int} $number Max difference
		 * @return {int} New number
		 */
		'index.max_shingle_diff'           => apply_filters( 'ep_term_max_shingle_diff', 8 ),

		'analysis'                         => [
			'analyzer'   => [
				'default'          => [
					'tokenizer' => 'standard',
					/* This filter is documented in includes/mappings/post/7-0.php */
					'filter'    => apply_filters( 'ep_default_analyzer_filters', [ 'lowercase', 'ep_stop', 'ewp_snowball' ] ),
					/* This filter is documented in includes/mappings/post/7-0.php */
					'language'  => apply_filters( 'ep_analyzer_language', 'english', 'analyzer_default' ),
				],
				'default_search'   => [
					'tokenizer'   => 'standard',
					/* This filter is documented in includes/mappings/post/7-0.php */
					'filter'      => apply_filters( 'ep_default_search_analyzer_filters', [ 'lowercase', 'ep_stop', 'ewp_snowball' ] ),
					/* This filter is documented in includes/mappings/post/7-0.php */
					'char_filter' => apply_filters( 'ep_default_search_analyzer_char_filters', [ 'html_strip' ] ),
					/* This filter is documented above */
					'language'    => apply_filters( 'ep_analyzer_language', 'english', 'analyzer_default' ),
				],
				'shingle_analyzer' => [
					'type'      => 'custom',
					'tokenizer' => 'standard',
					'filter'    => [ 'lowercase', 'shingle_filter' ],
				],
				'ewp_lowercase'    => [
					'type'      => 'custom',
					'tokenizer' => 'keyword',
					'filter'    => [ 'lowercase' ],
				],
			],
			'filter'     => [
				'shingle_filter' => [
					'type'             => 'shingle',
					'min_shingle_size' => 2,
					'max_shingle_size' => 5,
				],
				'ewp_snowball'   => [
					'type'     => 'snowball',
					/* This filter is documented in includes/mappings/post/7-0.php */
					'language' => apply_filters( 'ep_analyzer_language', 'english', 'filter_ewp_snowball' ),
				],
				'edge_ngram'     => [
					'side'     => 'front',
					'max_gram' => 10,
					'min_gram' => 3,
					'type'     => 'edge_ngram',
				],
				'ep_stop'        => [
					'type'        => 'stop',
					'ignore_case' => true,
					/* This filter is documented in includes/mappings/post/7-0.php */
					'stopwords'   => apply_filters( 'ep_analyzer_language', 'english', 'filter_ep_stop' ),
				],
			],
			'normalizer' => [
				'lowerasciinormalizer' => [
					'type'   => 'custom',
					'filter' => [ 'lowercase', 'asciifolding' ],
				],
			],
		],
	],
	'mappings' => [
		'date_detection'    => false,
		'dynamic_templates' => [
			[
				'template_meta_types' => [
					'path_match' => 'meta.*',
					'mapping'    => [
						'type'       => 'object',
						'properties' => [
							'value'    => [
								'type'   => 'text',
								'fields' => [
									'sortable' => [
										'type'         => 'keyword',
										'ignore_above' => 10922,
										'normalizer'   => 'lowerasciinormalizer',
									],
									'raw'      => [
										'type'         => 'keyword',
										'ignore_above' => 10922,
									],
								],
							],
							'raw'      => [ /* Left for backwards compat */
								'type'         => 'keyword',
								'ignore_above' => 10922,
							],
							'long'     => [
								'type' => 'long',
							],
							'double'   => [
								'type' => 'double',
							],
							'boolean'  => [
								'type' => 'boolean',
							],
							'date'     => [
								'type'   => 'date',
								'format' => 'yyyy-MM-dd',
							],
							'datetime' => [
								'type'   => 'date',
								'format' => 'yyyy-MM-dd HH:mm:ss',
							],
							'time'     => [
								'type'   => 'date',
								'format' => 'HH:mm:ss',
							],
						],
					],
				],
			],
		],

		'properties'        => [
			'term_id'          => [
				'type' => 'long',
			],
			'ID'               => [
				'type' => 'long',
			],
			'name'             => [
				'type'   => 'text',
				'fields' => [
					'name'     => [
						'type' => 'text',
					],
					'sortable' => [
						'type'         => 'keyword',
						'ignore_above' => 10922,
						'normalizer'   => 'lowerasciinormalizer',
					],
					'raw'      => [
						'type'         => 'keyword',
						'ignore_above' => 10922,
					],
				],
			],
			'slug'             => [
				'type'   => 'text',
				'fields' => [
					'name' => [
						'type' => 'text',
					],
					'raw'  => [
						'type'         => 'keyword',
						'ignore_above' => 10922,
					],
				],
			],
			'term_group'       => [
				'type' => 'long',
			],
			'term_taxonomy_id' => [
				'type' => 'long',
			],
			'taxonomy'         => [
				'type'   => 'text',
				'fields' => [
					'description' => [
						'type' => 'text',
					],
					'raw'         => [
						'type'         => 'keyword',
						'ignore_above' => 10922,
					],
				],
			],
			'description'      => [
				'type'   => 'text',
				'fields' => [
					'description' => [
						'type' => 'text',
					],
					'sortable'    => [
						'type'         => 'keyword',
						'ignore_above' => 10922,
						'normalizer'   => 'lowerasciinormalizer',
					],
					'raw'         => [
						'type'         => 'keyword',
						'ignore_above' => 10922,
					],
				],
			],
			'parent'           => [
				'type' => 'long',
			],
			'count'            => [
				'type' => 'long',
			],
			'meta'             => [
				'type' => 'object',
			],
			'hierarchy'        => [
				'type' => 'object',
			],
			'object_ids'       => [
				'type' => 'object',
			],
		],
	],
];
