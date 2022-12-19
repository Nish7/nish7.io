// Fonts
import '@fontsource/ibm-plex-sans/400.css';
import '@fontsource/ibm-plex-sans/500.css';
import '@fontsource/ibm-plex-sans/600.css';
import '@fontsource/ibm-plex-sans/700.css';

import { useContext, useEffect } from 'react';
import { Flex, useMediaQuery } from '@chakra-ui/react';

import Navbar from '../components/navbar/Navbar';
import Providers from '@/components/providers/Providers';
import { GlobalNavigationContext } from '@/components/context/GlobalNavigationContext';

function MyApp({ Component, pageProps }) {
	const [isLargerThan800] = useMediaQuery('(min-width: 800px)');

	const getLayout = Component.getLayout || ((page) => page);

	return (
		<Providers>
			<Flex>
				<Navbar />

				<RenderPageComponent
					isLargerThan800={isLargerThan800}
					Component={Component}
					getLayout={getLayout}
					pageProps={pageProps}
				/>
			</Flex>
		</Providers>
	);
}

function RenderPageComponent({
	isLargerThan800,
	Component,
	getLayout,
	pageProps,
}) {
	const { isOpen, setIsOpen } = useContext(GlobalNavigationContext);

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
			justifyContent="center"
		>
			{getLayout(<Component {...pageProps} />)}
		</Flex>
	);
}

export default MyApp;
