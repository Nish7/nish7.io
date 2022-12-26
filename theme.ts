import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const styles = {
	global: (props) => ({
		body: {
			bg: mode('white', '#111')(props),
			color: mode('black', 'whiteAlpha.900')(props),
		},
	}),
};

const fonts = {
	body: 'IBM Plex Sans',
};

type ChakaraConfig = {
	initialColorMode: 'light' | 'dark' | 'system';
	useSystemColorMode?: boolean;
};

export const config: ChakaraConfig = {
	initialColorMode: 'dark',
	useSystemColorMode: true,
};

export default extendTheme({ config, styles, fonts });
