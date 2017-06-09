var React = require('react');

// Stateless Functional component - since it only has a render method
function Header () {
	return (
		<header className='title'>
			<img 
				src='https://cloud.githubusercontent.com/assets/1574577/12971188/13471bd0-d066-11e5-8729-f0ca5375752e.png'
				alt='Osheaga Logo'
			/>
		</header>
	);
}

module.exports = Header;