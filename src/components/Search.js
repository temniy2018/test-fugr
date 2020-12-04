import React, { Component } from "react";
import s from "../styles/Search.module.css";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
  }

  render() {
    return (
      <div className={s.root}>
        <input
          type="text"
          onChange={(e) => this.setState({ value: e.target.value })}
          value={this.state.value}
          className={s.root__input}
        />
        <button
          onClick={() => this.props.onSearch(this.state.value)}
          className={s.root__button}
        >
          Найти
        </button>
      </div>
    );
  }
}

export default Search;
