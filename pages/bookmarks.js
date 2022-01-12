import SidebarLayout from '@/components/layouts/SidebarLayout';
import { Box, Flex, Icon, Text, useColorModeValue } from '@chakra-ui/react';
import { FiLink } from 'react-icons/fi';

function Bookmarks() {
	const color = useColorModeValue('rgba(0,0,0,0.7)', 'rgba(255,255,255,0.5)');

	return (
		<Flex>
			{/* TODO: Change to a per-page layout for bookmarks: read nextjs.org */}
			<SidebarLayout title="Bookmarks">
				<Item title="First impressions of web3" site="movie.org" />
				<Item title="The Charisma of Leaders" site="metaismurder.com" />
				<Item title="Strategy Letter V" site="epsilontheory.com" />
				<Item title="There is no speed limit" site="sivers.com" />
			</SidebarLayout>

			<Box
				w="70%"
				pl={5}
				sx={{
					backgroundColor: 'rgba(0,0,0,0)',
					opacity: 0.8,
					backgroundImage: `radial-gradient(${color} 1px, transparent 1px), radial-gradient(${color} 1px, rgba(0,0,0,0) 1px)`,
					backgroundSize: '40px 40px',
					backgroundPosition: '0 0,20px 20px',
				}}
			></Box>
		</Flex>
	);
}

function Item({ title, site }) {
	const bg = useColorModeValue('gray.100', 'whiteAlpha.100');

	return (
		<Box _hover={{ bg: bg, cursor: 'pointer' }} borderRadius={8} p={2}>
			<Text fontSize="sm" fontWeight="semibold">
				{title}
			</Text>
			<Text mt={1} fontSize="sm" color="gray.600">
				<Icon boxSize={3} as={FiLink} mr={2} />
				{site}
			</Text>
		</Box>
	);
}

export default Bookmarks;
