import React, { Component } from 'react';
import './TextArea.css';

export class TextArea extends Component {
	state = {
		text: this.props.text,
		error: {
			invalidText: false,
			required: false,
		},
		touched: !!this.props.text,
		maxLetterCount: 2000,
		availableCount: 2000 - this.props.text.length,
	};

	handleSubmit = (e) => {
		e.preventDefault();
		if (this.state.text) {
			this.props.changeText(this.state.text);
			this.props.toggleTagCloud(true);
		}
	};

	handleTextChange = (e) => {
		const text = e.target.value;

		this.setState(
			(state) => {
				if (state.availableCount > 0) {
					return {
						text,
						availableCount: state.maxLetterCount - text.length,
					};
				} else {
					return state;
				}
			},
			() => this.handleError(text)
		);
	};

	onHandleBlur = () => {
		this.setState({
			touched: true,
		});
	};

	handleError(text) {
		this.setState((state) => {
			let error = {
				...state.error,
			};

			if (!/[a-zA-Z]/.test(text) && text !== '') {
				error = {
					...error,
					invalidText: true,
				};
			} else {
				error = {
					...error,
					invalidText: false,
				};
			}

			if (text === '') {
				error = {
					...error,
					required: true,
				};
			} else {
				error = {
					...error,
					required: false,
				};
			}
			if (state.availableCount > 0) {
				return {
					error,
				};
			} else {
				return state;
			}
		});
	}

	render() {
		const hasError = Object.keys(this.state.error).some(
			(key) => this.state.error[key]
		);

		return (
			<form className="para-text-form" onSubmit={this.handleSubmit}>
				<div className="input-block">
					<label htmlFor="para-text">Enter Text Paragraph: </label>
					<textarea
						id="para-text"
						className={`text-area ${
							hasError && this.state.touched ? 'is-invalid' : null
						}`}
						placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora enim ducimus asperiores voluptatum autem alias in ipsa placeat! Eaque, cupiditate?..."
						onChange={this.handleTextChange}
						value={this.state.text}
						rows="20"
						cols="20"
						maxLength={this.state.maxLetterCount}
						onBlur={this.onHandleBlur}
					></textarea>
					<p className="word-counter">{this.state.availableCount}</p>
				</div>
				{this.state.error.invalidText && (
					<small className="error-message">
						The text entered doesn't contain any words!
					</small>
				)}
				{this.state.error.required && (
					<small className="error-message">Input is mandatory!</small>
				)}
				<button
					type="submit"
					className="btn btn-primary"
					disabled={hasError || !this.state.touched}
				>
					Generate Tag Cloud
				</button>
			</form>
		);
	}
}

export default TextArea;
