import { Box, useColorModeValue } from '@chakra-ui/react';
import React, { memo } from 'react';

function PageBackground() {
	const color = useColorModeValue('rgba(0,0,0,0.7)', 'rgba(255,255,255,0.5)');

	return (
		<Box
			display={['none', 'none', 'block']}
			w={'70%'}
			pl={5}
			sx={{
				backgroundColor: 'rgba(0,0,0,0)',
				opacity: 0.8,
				backgroundImage: `radial-gradient(${color} 1px, transparent 1px), radial-gradient(${color} 1px, rgba(0,0,0,0) 1px)`,
				backgroundSize: '40px 40px',
				backgroundPosition: '0 0,20px 20px',
			}}
		></Box>
	);
}

export default memo(PageBackground);
