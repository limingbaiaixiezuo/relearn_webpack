// document.write('search page')
'use strict';
import React from "react";
import ReactDOM from "react-dom";
import './search.less';
import logo from './images/logo.png';

class Search extends React.Component {
    render() {
        return <div className="search-text">
            复习 webpack 李春明
            <img src={logo} />
            </div>;
    }
}


ReactDOM.render(
    <Search />,
    document.getElementById('root')
);