/* eslint-disable react-hooks/rules-of-hooks */
import { Box, Button, Flex, Icon, Text } from '@chakra-ui/react';
import { FaArrowLeft } from 'react-icons/fa';
import { useState } from 'react';

function SidebarLayout({ title, children }) {
	const [toggle, useToggle] = useState('');

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
			display={toggle}
		>
			<Flex justify="space-between" align="middle">
				<Text mb={8} pl={2} fontWeight="semibold">
					{title}
				</Text>

				<Icon onClick={() => useToggle('none')} as={FaArrowLeft} />
			</Flex>

			{children}
		</Box>
	);
}

export default SidebarLayout;
