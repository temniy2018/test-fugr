import React, { Component } from "react";
import s from "../styles/Add.module.css";

class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdding: false,
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      warning: false,
    };
  }

  render() {
    const { id, firstName, lastName, email, phone } = this.state;

    return (
      <div className={s.root}>
        <button
          onClick={() => this.setState({ isAdding: !this.state.isAdding })}
          className={s.root__isAddButton}
        >
          Добавить
        </button>
        <div
          style={
            this.state.isAdding
              ? { display: "flex", flexDirection: "column" }
              : { display: "none" }
          }
        >
          <div className={s.root_inputRoot}>
            <div className={s.root_inputRoot_inputDiv}>
              <p className={s.root_inputRoot_inputDiv__header}>ID</p>
              <input
                type="text"
                value={this.state.id}
                onChange={(e) => this.setState({ id: e.target.value })}
                className={s.root_inputRoot_inputDiv__input}
              />
            </div>
            <div className={s.root_inputRoot_inputDiv}>
              <p className={s.root_inputRoot_inputDiv__header}>First name</p>
              <input
                type="text"
                value={this.state.firstName}
                onChange={(e) => this.setState({ firstName: e.target.value })}
                className={s.root_inputRoot_inputDiv__input}
              />
            </div>
            <div className={s.root_inputRoot_inputDiv}>
              <p className={s.root_inputRoot_inputDiv__header}>Last name</p>
              <input
                type="text"
                value={this.state.lastName}
                onChange={(e) => this.setState({ lastName: e.target.value })}
                className={s.root_inputRoot_inputDiv__input}
              />
            </div>
            <div className={s.root_inputRoot_inputDiv}>
              <p className={s.root_inputRoot_inputDiv__header}>Email</p>
              <input
                type="text"
                value={this.state.email}
                onChange={(e) => this.setState({ email: e.target.value })}
                className={s.root_inputRoot_inputDiv__input}
              />
            </div>
            <div className={s.root_inputRoot_inputDiv}>
              <p className={s.root_inputRoot_inputDiv__header}>Phone</p>
              <input
                type="text"
                value={this.state.phone}
                onChange={(e) => this.setState({ phone: e.target.value })}
                className={s.root_inputRoot_inputDiv__input}
              />
            </div>
          </div>
          <button
            onClick={() => {
              if (id && firstName && lastName && email && phone) {
                this.setState({ warning: false });
                this.props.onAdd(id, firstName, lastName, email, phone);
              } else {
                this.setState({ warning: true });
              }
            }}
            className={s.root__add}
          >
            Добавить поле
          </button>
          {this.state.warning && (
            <p className={s.root__warning}>
              Пожалуйста, введите корректные данные
            </p>
          )}
        </div>
      </div>
    );
  }
}

export default Add;
