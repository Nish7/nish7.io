import BookmarkSidebar from '@/components/bookmark/BookmarkSidebar';
import HeadMeta from '@/components/layouts/HeadMeta';
import PageBackground from '@/components/layouts/PageBackground';
import { Flex } from '@chakra-ui/react';
import { supabase } from '@/lib/supabase';

function Bookmarks() {
	return (
		<>
			<HeadMeta title="Bookmarks" />
			<PageBackground />
		</>
	);
}

Bookmarks.getLayout = function getLayout(page) {
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
