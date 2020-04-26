import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      place: '東京タワー',
    };
  }

  handlePlaceChanged(place) {
    this.setState({ place });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.place);
  }

  render() {
    return (
      <form
        className="search-form"
        onSubmit={(event) => this.handleSubmit(event)}
      >
        <input
          className="place-input"
          type="text"
          size="30"
          value={this.state.place}
          onChange={(event) => this.handlePlaceChanged(event.target.value)}
        />
        <input className="submit-button" type="submit" value="検索" />
      </form>
    );
  }
}

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchForm;
