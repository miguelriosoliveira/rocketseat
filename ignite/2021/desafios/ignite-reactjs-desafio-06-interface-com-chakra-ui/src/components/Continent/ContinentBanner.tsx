import { Flex, Heading } from '@chakra-ui/react';

interface ContinentBannerProps {
	name: string;
	imageUrl: string;
}

export function ContinentBanner({ name, imageUrl }: ContinentBannerProps) {
	return (
		<Flex
			h={['150px', '500px']}
			w="100%"
			bgImage={`linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${imageUrl}')`}
			bgPos="center"
			align={['center', 'flex-end']}
			px="8"
		>
			<Heading
				as="h1"
				fontSize={['28px', '48px']}
				fontWeight="semibold"
				textAlign={['center', 'initial']}
				color="light.headingsAndText"
				w="100%"
				maxW="1160px"
				mx="auto"
				mb={['0', '16']}
			>
				{name}
			</Heading>
		</Flex>
	);
}
