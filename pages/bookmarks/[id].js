import BookmarkSidebar from '@/components/bookmark/BookmarkSidebar';
import { Flex, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const bookmarkPage = () => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const router = useRouter();
	console.log(router.query);
	const { title } = router.query;

	return (
		<Flex>
			<Text>{title}</Text>
		</Flex>
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
