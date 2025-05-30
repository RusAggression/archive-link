export interface ArchiveLinkAttributes {
	postType: string;
	label: string;
	openInNewTab: boolean;
	url: string;
}

export interface PostType {
	name: string;
	slug: string;
	viewable: boolean;
}
