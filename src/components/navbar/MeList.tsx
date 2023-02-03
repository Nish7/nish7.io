import { Box, Link } from '@chakra-ui/react';
import React, { memo } from 'react';
import { AiFillBook, AiFillStar } from 'react-icons/ai';
import { BsStack } from 'react-icons/bs';
import { RiGameFill } from 'react-icons/ri';
import NavLink from './NavLink';
import SectionTitle from './SectionTitle';

function MeList() {
	return (
		<Box mt={8}>
			<SectionTitle p_href="/me">Me</SectionTitle>

			<NavLink href="/bookmarks" icon={<AiFillBook />}>
				Bookmarks
			</NavLink>
			<NavLink icon={<BsStack />}>Stack</NavLink>
			<NavLink icon={<AiFillStar />}>Gear</NavLink>
			<NavLink href="/misc" icon={<RiGameFill />}>
				Misc
			</NavLink>
		</Box>
	);
}

export default memo(MeList);
