import { Box, Icon, Text, useColorModeValue } from '@chakra-ui/react';
import Link from 'next/link';
import { memo } from 'react';
import { FiLink } from 'react-icons/fi';

interface BookmarkItemProp {
	title: string;
	site: string;
	active: boolean;
}

function BookmarkItem({ title, site, active }: BookmarkItemProp) {
	const bg = useColorModeValue('gray.100', 'whiteAlpha.100');

	return (
		<Link
			href={`/bookmarks/${title.toLowerCase().split(' ').join('-')}`}
			passHref
		>
			<Box
				_hover={{ bg: bg, cursor: 'pointer' }}
				borderRadius={8}
				p={2}
				background={active ? bg : ''}
			>
				<Text fontSize="sm" fontWeight="semibold">
					{title}
				</Text>
				<Text mt={1} fontSize="sm" color="gray.600">
					<Icon boxSize={3} as={FiLink} mr={2} />
					{site}
				</Text>
			</Box>
		</Link>
	);
}

export default memo(BookmarkItem);
