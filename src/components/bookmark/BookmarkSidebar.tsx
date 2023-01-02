import { memo } from 'react';
import SidebarLayout from '../layouts/SidebarLayout';
import BookmarkItem from './BookmarkItem';
import { useRouter } from 'next/router';
import { BookmarkProp } from '@/lib/types/interface';

interface BookmarkSidebarProp {
	bookmarks: BookmarkProp[];
	isPage?: boolean;
}

const BookmarkSidebar = ({
	bookmarks = [],
	isPage = false,
}: BookmarkSidebarProp) => {
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

export default memo(BookmarkSidebar);
