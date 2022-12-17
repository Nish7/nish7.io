import theme from '../theme';
import { ChakraProvider } from '@chakra-ui/provider';
import Navbar from '../components/navbar/Navbar';
import { Flex, Icon } from '@chakra-ui/react';

// Fonts
import '@fontsource/ibm-plex-sans/400.css';
import '@fontsource/ibm-plex-sans/500.css';
import '@fontsource/ibm-plex-sans/600.css';
import '@fontsource/ibm-plex-sans/700.css';
import { AiOutlineMenu } from 'react-icons/ai';

function MyApp({ Component, pageProps }) {
	const getLayout = Component.getLayout || ((page) => page);

	return (
		<ChakraProvider theme={theme}>
			<Flex>
				<Navbar />

				<Icon
					display={['inline', 'inline', 'none']}
					position={'absolute'}
					top="5"
					left="5"
					as={AiOutlineMenu}
				/>

				<Flex
					w={['100%', '100%', '85%']}
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
