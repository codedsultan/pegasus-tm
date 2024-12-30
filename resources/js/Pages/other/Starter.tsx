// components

import { PageBreadcrumb } from '../../components'
import VerticalLayout from '../../layouts/Vertical';
const StarterPages = () => {
    const props: any = {
        title: 'Starter Page',
        description: 'Attex React is a free and open-source admin dashboard template built with React and Tailwind CSS. It is designed to be easily customizable and includes a wide range of features and components to help you build your own dashboard quickly and efficiently.',
    }
	return (
		<>
            <VerticalLayout {...props}>
			    <PageBreadcrumb title="Starter Page" subName="Pages" />
            </VerticalLayout>
		</>
	)
}

export default StarterPages
