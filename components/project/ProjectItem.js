import { Box, Icon, Text, useColorModeValue } from '@chakra-ui/react';
import Link from 'next/link';
import { StatusIcon } from '../navbar/Navbar';
import { tags_colors } from 'lib/enums';

function ProjectItem({ title, language, active }) {
	const bg = useColorModeValue('gray.100', 'whiteAlpha.100');

	return (
		<Link
			href={`/projects/${title.toLowerCase().split(' ').join('-')}`}
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
					<StatusIcon color={tags_colors[language]} mr={1} />
					{language}
				</Text>
			</Box>
		</Link>
	);
}

export default ProjectItem;
