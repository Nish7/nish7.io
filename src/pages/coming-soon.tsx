import HeadMeta from '@/components/layouts/HeadMeta';
import { Flex, Text } from '@chakra-ui/react';

function ComingSoon() {
	return (
		<>
			<HeadMeta title="Coming Soon" />
			<Flex h="100vh" justifyContent="center" alignItems="center">
				<Text fontWeight="bold" fontSize="7xl">
					Coming Soon...
				</Text>
			</Flex>
		</>
	);
}

export default ComingSoon;
