import React, { useRef, useEffect } from 'react';
import OvenPlayer from 'ovenplayer';

interface Props {
	videoUrl: string;
}

const VideoStream: React.FC<Props> = props => {
	useEffect(() => {
		OvenPlayer.create('video', {
			sources: [{ file: props.videoUrl, label: '720p', type: 'webrtc' }],
		});
	}, []);

	return <div id="video"></div>;
};

export default VideoStream;
