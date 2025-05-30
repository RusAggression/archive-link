import { BlockEditProps } from '@wordpress/blocks';
import { useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	SelectControl,
	Spinner,
	TextControl,
	ToggleControl,
} from '@wordpress/components';
import {
	InspectorControls,
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';
import apiFetch from '@wordpress/api-fetch';
import type { ArchiveLinkAttributes, PostType } from './types';

interface FetchResponse {
	url?: string;
}

export function Edit( {
	attributes,
	setAttributes,
}: BlockEditProps< ArchiveLinkAttributes > ) {
	const { postType, label, openInNewTab, url } = attributes;
	const blockProps = useBlockProps();

	useEffect( () => {
		if ( postType ) {
			apiFetch( {
				path: `/post-archive-link/v1/url?type=${ encodeURIComponent(
					postType
				) }`,
			} )
				.then( ( res ) => {
					const result = res as FetchResponse;
					if ( result?.url ) {
						setAttributes( { url: result.url } );
					}
				} )
				.catch( () => {
					setAttributes( { url: '#' } );
				} );
		}
	}, [ postType, setAttributes ] );

	const postTypes = useSelect( ( select: any ) => {
		const types = select( 'core' ).getPostTypes( { per_page: -1 } ) as
			| PostType[]
			| undefined;
		return types ? types.filter( ( type ) => type.viewable ) : [];
	}, [] );

	const options = postTypes.map( ( type ) => ( {
		label: type.name,
		value: type.slug,
	} ) );

	const onPostTypeChange = ( value: string ) =>
		setAttributes( { postType: value, url: undefined } );
	const onLabelChange = ( value: string ) =>
		setAttributes( { label: value } );
	const onOpenInNewTabChange = ( value: boolean ) =>
		setAttributes( { openInNewTab: value } );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Archive Link Settings', 'archive-link' ) }
				>
					<SelectControl
						label={ __( 'Post Type', 'archive-link' ) }
						value={ postType }
						options={ options }
						onChange={ onPostTypeChange }
					/>
					<TextControl
						label={ __( 'Link Text', 'archive-link' ) }
						value={ label }
						onChange={ onLabelChange }
					/>
					<ToggleControl
						label={ __( 'Open in new tab', 'archive-link' ) }
						checked={ openInNewTab }
						onChange={ onOpenInNewTabChange }
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				{ url ? (
					<RichText
						tagName="a"
						value={ label }
						href={ url }
						onChange={ onLabelChange }
					/>
				) : (
					<Spinner />
				) }
			</div>
		</>
	);
}
