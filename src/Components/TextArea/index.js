import React, { Component } from 'react';
import './TextArea.css';

export class TextArea extends Component {
	state = {
		text: this.props.text,
	};

	handleSubmit = (e) => {
		e.preventDefault();
		if (this.state.text) {
			this.props.changeText(this.state.text);
			this.props.toggleTagCloud(true);
		}
	};

	handleTextChange = (e) => {
		this.setState({
			text: e.target.value,
		});
	};

	render() {
		return (
			<form className="para-text-form" onSubmit={this.handleSubmit}>
				<label htmlFor="para-text">Enter Text Paragraph: </label>
				<textarea
					id="para-text"
					className="text-area"
					placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora enim ducimus asperiores voluptatum autem alias in ipsa placeat! Eaque, cupiditate?..."
					onChange={this.handleTextChange}
					value={this.state.text}
					rows="20"
					cols="20"
				></textarea>
				<button
					type="submit"
					className="btn btn-primary"
					disabled={!this.state.text}
				>
					Generate Tag Cloud
				</button>
			</form>
		);
	}
}

export default TextArea;
