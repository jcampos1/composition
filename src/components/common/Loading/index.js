import React from 'react';
import './styles/Loading.css';

class Loading extends React.PureComponent {
	render() {
		return (
			<img
				src="/images/ett-loading.gif" alt="gif loading"
				className="loading position-absolute" />
		)
	}
}

export default Loading;