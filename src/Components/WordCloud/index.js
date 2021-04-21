import React, { Component } from 'react';
import Word from '../Word';
import './WordCloud.css';

export class WordCloud extends Component {
	state = {
		frequencies: [],
		maxCount: 0,
		minCount: 0,
	};

	componentDidMount() {
		const freqCount = {};
		const ignoreWords = [
			'and',
			'or',
			'in',
			'the',
			'a',
			'as',
			'by',
			'for',
			'not',
			'in',
			'what',
			'when',
			'is',
			'it',
			'much',
			'why',
			'with',
			'between',
			'all',
			'any',
			'of',
			'on',
			'that',
			'to',
			'you',
			'your',
			'if',
			'it',
		];

		this.props.text
			.replace(/[^a-zA-Z/\n -]/g, '')
			.split('\n')
			.map((sentence) => sentence.split(' '))
			.reduce((acc, curr) => {
				return [...acc, ...curr];
			}, [])
			.filter((word) => !!word)
			.map((word) => word.toLowerCase())
			.filter((word) => !ignoreWords.includes(word))
			.forEach((word) => {
				if (freqCount[word] === undefined) {
					freqCount[word] = 1;
				} else {
					freqCount[word] += 1;
				}
			});

		const freqMapping = Object.keys(freqCount)
			.map((key) => ({
				value: key,
				count: freqCount[key],
			}))
			.sort((a, b) => a.count - b.count);

		if (Object.keys(freqCount).length !== 0) {
			this.setState({
				frequencies: this.normalizedMapping(freqMapping.slice()),
				maxCount: freqMapping[freqMapping.length - 1].count,
				minCount: freqMapping[0].count,
			});
		}
	}

	normalizedMapping(mapping) {
		if (mapping.length === 0) {
			return [];
		}

		let normalizedMapping = [];

		normalizedMapping.push(mapping.pop());

		while (mapping.length && normalizedMapping.length < 50) {
			normalizedMapping[mapping.length % 2 === 0 ? 'push' : 'unshift'](
				mapping.pop()
			);
		}

		return normalizedMapping;
	}

	onHandleToggleTagCloud = () => {
		this.props.toggleTagCloud(false);
	};

	renderWords() {
		return this.state.frequencies.map((wordMap, index) => (
			<li key={index}>
				<Word
					value={wordMap.value}
					count={wordMap.count}
					maxCount={this.state.maxCount}
					minCount={this.state.minCount}
					totalCount={this.state.frequencies.length}
				></Word>
			</li>
		));
	}

	render() {
		return (
			<div className="word-cloud-container">
				{this.state.frequencies.length > 0 ? (
					<ul className="word-cloud-list">{this.renderWords()}</ul>
				) : (
					<p className="error-message">
						Ooops! Looks like the text entered doesn't contain any words.
						Please, go back and enter valid text.
					</p>
				)}
				<div className="btn-container">
					<button
						onClick={this.onHandleToggleTagCloud}
						className="btn btn-primary"
					>
						Back
					</button>
				</div>
			</div>
		);
	}
}

export default WordCloud;
