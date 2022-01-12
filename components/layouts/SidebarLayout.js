import { Box, Text } from '@chakra-ui/react';

function SidebarLayout({ title, children }) {
	return (
		<Box
			w="30%"
			pl={5}
			pt={8}
			position="sticky"
			alignSelf="flex-start"
			top={0}
			h="100vh"
			overflow="scroll"
			css={{ '&::-webkit-scrollbar': { display: 'none' } }}
		>
			<Text mb={8} pl={2} fontWeight="semibold">
				{title}
			</Text>
			{children}
		</Box>
	);
}

export default SidebarLayout;
