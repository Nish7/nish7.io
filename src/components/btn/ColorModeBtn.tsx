import {
	Button,
	Text,
	useColorMode,
	useColorModeValue,
} from '@chakra-ui/react';
import { memo } from 'react';

function ColorModeBtn() {
	const { colorMode, toggleColorMode } = useColorMode();
	const bg = useColorModeValue('gray.100', 'whiteAlpha.100');

	return (
		<Button mt={4} onClick={toggleColorMode} size="sm" bg={bg} w="100%">
			<Text textTransform="capitalize">{colorMode}</Text>
		</Button>
	);
}

export default memo(ColorModeBtn);
