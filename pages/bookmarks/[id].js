import BookmarkSidebar from '@/components/bookmark/BookmarkSidebar';
import { Flex, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const bookmarkPage = () => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const router = useRouter();
	const { id } = router.query;

	return (
		<Flex>
			<Text>{id}</Text>
		</Flex>
	);
};

bookmarkPage.getLayout = function getLayout(page) {
	return (
		<Flex>
			<BookmarkSidebar forceOpen={false} />
			{page}
		</Flex>
	);
};

export default bookmarkPage;
