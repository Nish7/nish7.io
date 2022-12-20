/* eslint-disable react-hooks/rules-of-hooks */
import { Box, Flex, Icon, Text, useMediaQuery } from '@chakra-ui/react';
import { FaArrowLeft } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import Shortcut from './Shortcut';

function SidebarLayout({ title, shortcut = true, children, isPage = false }) {
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
		<Sidebar title={title} toggle={toggle} isPage={isPage}>
			{children}
		</Sidebar>
	);
}

const Sidebar = ({ title, toggle, useToggle, children, isPage }) => {
	const [isLargerThan800] = useMediaQuery('(min-width: 800px)');

	return (
		<Box
			w={['100%', '100%', '30%']}
			display={isPage && !isLargerThan800 ? 'none' : toggle}
			pl={5}
			pr={3}
			pt={8}
			position="sticky"
			alignSelf="flex-start"
			top={0}
			h="100vh"
			overflow="scroll"
			css={{ '&::-webkit-scrollbar': { display: 'none' } }}
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
};



export default SidebarLayout;