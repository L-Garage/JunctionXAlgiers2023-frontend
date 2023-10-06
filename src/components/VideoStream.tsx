import React, { useState, useEffect } from 'react';
import OvenPlayer, { OvenPlayerInstance } from 'ovenplayer';

interface Props {
	videoUrl: string;
}

const VideoStream: React.FC<Props> = props => {
	const [player, setPlayer] = useState<OvenPlayerInstance | null>(null);

	useEffect(() => {
		console.log(!props.videoUrl.length);
		if (!props.videoUrl.length) {
			return;
		}

		setPlayer(
			OvenPlayer.create('video', {
				sources: [{ file: props.videoUrl, label: '720p', type: 'webrtc' }],
			})
		);

		return () => {
			!!player && OvenPlayer.removePlayer(player);
		};
	}, [props.videoUrl]);

	return <div id="video"></div>;
};

export default VideoStream;
