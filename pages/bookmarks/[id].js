import BookmarkSidebar from '@/components/bookmark/BookmarkSidebar';
import TagLabel from '@/components/tag/TagLabel';
import { Flex, Text, Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const tagColors = {
	WEBSITE: 'red',
	PORTFOLIO: 'blue',
};

const bookmarkPage = ({ tag = 'PORTFOLIO' }) => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const router = useRouter();
	const { id } = router.query;

	return (
		<Box w="70%" py={8} mx="auto" h="auto" px={10}>
			<TagLabel color={tagColors?.[tag]}>{tag}</TagLabel>

			{id && (
				<Text fontWeight="bold" fontSize="2xl">
					{id.split('-').join(' ')}
				</Text>
			)}
		</Box>
	);
};

bookmarkPage.getLayout = function getLayout(page) {
	return (
		<Flex>
			<BookmarkSidebar />
			{page}
		</Flex>
	);
};

export default bookmarkPage;
