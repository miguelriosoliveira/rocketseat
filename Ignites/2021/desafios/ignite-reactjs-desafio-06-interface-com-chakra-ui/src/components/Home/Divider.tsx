import { Box } from '@chakra-ui/react';

export function Divider() {
	return (
		<Box
			mx="auto"
			w={['60px', '90px']}
			border={['1px', '2px']}
			borderColor="dark.headingsAndText"
			borderRadius="5px"
		/>
	);
}
