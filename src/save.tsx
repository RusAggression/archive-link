import type { BlockSaveProps } from '@wordpress/blocks';
import type { ArchiveLinkAttributes } from './types';

export function Save( {
	attributes,
}: BlockSaveProps< ArchiveLinkAttributes > ) {
	const { url, label, openInNewTab } = attributes;
	return (
		<a
			href={ url }
			className="wp-block-post-archive-link"
			target={ openInNewTab ? '_blank' : undefined }
			rel={ openInNewTab ? 'noopener noreferrer' : undefined }
		>
			{ label }
		</a>
	);
}
