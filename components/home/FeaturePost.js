import {
	Box,
	Flex,
	Icon,
	Tag,
	Text,
	useColorMode,
	useColorModeValue,
} from '@chakra-ui/react';

import { MdDateRange } from 'react-icons/md';

function FeaturePost() {
	return (
		<>
			<Text fontSize="3xl" fontWeight="semibold" mb={5}>
				Featured Posts
			</Text>
			<Flex justify="space-evenly">
				<BlogBox title="Writing In Progess..." date="Coming Soon" />
				<BlogBox title="Writing In Progess..." date="Coming Soon" />
				<BlogBox title="Writing In Progess..." date="Coming Soon" />
			</Flex>
		</>
	);
}

function BlogBox({ title, date }) {
	// const bg = useColorModeValue('rgba(0,0,0,0.5)', 'white');
	const bg = useColorModeValue('gray.100', 'whiteAlpha.200');

	return (
		<Flex
			p={6}
			flexDirection="column"
			justify="space-between"
			boxShadow="sm"
			mr={5}
			bg={bg}
			// border={`1.5px ${bg} solid`}
			cursor="pointer"
			borderRadius={10}
			minH={20}
			w={1 / 3}
		>
			<Text fontSize="md" fontWeight="semibold" w="90%">
				{title}
			</Text>

			<Flex mt={5} alignItems="center">
				<Icon as={MdDateRange} mr={1} />
				<Text fontSize="sm">{date}</Text>
			</Flex>
		</Flex>
	);
}

export default FeaturePost;
