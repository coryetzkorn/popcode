"use strict";

var React = require('react');
var i18n = require('i18next-client');

var LibraryPicker = require('./LibraryPicker.jsx');
var ProjectActions = require('../actions/ProjectActions');
var ProjectList = require('./ProjectList.jsx');

var Toolbar = React.createClass({
  getInitialState: function() {
    return {open: false};
  },

  render: function() {
    var toolbarItemsClasses = ['toolbar-menu'];
    if (this.state.open) {
      toolbarItemsClasses.push('toolbar-menu--open');
    } else {
      toolbarItemsClasses.push('toolbar-menu--closed');
    }

    return (
      <div className="toolbar">
        <div
          className="toolbar-showHide"
          onClick={this._toggleShowHideState}>

          {this._showHideLabel()}
        </div>
        <ul className={toolbarItemsClasses.join(' ')}>
          <li onClick={this._newProject}
            className='toolbar-menu-item'>{i18n.t('toolbar.new-project')}</li>
          <li onClick={this._loadProject}
            className={this.state.submenu === 'loadProject' ?
              'toolbar-menu-item toolbar-menu-item--active' :
              'toolbar-menu-item'}>
            {i18n.t('toolbar.load-project')}
          </li>
          <li onClick={this._toggleLibraryPicker}
            className={this.state.submenu === 'libraries' ?
              'toolbar-menu-item toolbar-menu-item--active' :
              'toolbar-menu-item'}>
            {i18n.t('toolbar.libraries')}
          </li>
        </ul>
        {this._getSubmenu()}
      </div>
    );
  },

  _close: function() {
    this.setState({open: false, submenu: null});
  },

  _newProject: function() {
    this._close();
    ProjectActions.create();
  },

  _loadProject: function() {
    this.setState({submenu: 'loadProject'});
  },

  _showHideLabel: function() {
    if (this.state.open) {
      return i18n.t("toolbar.hide");
    } else {
      return i18n.t("toolbar.show");
    }
  },

  _toggleLibraryPicker: function() {
    return this.setState(function(oldState) {
      if (oldState.submenu === 'libraries') {
        return {submenu: null};
      } else {
        return {submenu: 'libraries'};
      }
    });
  },

  _getSubmenu: function() {
    switch(this.state.submenu) {
      case 'libraries':
        return <LibraryPicker projectKey={this.props.projectKey} />;
      case 'loadProject':
        return <ProjectList onProjectSelected={this._close} />;
    }
  },

  _toggleShowHideState: function() {
    this.setState(function(oldState) {
      if (oldState.open) {
        return {open: false, submenu: null};
      } else {
        return {open: true};
      }
    });
  }
});

module.exports = Toolbar;
