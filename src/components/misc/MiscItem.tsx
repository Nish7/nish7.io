import { Box, Icon, Text, useColorModeValue } from '@chakra-ui/react';
import Link from 'next/link';
import { memo } from 'react';
import { BsSpotify } from 'react-icons/bs';

interface MiscItemProp {
	title: string;
	active: boolean;
}

function MiscItem({ title, active }: MiscItemProp) {
	const bg = useColorModeValue('gray.100', 'whiteAlpha.100');

	return (
		<Link href={`/misc/${title.toLowerCase().split(' ').join('-')}`} passHref>
			<Box
				_hover={{ bg: bg, cursor: 'pointer' }}
				borderRadius={8}
				p={2}
				background={active ? bg : ''}
			>
				<Text fontSize="sm" fontWeight="semibold">
					{title}
					{/* <Icon color="green.400" ml={2} as={BsSpotify} /> */}
				</Text>
			</Box>
		</Link>
	);
}

export default memo(MiscItem);
