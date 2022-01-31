import React from "react";

class Like extends React.Component {
  render() {
    let classes = "fa fa-heart";
    if (!this.props.liked) classes += "-o";
    return (
      <div>
        <i
          onClick={this.props.onClick}
          className={classes}
          style={{ cursor: "pointer" }}
        ></i>
      </div>
    );
  }
}

export default Like;
