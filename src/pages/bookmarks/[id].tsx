import { useRouter } from 'next/router';
import { Flex, Text, Box, Icon, Button } from '@chakra-ui/react';
import { FiLink } from 'react-icons/fi';
import BookmarkSidebar from '@/components/bookmark/BookmarkSidebar';
import TagLabel from '@/components/tag/TagLabel';
import HeadMeta from '@/components/layouts/HeadMeta';
import { tags_colors } from '@/lib/consts';
import Link from 'next/link';
import supabase from '@/lib/supabase';
import { BookmarkProp } from '@/lib/types/interface';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ReactElement } from 'react';

const BookmarkPage = ({ bookmarksData }: { bookmarksData: BookmarkProp[] }) => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const router = useRouter();
	const { id } = router.query;

	const bookmark = bookmarksData.find(
		(b) => b.name.toLowerCase().split(' ').join('-').trim() === id
	);

	if (bookmark) {
		const { name, type: tag, description, link } = bookmark;
		return (
			<>
				<HeadMeta title={bookmark.name} />
				<Box
					w={['100%', '100%', '70%']}
					mt={[10, 10, 0]}
					p={[4, 4, 8]}
					mx="auto"
					h="auto"
				>
					<TagLabel color={tags_colors?.[tag]}>{tag}</TagLabel>

					<Text fontWeight="bold" fontSize="2xl">
						{name.split('-').join(' ')}
					</Text>

					<Text my={2} fontWeight="light" color="light-grey" fontSize="md">
						<Icon boxSize={3} as={FiLink} mr={1} /> {new URL(link).host}
					</Text>

					<Text
						fontWeight="light"
						fontStyle="italic"
						color="grey"
						fontSize="md"
					>
						{description ?? ''}
					</Text>

					<Link
						style={{ textDecoration: 'none' }}
						href={link}
						target="_blank"
						passHref
					>
						<Button colorScheme="blue" size="md" w="100%" mx="auto" my={10}>
							<Icon boxSize={3} as={FiLink} mr={1} />
							<Text>Visit</Text>
						</Button>
					</Link>
				</Box>
			</>
		);
	}
};

BookmarkPage.getLayout = function getLayout(page: ReactElement) {
	const { props } = page;

	return (
		<Flex>
			<BookmarkSidebar bookmarks={props.bookmarksData} isPage />
			{page}
		</Flex>
	);
};

export const getStaticPaths: GetStaticPaths = async () => {
	const bookmarksData = await supabase.fetchBookmarks();

	const paths = bookmarksData
		? bookmarksData.map((p) => ({
				params: {
					id: p.name.toLowerCase().split(' ').join('-').trim(),
				},
		  }))
		: [];

	return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async () => {
	const bookmarksData = await supabase.fetchBookmarks();

	return {
		props: {
			bookmarksData,
		},
		revalidate: 60,
	};
};

export default BookmarkPage;
