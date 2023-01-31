import '@fontsource/ibm-plex-sans/400.css';
import '@fontsource/ibm-plex-sans/500.css';
import '@fontsource/ibm-plex-sans/600.css';
import '@fontsource/ibm-plex-sans/700.css';
import { useEffect } from 'react';
import { Flex, useMediaQuery } from '@chakra-ui/react';
import { Analytics } from '@vercel/analytics/react';
import Navbar from '@/components/navbar';
import Providers from '@/components/providers';
import { useGlobalNavigationContext } from '@/components/context/GlobalNavigationContext';
import { _AppProps } from '@/lib/types';

function MyApp({ Component, pageProps }: _AppProps) {
	return (
		<Providers>
			<Flex>
				<Navbar />
				<RenderPageComp Component={Component} pageProps={pageProps} />
				<Analytics />
			</Flex>
		</Providers>
	);
}

function RenderPageComp({ Component, pageProps }: Omit<_AppProps, 'router'>) {
	const { isOpen, setIsOpen } = useGlobalNavigationContext();
	const [isLargerThan800] = useMediaQuery('(min-width: 800px)');

	const getLayout = Component.getLayout || ((page) => page);

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
