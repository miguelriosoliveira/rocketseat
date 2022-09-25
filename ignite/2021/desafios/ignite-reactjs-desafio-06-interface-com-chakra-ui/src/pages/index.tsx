import {
	HomeBanner,
	CallToAction,
	ContinentsSlider,
	Divider,
	TravelTypes,
} from '../components/Home';

export default function Home() {
	return (
		<>
			<HomeBanner />
			<TravelTypes my={['4', '20']} />
			<Divider />
			<CallToAction my="14" />
			<ContinentsSlider />
		</>
	);
}
