import React, { Component } from "react";
import _ from "lodash"; //Поможет отсортировать данные
import Item from "./Item";
import Search from "./Search";
import Add from "./Add";
import s from "../styles/Table.module.css";

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchData: [],
      pagesCount: 0,
      currentPage: 1,
      loading: true,
      sort: "id",
      sortType: "asc", //desc
      item: null,
      search: "",
    };
    this.data = [];
  }

  componentDidMount() {
    if (this.props.data === "small") {
      this.getData(
        "http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}"
      );
    } else {
      this.getData(
        "http://www.filltext.com/?rows=1000&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&delay=3&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D"
      );
    }
  }

  getData = async (url) => {
    const responce = await fetch(url);
    const json = await responce.json();
    this.data = _.orderBy(json, this.state.sort, this.state.sortType);
    this.setState(
      {
        searchData: this.data,
        loading: false,
      },
      () => {
        this.setState({ pagesCount: Math.ceil(this.data.length / 50) });
      }
    );
  };

  onSort = (sort) => {
    const cloneData = this.state.searchData.concat();
    const sortType = this.state.sortType === "asc" ? "desc" : "asc";
    const searchData = _.orderBy(cloneData, sort, sortType);

    this.setState({
      searchData,
      sort,
      sortType,
    });
  };

  onSearch = (value) => {
    this.setState({ search: value, currentPage: 1 }, () => {
      this.getFilteredData();
    });
  };

  getFilteredData() {
    const { search } = this.state;

    if (!search) {
      this.setState({
        searchData: _.orderBy(this.data, this.state.sort, this.state.sortType),
        pagesCount: Math.ceil(this.data.length / 50),
      });
    } else {
      const newData = this.data.filter((item) => {
        return (
          item["firstName"].toLowerCase().includes(search.toLowerCase()) ||
          item["lastName"].toLowerCase().includes(search.toLowerCase()) ||
          item["email"].toLowerCase().includes(search.toLowerCase()) ||
          item["phone"].includes(search)
        );
      });
      this.setState(
        {
          searchData: _.orderBy(newData, this.state.sort, this.state.sortType),
        },
        () => {
          this.setState({
            pagesCount: Math.ceil(this.state.searchData.length / 50),
          });
        }
      );
    }
  }

  onAdd = (id, firstName, lastName, email, phone) => {
    this.data = [
      {
        id,
        firstName,
        lastName,
        email,
        phone,
      },
      ...this.data,
    ];
    this.setState({ searchData: this.data });
    this.getFilteredData();
  };

  render() {
    if (this.state.loading) {
      return (
        <div className={s.loaderRoot}>
          <div className={s.ldsRoller}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      );
    }

    return (
      <div className={s.table_root}>
        <div className={s.table}>
          <Add onAdd={this.onAdd} />
          <Search onSearch={this.onSearch} />
          <table className={s.table_table}>
            <thead>
              <tr>
                <th className={s.table_thHead} onClick={() => this.onSort("id")}>
                  ID
                  {this.state.sort === "id" && (
                    <span>
                      {this.state.sortType === "asc" ? (
                        <small>▲</small>
                      ) : (
                        <small>▼</small>
                      )}
                    </span>
                  )}
                </th>
                <th
                  className={s.table_thHead}
                  onClick={() => this.onSort("firstName")}
                >
                  First name
                  {this.state.sort === "firstName" && (
                    <span>
                      {this.state.sortType === "asc" ? (
                        <small>▲</small>
                      ) : (
                        <small>▼</small>
                      )}
                    </span>
                  )}
                </th>
                <th
                  className={s.table_thHead}
                  onClick={() => this.onSort("lastName")}
                >
                  Last name
                  {this.state.sort === "lastName" && (
                    <span>
                      {this.state.sortType === "asc" ? (
                        <small>▲</small>
                      ) : (
                        <small>▼</small>
                      )}
                    </span>
                  )}
                </th>
                <th className={s.table_thHead} onClick={() => this.onSort("email")}>
                  Email
                  {this.state.sort === "email" && (
                    <span>
                      {this.state.sortType === "asc" ? (
                        <small>▲</small>
                      ) : (
                        <small>▼</small>
                      )}
                    </span>
                  )}
                </th>
                <th className={s.table_thHead} onClick={() => this.onSort("phone")}>
                  Phone
                  {this.state.sort === "phone" && (
                    <span>
                      {this.state.sortType === "asc" ? (
                        <small>▲</small>
                      ) : (
                        <small>▼</small>
                      )}
                    </span>
                  )}
                </th>
              </tr>
            </thead>
            <tbody>
              {this.state.searchData
                .filter(
                  (el, i) =>
                    (i < this.state.currentPage * 50 &&
                      i > (this.state.currentPage - 1) * 50) ||
                    this.state.pagesCount === 1
                )
                .map((el) => (
                  <tr
                    key={el.id + el.phone}
                    onClick={() => this.setState({ item: el })}
                  >
                    <th className={s.table_th}>{el.id}</th>
                    <th className={s.table_th}>{el.firstName}</th>
                    <th className={s.table_th}>{el.lastName}</th>
                    <th className={s.table_th}>{el.email}</th>
                    <th className={s.table_th}>{el.phone}</th>
                  </tr>
                ))}
            </tbody>
          </table>
          {this.state.pagesCount > 1 && (
            <div>
              {this.state.currentPage > 1 && (
                <span
                  onClick={() =>
                    this.setState({ currentPage: this.state.currentPage - 1 })
                  }
                  className={s.table__arrow}
                >
                  &lt;
                </span>
              )}
              {this.state.currentPage === this.state.pagesCount && (
                <React.Fragment>
                  <span onClick={() => this.setState({ currentPage: 1 })} className={s.table__navPage}>
                    1
                  </span>
                  <span className={s.black}>...</span>
                </React.Fragment>
              )}
              {this.state.currentPage > 1 && (
                <span
                  onClick={() =>
                    this.setState({ currentPage: this.state.currentPage - 1 })
                  }
                  className={s.table__navPage}
                >
                  {this.state.currentPage - 1}
                </span>
              )}
              <span className={s.black}>{this.state.currentPage}</span>
              {this.state.currentPage < this.state.pagesCount - 1 && (
                <span
                  onClick={() =>
                    this.setState({ currentPage: this.state.currentPage + 1 })
                  }
                  className={s.table__navPage}
                >
                  {this.state.currentPage + 1}
                </span>
              )}
              {this.state.currentPage < this.state.pagesCount - 1 && (
                <span className={s.black}>...</span>
              )}
              {this.state.currentPage < this.state.pagesCount && (
                <span
                  onClick={() =>
                    this.setState({ currentPage: this.state.pagesCount })
                  }
                  className={s.table__navPage}
                >
                  {this.state.pagesCount}
                </span>
              )}
              {this.state.currentPage < this.state.pagesCount && (
                <span
                  onClick={() =>
                    this.setState({ currentPage: this.state.currentPage + 1 })
                  }
                  className={s.table__arrow}
                >
                  &gt;
                </span>
              )}
            </div>
          )}
          {this.state.item && <Item item={this.state.item} />}
        </div>
      </div>
    );
  }
}

export default Table;
