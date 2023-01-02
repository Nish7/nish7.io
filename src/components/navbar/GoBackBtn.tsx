import { Icon } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { memo } from 'react';
import { FaArrowLeft } from 'react-icons/fa';

function GoBackBtn() {
	const { pathname } = useRouter();

	return (
		<Link href={`/${pathname.split('/')[1]}`} passHref>
			<Icon
				zIndex={2}
				display={['inline', 'inline', 'none']}
				position="absolute"
				cursor="pointer"
				top="5"
				left="5"
				as={FaArrowLeft}
			/>
		</Link>
	);
}

export default memo(GoBackBtn);
