import React from 'react';

const SearchSuggestions = (props) => {
  const options = props.coins.map((coin,idx) => {
    return <li key={idx}>{coin.currency}</li>
  })

  return <ul>{options}</ul>
}

export default SearchSuggestions;
