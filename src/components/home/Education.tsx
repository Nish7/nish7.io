import { Box, Divider, Flex, Text } from '@chakra-ui/react';

function Education({ data }) {
	return (
		<Flex flexDir={['column', 'column', 'row']} mt={[10, 10, 14]}>
			<Text fontWeight="semibold" color="gray.400" mb={1}>
				Education
			</Text>

			<Box w="full" ml={[0, 0, 10]}>
				{data.map((s) => (
					<Study
						key={s.id}
						title={s.degree}
						place={s.place}
						start_date={s.start_date}
						end_date={s.end_date}
					/>
				))}
			</Box>
		</Flex>
	);
}

function Study({ title, place, start_date, end_date }) {
	const start = new Date(start_date);
	const end = new Date(end_date);

	const start_month = start.toLocaleString([], { month: 'short' });
	const end_month = end.toLocaleString([], { month: 'short' });

	const dur = `${start_month} ${start.getFullYear()} -  ${
		end_date ? end_month + ' ' + end.getFullYear() : 'Present'
	}`;

	return (
		<Flex justify="space-between" align="center" mb={2}>
			<Text whiteSpace="nowrap" mr={5}>
				{title}
			</Text>
			<Divider variant="dashed" borderColor="gray.400" />

			<Flex
				ml={5}
				flexDir={['column', 'column', 'row']}
				alignItems={'flex-end'}
			>
				<Text mr={[0, 0, 5]} whiteSpace={['normal', 'normal', 'nowrap']}>
					{place}
				</Text>
				<Text color="gray.600" whiteSpace="nowrap">
					{dur}
				</Text>
			</Flex>
		</Flex>
	);
}

export default Education;
