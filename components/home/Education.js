import { Box, Divider, Flex, Text } from '@chakra-ui/react';

function Education({ data }) {
	return (
		<Flex mt={14}>
			<Text fontWeight="semibold" color="gray.400">
				Education
			</Text>

			<Box w="full" ml={10}>
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
	const start_year = new Date(start_date).getFullYear();
	const end_year = new Date(end_date).getFullYear().toString().slice(2);

	const dur = `${start_year}-${end_year}`;
	return (
		<Flex justify="space-between" align="center" mb={2}>
			<Text whiteSpace="nowrap" mr={5}>
				{title}
			</Text>
			<Divider variant="dashed" borderColor="gray.400" />

			<Flex ml={5}>
				<Text mr={5} whiteSpace="nowrap">
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
