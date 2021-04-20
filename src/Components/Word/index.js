import React from 'react';

const getRandomColor = () => {
	const colors = ['#011627', '#e71d36', '#ff9f1c', '#a4161a', '#5a189a'];
	const color = colors[parseInt(Math.random() * colors.length)];
	return color;
};

const getWordStyle = (count, maxCount, minCount) => {
	let fontSize = `${((count - minCount) / (maxCount - minCount)) * 5 + 0.5}rem`;

	const style = {
		fontSize,
		color: getRandomColor(),
		textTransform: count === maxCount ? 'uppercase' : null,
		margin: '0rem 1rem',
	};

	return style;
};

function Word({ value, count, maxCount, minCount }) {
	return <p style={getWordStyle(count, maxCount, minCount)}>{value}</p>;
}

export default Word;
