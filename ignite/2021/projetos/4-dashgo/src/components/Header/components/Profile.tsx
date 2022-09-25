import { Avatar, Box, Flex, Text } from '@chakra-ui/react';

interface ProfileProps {
	hideProfileData?: boolean;
}

export function Profile({ hideProfileData = false }: ProfileProps) {
	return (
		<Flex align="center">
			{!hideProfileData && (
				<Box mr="4" textAlign="right">
					<Text>Miguel Rios</Text>
					<Text color="gray.300" fontSize="small">
						miguelriosoliveira@gmail.com
					</Text>
				</Box>
			)}

			<Avatar size="md" name="Miguel Rios" src="https://github.com/miguelriosoliveira.png" />
		</Flex>
	);
}
