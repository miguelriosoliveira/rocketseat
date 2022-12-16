import { Flex, FlexProps, Image, useBreakpointValue } from '@chakra-ui/react';

import { TravelType } from './TravelType';

type TravelTypesProps = FlexProps;

export function TravelTypes(props: TravelTypesProps) {
	const isMobileScreen = useBreakpointValue({ base: true, sm: false });

	if (isMobileScreen) {
		return (
			<>
				<Flex {...props} maxW="1160px" mx="auto" px="16" justify="space-between">
					<TravelType
						image={<Image src="assets/travel_types/cocktail.png" alt="Cocktail" />}
						caption="night life"
					/>
					<TravelType
						image={<Image src="assets/travel_types/beach.png" alt="Beach" />}
						caption="beach"
					/>
				</Flex>

				<Flex {...props} maxW="1160px" mx="auto" px="16" justify="space-between">
					<TravelType
						image={<Image src="assets/travel_types/building.png" alt="Building" />}
						caption="modern"
					/>
					<TravelType
						image={<Image src="assets/travel_types/museum.png" alt="Museum" />}
						caption="classic"
					/>
				</Flex>

				<Flex {...props} maxW="1160px" mx="auto" mb="10" px="16" justify="center">
					<TravelType
						image={<Image src="assets/travel_types/earth.png" alt="Earth" />}
						caption="and more..."
					/>
				</Flex>
			</>
		);
	}

	return (
		<Flex {...props} maxW="1160px" mx="auto" px="8" justify="space-between">
			<TravelType
				image={<Image src="assets/travel_types/cocktail.png" alt="Cocktail" />}
				caption="night life"
			/>
			<TravelType
				image={<Image src="assets/travel_types/beach.png" alt="Beach" />}
				caption="beach"
			/>
			<TravelType
				image={<Image src="assets/travel_types/building.png" alt="Building" />}
				caption="modern"
			/>
			<TravelType
				image={<Image src="assets/travel_types/museum.png" alt="Museum" />}
				caption="classic"
			/>
			<TravelType
				image={<Image src="assets/travel_types/earth.png" alt="Earth" />}
				caption="and more..."
			/>
		</Flex>
	);
}
