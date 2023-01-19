import { Divider, Flex, Text } from '@chakra-ui/react';
import { memo } from 'react';
import { format } from 'date-fns';

function Study({
	title,
	place,
	start_date,
	end_date,
}: {
	title: string;
	place: string;
	start_date: string;
	end_date: string;
}) {
	const start = new Date(start_date);
	const end = new Date(end_date);

	const start_month = format(start, 'MMM');
	const end_month = format(end, 'MMM');

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

export default memo(Study);
