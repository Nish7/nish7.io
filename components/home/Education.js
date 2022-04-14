import { Box, Divider, Flex, Text } from '@chakra-ui/react';

function Education() {
	return (
		<Flex mt={14}>
			<Text fontWeight="semibold" color="gray.400">
				Education
			</Text>

			<Box w="full" ml={10}>
				<Study
					title="B.Sc Computer Science - 3.86 GPA"
					place="Ryerson University, Toronto"
					dur="2021-25"
				/>
				<Study
					title="IB Diploma Programme - 39/45"
					place="Fountainhead School, Surat"
					dur="2019-21"
				/>
			</Box>
		</Flex>
	);
}

function Study({ title, place, dur }) {
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
