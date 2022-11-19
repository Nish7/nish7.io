import theme from '../theme';
import { ChakraProvider } from '@chakra-ui/provider';
import Navbar from '../components/navbar/Navbar';
import { Flex } from '@chakra-ui/react';

// Fonts
import '@fontsource/ibm-plex-sans/400.css';
import '@fontsource/ibm-plex-sans/500.css';
import '@fontsource/ibm-plex-sans/600.css';
import '@fontsource/ibm-plex-sans/700.css';

function MyApp({ Component, pageProps }) {
	const getLayout = Component.getLayout || ((page) => page);

	return (
		<ChakraProvider theme={theme}>
			<Flex>
				<Navbar
					w="15%"
					h="100vh"
					position="sticky"
					alignSelf="flex-start"
					top={0}
				/>
				<Flex
					w="85%"
					minH="100vh"
					flexDirection="column"
					justifyContent="center"
				>
					{getLayout(<Component {...pageProps} />)}
				</Flex>
			</Flex>
		</ChakraProvider>
	);
}

export default MyApp;
