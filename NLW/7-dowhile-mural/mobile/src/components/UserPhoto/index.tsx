import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image } from 'react-native';

import emptyAvatarImg from '../../assets/avatar.png';
import { COLORS } from '../../theme';

import { styles } from './styles';

interface UserPhotoProps {
	imageUri?: string;
	size?: 'small' | 'regular';
}

const SIZES = {
	small: {
		containerSize: 32,
		avatarSize: 28,
	},
	regular: {
		containerSize: 48,
		avatarSize: 42,
	},
};

const EMPTY_AVATAR_URI = Image.resolveAssetSource(emptyAvatarImg).uri;

export function UserPhoto({ imageUri, size = 'small' }: UserPhotoProps) {
	const { containerSize, avatarSize } = SIZES[size];

	return (
		<LinearGradient
			colors={[COLORS.PINK, COLORS.YELLOW]}
			start={{ x: 0, y: 0.8 }}
			end={{ x: 0.9, y: 1 }}
			style={[
				styles.container,
				{
					width: containerSize,
					height: containerSize,
					borderRadius: containerSize / 2,
				},
			]}
		>
			<Image
				source={{ uri: imageUri || EMPTY_AVATAR_URI }}
				style={[
					styles.avatar,
					{
						width: avatarSize,
						height: avatarSize,
						borderRadius: avatarSize / 2,
					},
				]}
			/>
		</LinearGradient>
	);
}
