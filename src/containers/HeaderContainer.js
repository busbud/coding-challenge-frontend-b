import React from "react";

export default class HeaderContainer extends React.Component {
  render() {
    const { onClick } = this.props;
    return (
      <div className="top-bar-container">
        <div onClick={onClick}>
          <i className="fa fa-angle-left" />
        </div>
        <div className="language">EN</div>
      </div>
    );
  }
}
