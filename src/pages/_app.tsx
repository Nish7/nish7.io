import '@fontsource/ibm-plex-sans/400.css';
import '@fontsource/ibm-plex-sans/500.css';
import '@fontsource/ibm-plex-sans/600.css';
import '@fontsource/ibm-plex-sans/700.css';

import { useContext, useEffect } from 'react';
import { Flex, useMediaQuery } from '@chakra-ui/react';
import Navbar from '@/components/navbar';
import Providers from '@/components/providers';
import { GlobalNavigationContext } from '@/components/context/GlobalNavigationContext';

function MyApp({ Component, pageProps }) {
	const getLayout = Component.getLayout || ((page) => page);

	return (
		<Providers>
			<Flex>
				<Navbar />

				<RenderPageComponent
					Component={Component}
					getLayout={getLayout}
					pageProps={pageProps}
				/>
			</Flex>
		</Providers>
	);
}

function RenderPageComponent({ Component, getLayout, pageProps }) {
	const { isOpen, setIsOpen } = useContext(GlobalNavigationContext);
	const [isLargerThan800] = useMediaQuery('(min-width: 800px)');

	useEffect(() => {
		if (isLargerThan800) {
			setIsOpen(false);
		}
	}, [isLargerThan800, setIsOpen]);

	return (
		<Flex
			display={{
				base: !isOpen ? 'flex' : 'none',
				md: 'flex',
				lg: 'flex',
			}}
			w={['100%', '100%', '85%']}
			minH="100vh"
			flexDirection="column"
			justifyContent={['flex-start', 'flex-start', 'center']}
		>
			{getLayout(<Component {...pageProps} />)}
		</Flex>
	);
}

export default MyApp;
