/* eslint-disable react-hooks/rules-of-hooks */
import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import { FaArrowLeft } from 'react-icons/fa';
import {
	useState,
	useEffect,
	ReactNode,
	SetStateAction,
	Dispatch,
	memo,
} from 'react';
import Shortcut from './Shortcut';

interface SidebarLayoutProp {
	title: string;
	shortcut?: boolean;
	children: ReactNode;
	isPage: boolean;
}

interface SidebarProp {
	title: string;
	toggle: string;
	useToggle?: Dispatch<SetStateAction<string>>;
	children: ReactNode;
	isPage?: boolean;
}

function SidebarLayout({
	title,
	shortcut = true,
	children,
	isPage,
}: SidebarLayoutProp) {
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
		<Sidebar title={title} toggle={toggle} isPage={isPage}>
			{children}
		</Sidebar>
	);
}

const Sidebar = ({
	title,
	toggle,
	useToggle,
	children,
	isPage = false,
}: SidebarProp) => {
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

export default memo(SidebarLayout);