var React = require('react');
var PropTypes = require('prop-types');

function SelectLanguage (props) {
	var languages = ['en', 'fr'];

	return (
		<ul className='languages'>
			{languages.map(function (lang) {
				return (
					<li
						style={lang === props.selectedLanguage ?
							{color: '#D0021B'} : null}
						/** Using .bind onClick event so we can pass a 
						* specific language. First arg is null beacause
						* we have already bound *this* to it
						**/
						onClick={props.onSelect.bind(null, lang)}
						key={lang}>
						{lang === 'en'
							? <img 
									src={require('../images/usa_flag.svg.png')} 
									alt='french language'/>
							: <img 
									src={require('../images/fra_flag.svg.png')} 
									alt='french language'/>
						}
					</li>
				);
			})}
		</ul>
	);
}

SelectLanguage.propTypes = {
	selectedLanguage: PropTypes.string.isRequired,
	onSelect: PropTypes.func.isRequired
};

module.exports = SelectLanguage;