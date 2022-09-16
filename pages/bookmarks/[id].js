import BookmarkSidebar from '@/components/bookmark/BookmarkSidebar';
import TagLabel from '../../components/tag/TagLabel';
import { Flex, Text, Box, Icon, Button, Link } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { supabase } from 'lib/supabase';
import { FiLink } from 'react-icons/fi';

const tagColors = {
	Website: 'red',
	Portfolio: 'blue',
	Reading: 'purple',
};

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
		<Box w="70%" py={8} mx="auto" h="auto" px={10}>
			<TagLabel color={tagColors?.[tag]}>{tag}</TagLabel>

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
				<Button colorScheme="blue" size="md" w="90%" mx="auto" my={10}>
					<Icon boxSize={3} as={FiLink} mr={1} />
					<Text>Visit</Text>
				</Button>
			</Link>
		</Box>
	);
};

bookmarkPage.getLayout = function getLayout(page) {
	const { props } = page;

	return (
		<Flex>
			<BookmarkSidebar bookmarks={props.bookmarksData} />
			{page}
		</Flex>
	);
};

export async function getStaticPaths() {
	let { data: bookmarksData } = await supabase.from('Bookmark').select('*');

	const paths = bookmarksData.map((p) => ({
		params: { id: p.name.toLowerCase().split(' ').join('-').trim() },
	}));

	return { paths, fallback: false };
}

export async function getStaticProps() {
	let { data: bookmarksData } = await supabase.from('Bookmark').select('*');

	return {
		props: {
			bookmarksData,
		},
	};
}

export default bookmarkPage;
