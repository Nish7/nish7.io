/* eslint-disable react-hooks/rules-of-hooks */
import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import { FaArrowLeft } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import Shortcut from './Shortcut';

function SidebarLayout({ title, shortcut = true, children }) {
	const [toggle, useToggle] = useState('');
	const toggleCallback = () =>
		toggle == '' ? useToggle('none') : useToggle('');

	useEffect(() => {
		if (shortcut) {
			useToggle('');
		}
	}, [useToggle, shortcut]);

	if (!shortcut)
		return (
			<Sidebar title={title} toggle={toggle} useToggle={useToggle}>
				<Shortcut command="metaKey+b" callback={toggleCallback}>
					{children}
				</Shortcut>
			</Sidebar>
		);

	return (
		<Sidebar title={title} toggle={toggle}>
			{children}
		</Sidebar>
	);
}

const Sidebar = ({ title, toggle, useToggle, children }) => (
	<Box
		w="30%"
		pl={5}
		pr={3}
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

			{useToggle && (
				<Icon onClick={() => useToggle('none')} as={FaArrowLeft} mr={5} />
			)}
		</Flex>

		{children}
	</Box>
);



export default SidebarLayout;