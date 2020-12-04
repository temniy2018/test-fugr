import React, { Component } from "react";
import s from "../styles/Item.module.css";

class Item extends Component {
  render() {
    return (
      <article className={s.root}>
        <h2 className={s.root__header}>
          Выбран пользователь{" "}
          <b className={s.weighty}>
            {this.props.item.firstName} {this.props.item.lastName}
          </b>
        </h2>
        <p className={s.root__defaultMainText}>Описание:</p>
        <p className={s.grey}>{this.props.item.description}</p>
        <p className={s.root__defaultMainText}>Адрес проживания: </p>
        <p className={s.grey}>
          <b>{this.props.item.address.streetAddress}</b>
        </p>
        <p className={s.root__defaultMainText}>Город:</p>
        <p className={s.grey}>
          <b>{this.props.item.address.city}</b>
        </p>
        <p className={s.root__defaultMainText}>Провинция/штат:</p>
        <p className={s.grey}>
          <b>{this.props.item.address.state}</b>
        </p>
        <p className={s.root__defaultMainText}>Индекс:</p>
        <p className={s.grey}>
          <b>{this.props.item.address.zip}</b>
        </p>
      </article>
    );
  }
}

export default Item;
