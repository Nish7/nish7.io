import {
	Button,
	Flex,
	Text,
	useColorMode,
	useColorModeValue,
} from '@chakra-ui/react';

function Footer() {
	const { colorMode, toggleColorMode } = useColorMode();
	const bg = useColorModeValue('gray.100', 'whiteAlpha.100');

	return (
		<Flex mb={5} mt="auto" align="center" justify="space-between">
			<Text></Text>

			<Button onClick={toggleColorMode} size="sm" bg={bg}>
				<Text textTransform="capitalize">{colorMode}</Text>
			</Button>
		</Flex>
	);
}

export default Footer;
