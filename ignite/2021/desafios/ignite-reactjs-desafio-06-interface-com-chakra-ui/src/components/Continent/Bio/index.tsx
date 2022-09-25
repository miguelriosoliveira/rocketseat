import { Flex, Text } from '@chakra-ui/react';

import { InfoNumber } from './InfoNumber';

interface BioProps {
	description: string;
	numberOfCountries: number;
	numberOfLanguages: number;
	numberOfCitiesInTop100: number;
}

export function Bio({
	description,
	numberOfCountries,
	numberOfLanguages,
	numberOfCitiesInTop100,
}: BioProps) {
	return (
		<Flex
			direction={['column', 'row']}
			w="100%"
			maxW="1160px"
			justify="space-between"
			px={['8', '8', '8', '0']}
		>
			<Text
				maxW="600px"
				lineHeight={['21px', '36px']}
				fontSize={['16px', '24px']}
				textAlign="justify"
			>
				{description}
			</Text>

			<Flex w={['100%', '490px']} align="center" justify="space-between">
				<InfoNumber number={numberOfCountries} text="countries" />
				<InfoNumber number={numberOfLanguages} text="languages" />
				<InfoNumber
					number={numberOfCitiesInTop100}
					text="cities in top 100"
					info="The top 100 most visited cities in the world"
				/>
			</Flex>
		</Flex>
	);
}
