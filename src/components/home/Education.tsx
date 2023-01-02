import { EducationProp } from '@/lib/types/interface';
import { Box, Flex, Text } from '@chakra-ui/react';
import { memo } from 'react';
import Study from './Study';

function Education({ data }: { data: EducationProp[] }) {
	return (
		<Flex flexDir={['column', 'column', 'row']} mt={[10, 10, 14]}>
			<Text fontWeight="semibold" color="gray.400" mb={1}>
				Education
			</Text>

			<Box w="full" ml={[0, 0, 10]}>
				{data.map(({ id, degree, place, start_date, end_date }) => (
					<Study
						key={id}
						title={degree}
						place={place}
						start_date={start_date}
						end_date={end_date}
					/>
				))}
			</Box>
		</Flex>
	);
}

export default memo(Education);
