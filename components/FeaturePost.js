import {
	Box,
	Flex,
	Tag,
	Text,
	useColorMode,
	useColorModeValue,
} from '@chakra-ui/react';

function FeaturePost() {
	return (
		<>
			<Text fontSize="3xl" fontWeight="semibold" mb={5}>
				Featured Posts
			</Text>
			<Flex justify="space-evenly" align="flex-start">
				<BlogBox />
				<BlogBox />
				<BlogBox />
			</Flex>
		</>
	);
}

function BlogBox() {
	const bg = useColorModeValue('gray.50', 'whiteAlpha.100');

	return (
		<Box p={5} boxShadow="sm" mr={5} bg={bg} cursor="pointer" borderRadius={10}>
			<Text fontSize="lg" fontWeight="semibold">
				Lorem Ipsum
			</Text>
			<Text fontSize="sm" mb={4}>
				12/12/21
			</Text>
			<Tag mr={2}>School</Tag>
			<Tag>React</Tag>

			<Text mt={4}>
				Ipsum magna proident mollit excepteur est ex ut sit qui magna
				reprehenderit...
			</Text>
		</Box>
	);
}

export default FeaturePost;
