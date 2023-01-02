import { CloseButton, Icon } from '@chakra-ui/react';
import { memo } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { GlobalNavigationContextInterface } from '../context/GlobalNavigationContext';

function HamburgerMenuIcon({
	isOpen,
	setIsOpen,
}: GlobalNavigationContextInterface) {
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

export default memo(HamburgerMenuIcon);
