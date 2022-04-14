import React from 'react';
import SidebarLayout from '../layouts/SidebarLayout';
import BookmarkItem from './BookmarkItem';
import { useRouter } from 'next/router';

const bookmarks_sample = [
	{ title: 'First impressions of web3', site: 'movie.org' },
	{ title: 'Foo bar city', site: 'nish.org' },
];

const BookmarkSidebar = ({ forceOpen }) => {
	const {
		query: { id },
	} = useRouter();

	return (
		<SidebarLayout forceOpen={forceOpen} title="Bookmarks">
			{bookmarks_sample.map(({ title, site }) => (
				<BookmarkItem
					active={id == title.split(' ').join('-')}
					title={title}
					site={site}
					key={title}
				/>
			))}
		</SidebarLayout>
	);
};

export default BookmarkSidebar;
