import { useState } from 'react';
import { TextArea } from './Components/TextArea';
import { WordCloud } from './Components/WordCloud';

function App() {
	const [paraText, setParaText] = useState('');
	const [showTagCloud, setShowTagCloud] = useState(false);

	return (
		<div className="app-container container">
			{!showTagCloud ? (
				<TextArea
					text={paraText}
					changeText={setParaText}
					toggleTagCloud={setShowTagCloud}
				></TextArea>
			) : (
				<WordCloud text={paraText} toggleTagCloud={setShowTagCloud}></WordCloud>
			)}
		</div>
	);
}

export default App;
