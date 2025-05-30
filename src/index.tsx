import { type BlockConfiguration, registerBlockType } from '@wordpress/blocks';
import type { ArchiveLinkAttributes } from './types';
import { Edit } from './edit';
import { Save } from './save';
import metadata from './block.json';

registerBlockType< ArchiveLinkAttributes >(
	metadata as BlockConfiguration< ArchiveLinkAttributes >,
	{
		edit: Edit,
		save: Save,
	}
);
