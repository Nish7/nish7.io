import BookmarkSidebar from '@/components/bookmark/BookmarkSidebar';
import HeadMeta from '@/components/layouts/HeadMeta';
import PageBackground from '@/components/layouts/PageBackground';
import { supabase } from '@/lib/supabase';
import { Flex } from '@chakra-ui/react';
import { ReactElement } from 'react';

function Bookmarks() {
	return (
		<>
			<HeadMeta title="Bookmarks" />
			<PageBackground />
		</>
	);
}

Bookmarks.getLayout = function getLayout(page: ReactElement) {
	const { props } = page;

	return (
		<Flex>
			<BookmarkSidebar bookmarks={props.bookmarksData} />
			{page}
		</Flex>
	);
};

export async function getStaticProps() {
	let { data: bookmarksData } = await supabase.from('Bookmark').select('*');

	return {
		props: {
			bookmarksData,
		},
		revalidate: 10,
	};
}

export default Bookmarks;
