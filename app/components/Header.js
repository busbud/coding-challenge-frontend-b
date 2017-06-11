var React = require('react');

// Stateless Functional component - since it only has a render method
function Header () {
	return (
		<header className='title'>
			<img 
				src={require('../images/osheaga_logo.png')}
				alt='Osheaga Logo'
			/>
		</header>
	);
}

module.exports = Header;