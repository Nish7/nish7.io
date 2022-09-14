import React from 'react';
import SidebarLayout from '../Layouts/SidebarLayout';
import BookmarkItem from './BookmarkItem';
import { useRouter } from 'next/router';

const BookmarkSidebar = ({ bookmarks = [] }) => {
	const {
		query: { id },
	} = useRouter();

	return (
		<SidebarLayout title="Bookmarks">
			{bookmarks.map(({ name, link, id: bookmarkId }) => (
				<BookmarkItem
					active={id == name.split(' ').join('-')}
					title={name}
					site={new URL(link).host}
					key={bookmarkId}
				/>
			))}
		</SidebarLayout>
	);
};

export default BookmarkSidebar;
