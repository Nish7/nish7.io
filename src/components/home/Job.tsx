import { Divider, Flex, Text } from '@chakra-ui/react';
import { memo } from 'react';

function Job({
	comp,
	role,
	start_date,
	end_date,
}: {
	comp: string;
	role: string;
	start_date: string;
	end_date: string | null;
}) {
	const start = new Date(start_date);
	const end = new Date(end_date ?? '');

	start.setMonth(start.getMonth() + 1);
	end.setMonth(end.getMonth() + 1);

	const start_month = start.toLocaleString([], { month: 'short' });
	const end_month = end.toLocaleString([], { month: 'short' });

	const dur = `${start_month} ${start.getFullYear()} -  ${
		end_date ? end_month + ' ' + end.getFullYear() : 'Present'
	}`;

	return (
		<Flex justify="space-between" align="center" mb={2}>
			<Text whiteSpace="nowrap" mr={5}>
				{comp}
			</Text>
			<Divider variant="dashed" borderColor="gray.400" />

			<Flex
				ml={5}
				flexDir={['column', 'column', 'row']}
				alignItems={'flex-end'}
			>
				<Text mr={[0, 0, 5]} whiteSpace="nowrap">
					{role}
				</Text>
				<Text color="gray.600" whiteSpace="nowrap">
					{dur}
				</Text>
			</Flex>
		</Flex>
	);
}

export default memo(Job);
