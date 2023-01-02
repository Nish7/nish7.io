import { WorkProp } from '@/lib/types/interface';
import { Box, Divider, Flex, Text } from '@chakra-ui/react';
import Job from './Job';

function Work({ data }: { data: WorkProp[] }) {
	return (
		<Flex mt={20} flexDir={['column', 'column', 'row']}>
			<Text fontWeight="semibold" color="gray.400" mb={1}>
				Work
			</Text>

			<Box w="full" ml={[0, 0, 10]}>
				{data.map((j) => (
					<Job
						key={j.id}
						comp={j.name}
						role={j.role}
						start_date={j.start_date}
						end_date={j.end_date}
					/>
				))}
			</Box>
		</Flex>
	);
}


export default Work;
