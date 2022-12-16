import { Box, Flex, Heading, Image, SimpleGrid, Text } from '@chakra-ui/react';

export interface City {
	name: string;
	country: string;
	image_url: string;
	country_flag_url: string;
}

interface CitiesProps {
	top5: City[];
}

export function Cities({ top5 }: CitiesProps) {
	return (
		<Box w={['100%', 'auto']} px={['8', '8', '8', '0']}>
			<Heading fontWeight="medium" fontSize={['24px', '36px']} lineHeight={['36px', '54px']} mb="8">
				Cities in the 100
			</Heading>
			<SimpleGrid columns={[1, 4]} spacing={5}>
				{top5.map(city => (
					<Box
						key={city.name}
						h="280"
						border="1px"
						borderColor="highlight"
						borderRadius="4px"
						bg="light.white"
					>
						<Image src={city.image_url} alt={city.name} h="173" w="100%" objectFit="cover" />
						<Flex justify="space-between" align="center" p="6">
							<Box>
								<Text fontSize="20" fontWeight="semibold" lineHeight="25px">
									{city.name}
								</Text>
								<Text fontWeight="500" color="dark.info" lineHeight="26px">
									{city.country}
								</Text>
							</Box>

							<Image src={city.country_flag_url} alt={city.country} />
						</Flex>
					</Box>
				))}
			</SimpleGrid>
		</Box>
	);
}
