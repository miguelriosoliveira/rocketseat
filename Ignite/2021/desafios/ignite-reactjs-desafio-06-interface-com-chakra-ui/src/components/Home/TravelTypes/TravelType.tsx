import { Box, Flex, Image, Text, useBreakpointValue } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface TravelTypeProps {
	image?: ReactNode;
	caption: string;
}

export function TravelType({ image, caption }: TravelTypeProps) {
	const isMobileScreen = useBreakpointValue({ base: true, sm: false });

	if (isMobileScreen) {
		return (
			<Flex align="baseline">
				<Image src="assets/ellipse.png" alt="Bullet point" mr="2" />
				<Text mt="6" fontWeight="600">
					{caption}
				</Text>
			</Flex>
		);
	}

	return (
		<Box align="center">
			{image}
			<Text mt="6" fontWeight="600">
				{caption}
			</Text>
		</Box>
	);
}
