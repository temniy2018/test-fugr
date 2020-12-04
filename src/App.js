import React, { Component } from "react";
import s from "./App.module.css";
import Table from "./components/Table";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "none",
    };
  }

  render() {
    if (this.state.data === "none") {
      return (
        <div className={s.chooseDataRoot}>
          <div className={s.desktop}>
            <p className={s.chooseDataRoot__header}>Выберите набор данных</p>
            <div className={s.chooseDataRoot_buttons}>
              <button
                className={s.chooseDataRoot_buttons__button}
                onClick={() => {
                  this.setState({ data: "small" });
                }}
              >
                Маленький
              </button>
              <button
                className={s.chooseDataRoot_buttons__button}
                onClick={() => {
                  this.setState({ data: "big" });
                }}
              >
                Большой
              </button>
            </div>
          </div>
          <p className={`${s.chooseDataRoot__header} ${s.mobile}`}>Пожалуйста, переверните телефон</p>
        </div>
      );
    }
    return <Table data={this.state.data} />;
  }
}

export default App;
