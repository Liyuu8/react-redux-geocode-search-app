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
      <form onSubmit={(event) => this.handleSubmit(event)}>
        <input
          type="text"
          value={this.state.place}
          onChange={(event) => this.handlePlaceChanged(event.target.value)}
        />
        <input type="submit" value="検索" />
      </form>
    );
  }
}

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchForm;
