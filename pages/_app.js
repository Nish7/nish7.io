import theme from '../theme';
import { ChakraProvider } from '@chakra-ui/provider';
import Navbar from '../components/navbar/Navbar';
import { Flex, Icon, useMediaQuery } from '@chakra-ui/react';

// Fonts
import '@fontsource/ibm-plex-sans/400.css';
import '@fontsource/ibm-plex-sans/500.css';
import '@fontsource/ibm-plex-sans/600.css';
import '@fontsource/ibm-plex-sans/700.css';
import { AiOutlineMenu } from 'react-icons/ai';
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps }) {
	const getLayout = Component.getLayout || ((page) => page);
	const [isLargerThan800] = useMediaQuery('(min-width: 800px)');

	const [isNavOpen, setNav] = useState(false);

	useEffect(() => {
		if (isLargerThan800) {
			setNav(false);
		}
	}, [isLargerThan800]);

	return (
		<ChakraProvider theme={theme}>
			<Flex>
				<Navbar isNavOpen={isNavOpen} />

				<Icon
					display={['inline', 'inline', 'none']}
					position={'absolute'}
					top="5"
					onClick={() => setNav(!isNavOpen)}
					left="5"
					as={AiOutlineMenu}
				/>

				<Flex
					display={{
						base: !isNavOpen ? 'flex' : 'none',
						md: 'flex',
						lg: 'flex',
					}}
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
