import { Box, Divider, Flex, Text } from '@chakra-ui/react';

function Work() {
	return (
		<Flex mt={20}>
			<Text fontWeight="semibold" color="gray.400">
				Work
			</Text>

			<Box w="full" ml={10}>
				<Job comp="Atishae Web Pvt" role="Intern Tester" dur="2019-19" />
				<Job comp="4eversolutions" role="Intern Web Developer" dur="2018-18" />
				<Job comp="NJ Indiavest" role="Intern Java Developer" dur="2017-17" />
			</Box>
		</Flex>
	);
}

function Job({ comp, role, dur }) {
	return (
		<Flex justify="space-between" align="center" mb={2}>
			<Text whiteSpace="nowrap" mr={5}>
				{comp}
			</Text>
			<Divider variant="dashed" borderColor="gray.400" />

			<Flex ml={5}>
				<Text mr={5} whiteSpace="nowrap">
					{role}
				</Text>
				<Text color="gray.600" whiteSpace="nowrap">
					{dur}
				</Text>
			</Flex>
		</Flex>
	);
}

export default Work;
