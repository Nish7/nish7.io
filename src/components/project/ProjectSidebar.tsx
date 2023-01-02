import { ProjectProp } from '@/lib/types/interface';
import { useRouter } from 'next/router';
import SidebarLayout from '../layouts/SidebarLayout';
import ProjectItem from './ProjectItem';

interface ProjectSidebarProp {
	projects: ProjectProp[];
	isPage?: boolean;
}

const ProjectSidebar = ({ projects, isPage = false }: ProjectSidebarProp) => {
	const {
		query: { id },
	} = useRouter();

	return (
		<SidebarLayout title="Projects" isPage={isPage}>
			{projects.map(({ name, language }, idx) => (
				<ProjectItem
					active={id == name.toLowerCase().split(' ').join('-')}
					title={name}
					language={language ?? 'Default'}
					key={idx}
				/>
			))}
		</SidebarLayout>
	);
};

export default ProjectSidebar;
