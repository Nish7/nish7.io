import theme from '../theme';
import { ChakraProvider } from '@chakra-ui/provider';
<<<<<<< HEAD
import Navbar from '@/components/navbar/Navbar';
=======
import Navbar from '../components/navbar/Navbar';
>>>>>>> 40d3ed4dfd3827bad542bad61b4f236b87605c85
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
			<Flex align="flex-start">
				<Navbar
					w="15%"
					h="100vh"
					position="sticky"
					alignSelf="flex-start"
					top={0}
				/>
				<Flex w="85%" minH="100vh" flexDirection="column">
					{getLayout(<Component {...pageProps} />)}
				</Flex>
			</Flex>
		</ChakraProvider>
	);
}

export default MyApp;
