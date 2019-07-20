import React from "react";

export default class HeaderContainer extends React.Component {
  onClickBack = () => {
    this.props.history.goBack();
    // console.log(this.props);
  };

  render() {
    const {
      location: { pathname }
    } = this.props;
    console.log(this.props);
    return (
      <div className="top-bar-container">
        {pathname !== "/" && (
          <div onClick={this.onClickBack}>
            <i className="fa fa-angle-left" />
          </div>
        )}
        <div className="language">EN</div>
      </div>
    );
  }
}
