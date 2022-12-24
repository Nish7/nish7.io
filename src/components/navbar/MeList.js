import { Box, Link } from '@chakra-ui/react';
import React from 'react';
import { AiFillBook, AiFillStar } from 'react-icons/ai';
import { BsStack } from 'react-icons/bs';
import { RiGameFill } from 'react-icons/ri';
import NavLink from './NavLink';
import SectionTitle from './SectionTitle';

function MeList() {
	return (
		<Box mt={10}>
			<SectionTitle>
				<Link href="/me">Me</Link>
			</SectionTitle>

			<NavLink href="/bookmarks" icon={<AiFillBook />}>
				Bookmarks
			</NavLink>
			<NavLink icon={<BsStack />}>Stack</NavLink>
			<NavLink icon={<AiFillStar />}>Gear</NavLink>
			<NavLink icon={<RiGameFill />}>Misc</NavLink>
		</Box>
	);
}

export default MeList;
