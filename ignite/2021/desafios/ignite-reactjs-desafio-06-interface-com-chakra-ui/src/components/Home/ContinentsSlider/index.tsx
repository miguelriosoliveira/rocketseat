import { Box } from '@chakra-ui/react';
import SwiperCore, { EffectFade, Navigation, Pagination } from 'swiper/core';
import { Swiper, SwiperSlide } from 'swiper/react';

import { SlideImage } from './SlideImage';

SwiperCore.use([EffectFade, Navigation, Pagination]);

export function ContinentsSlider() {
	return (
		<Box maxW="1240px" h="450px" mx="auto" mb="10">
			<Swiper
				slidesPerView={1}
				spaceBetween={30}
				loop
				navigation
				pagination={{ clickable: true }}
				effect="fade"
			>
				<SwiperSlide>
					<SlideImage
						imageSrc="assets/continents/asia.jpeg"
						href="/asia"
						title="Asia"
						subtitle="The largest one"
					/>
				</SwiperSlide>

				<SwiperSlide>
					<SlideImage
						imageSrc="assets/continents/africa.jpeg"
						href="/africa"
						title="Africa"
						subtitle="The Cradle of Humankind"
					/>
				</SwiperSlide>

				<SwiperSlide>
					<SlideImage
						imageSrc="assets/continents/north-america.jpeg"
						href="/north-america"
						title="North America"
						subtitle="A place of opportunities"
					/>
				</SwiperSlide>

				<SwiperSlide>
					<SlideImage
						imageSrc="assets/continents/south-america.jpeg"
						href="/south-america"
						title="South America"
						subtitle="Rich fauna and flora"
					/>
				</SwiperSlide>

				<SwiperSlide>
					<SlideImage
						imageSrc="assets/continents/europe.jpeg"
						href="/europe"
						title="Europe"
						subtitle="The oldest one"
					/>
				</SwiperSlide>

				<SwiperSlide>
					<SlideImage
						imageSrc="assets/continents/oceania.jpeg"
						href="/oceania"
						title="Oceania"
						subtitle="The New World"
					/>
				</SwiperSlide>
			</Swiper>
		</Box>
	);
}
