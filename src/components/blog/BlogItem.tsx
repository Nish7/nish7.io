import Link from 'next/link';
import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import StatusIcon from '../navbar/StatusIcon';
import { memo } from 'react';

interface BlogItemProp {
	title: string;
	date: string;
	slug: string;
	active?: boolean
}

function BlogItem({ title, date, active, slug }: BlogItemProp) {
	const bg = useColorModeValue('gray.100', 'whiteAlpha.100');

	return (
		<Link
			href={`/blog/${slug}`}
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
					<StatusIcon color={"green"} mr={1} /> 
					{date}
				</Text>
			</Box>
		</Link>
	);
}

export default memo(BlogItem);
