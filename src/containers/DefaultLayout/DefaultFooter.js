import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultFooter extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <span><a href="https://ctt-daotao.hust.edu.vn/">HUST</a> &copy; {new Date().getFullYear()} Ha Noi University of Science and Technology</span>
        <span className="ml-auto">Powered by <a href="http://set.hust.edu.vn/">HUST - SET</a></span>
      </React.Fragment>
    );
  }
}

DefaultFooter.propTypes = propTypes;
DefaultFooter.defaultProps = defaultProps;

export default DefaultFooter;
