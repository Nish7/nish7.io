import { useRouter } from 'next/router';
import { Flex, Text, Box, Icon, Button, Link } from '@chakra-ui/react';
import { FiLink } from 'react-icons/fi';
import BookmarkSidebar from '@/components/bookmark/BookmarkSidebar';
import TagLabel from '@/components/tag/TagLabel';
import HeadMeta from '@/components/headTag/HeadMeta';
import { supabase } from '@/lib/supabase';
import { tags_colors } from '@/lib/enums';

const bookmarkPage = ({ bookmarksData }) => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const router = useRouter();
	const { id } = router.query;

	const {
		created_at,
		name,
		description,
		link,
		type: tag,
	} = bookmarksData.find(
		(b) => b.name.toLowerCase().split(' ').join('-').trim() === id
	);

	return (
		<>
			<HeadMeta title={name} />
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

				<Text fontWeight="light" fontStyle="italic" color="grey" fontSize="md">
					{description}
				</Text>

				<Link style={{ textDecoration: 'none' }} href={link} target="_blank">
					<Button colorScheme="blue" size="md" w="100%" mx="auto" my={10}>
						<Icon boxSize={3} as={FiLink} mr={1} />
						<Text>Visit</Text>
					</Button>
				</Link>
			</Box>
		</>
	);
};

bookmarkPage.getLayout = function getLayout(page) {
	const { props } = page;

	return (
		<Flex>
			<BookmarkSidebar bookmarks={props.bookmarksData} isPage />
			{page}
		</Flex>
	);
};

export async function getStaticPaths() {
	let { data: bookmarksData } = await supabase.from('Bookmark').select('*');

	const paths = bookmarksData.map((p) => ({
		params: { id: p.name.toLowerCase().split(' ').join('-').trim() },
	}));

	return { paths, fallback: 'blocking' };
}

export async function getStaticProps() {
	let { data: bookmarksData } = await supabase.from('Bookmark').select('*');

	return {
		props: {
			bookmarksData,
		},
		revalidate: 60,
	};
}

export default bookmarkPage;
