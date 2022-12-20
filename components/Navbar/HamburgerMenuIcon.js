import { CloseButton, Icon } from '@chakra-ui/react';
import React from 'react';
import { AiOutlineMenu } from 'react-icons/ai';

function HamburgerMenuIcon({ isOpen, setIsOpen }) {
	return (
		<Icon
			zIndex={2}
			display={['inline', 'inline', 'none']}
			position="absolute"
			cursor="pointer"
			top="5"
			onClick={() => setIsOpen(!isOpen)}
			left="5"
			as={!isOpen ? AiOutlineMenu : CloseButton}
		/>
	);
}

export default HamburgerMenuIcon;
