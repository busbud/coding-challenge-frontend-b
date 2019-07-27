const SearchForm = props => (
  <form onSubmit={props.handleSubmit}>
    <label htmlFor="origin">Leaving from</label>
    <input
      id="origin"
      name="origin"
      onChange={props.handleInputChange}
      type="text"
      value={props.origin}
    />
    <label htmlFor="destination">Going to</label>
    <input
      id="destination"
      name="destination"
      onChange={props.handleInputChange}
      type="text"
      value={props.destination}
    />
    <label htmlFor="outbound_date">Date</label>
    <input
      id="outbound_date"
      name="outbound_date"
      onChange={props.handleInputChange}
      type="text"
      value={props.outbound_date}
    />
    <input type="submit" value="Search" />
  </form>
);

export default SearchForm;