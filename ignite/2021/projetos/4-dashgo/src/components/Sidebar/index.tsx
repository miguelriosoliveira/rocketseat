import {
	Box,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	useBreakpointValue,
} from '@chakra-ui/react';

import { useSidebarDrawer } from '../../contexts';

import { SidebarNav } from './components/SidebarNav';

export function Sidebar() {
	const isDrawerSidebar = useBreakpointValue({ base: true, lg: false });
	const { isOpen, onClose } = useSidebarDrawer();

	if (isDrawerSidebar) {
		return (
			<Drawer isOpen={isOpen} placement="left" onClose={onClose}>
				<DrawerOverlay>
					<DrawerContent bg="gray.800" p="4">
						<DrawerCloseButton mt="5" />

						<DrawerHeader>Navigation</DrawerHeader>

						<DrawerBody>
							<SidebarNav />
						</DrawerBody>
					</DrawerContent>
				</DrawerOverlay>
			</Drawer>
		);
	}

	return (
		<Box as="aside" w="64" mr="8">
			<SidebarNav />
		</Box>
	);
}
