import React from 'react';
import SidebarLayout from '../layouts/SidebarLayout';
import BookmarkItem from './BookmarkItem';
import { useRouter } from 'next/router';

const BookmarkSidebar = ({ bookmarks = [], isPage = false }) => {
	const {
		query: { id },
	} = useRouter();

	return (
		<SidebarLayout title="Bookmarks" isPage={isPage}>
			{bookmarks.map(({ name, link, id: bookmarkId }) => (
				<BookmarkItem
					active={id == name.toLowerCase().split(' ').join('-')}
					title={name}
					site={new URL(link).host}
					key={bookmarkId}
				/>
			))}
		</SidebarLayout>
	);
};

export default BookmarkSidebar;
