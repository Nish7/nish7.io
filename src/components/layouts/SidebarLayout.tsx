/* eslint-disable react-hooks/rules-of-hooks */
import { Box, Flex, Icon, Text, useMediaQuery } from '@chakra-ui/react';
import { FaArrowLeft } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import Shortcut from './Shortcut';

function SidebarLayout({ title, shortcut = true, children, isPage }) {
	const [toggle, useToggle] = useState('block');
	const toggleCallback = () =>
		toggle == 'block' ? useToggle('none') : useToggle('block');

	useEffect(() => {
		if (shortcut) {
			useToggle('block');
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
		<Sidebar title={title} toggle={toggle} isPage={isPage} useToggle={false}>
			{children}
		</Sidebar>
	);
}

const Sidebar = ({ title, toggle, useToggle, children, isPage = false }) => {
	return (
		<Box
			w={['100%', '100%', '30%']}
			display={!isPage ? toggle : ['none', 'none', toggle]}
			pl={[2, 2, 5]}
			pr={[2, 2, 3]}
			pt={[2, 2, 8]}
			position="sticky"
			alignSelf="flex-start"
			top={0}
			h="100vh"
			overflow="scroll"
			css={{ '&::-webkit-scrollbar': { display: 'none' } }}
		>
			<Flex justify="space-between" align="middle">
				<Text mt={[2, 2, 0]} mb={8} pl={[12, 12, 2]} fontWeight="semibold">
					{title}
				</Text>

				{useToggle && (
					<Icon onClick={() => useToggle('none')} as={FaArrowLeft} mr={5} />
				)}
			</Flex>

			{children}
		</Box>
	);
};



export default SidebarLayout;