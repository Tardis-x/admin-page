import { Element as PolymerElement } from '../node_modules/@polymer/polymer/polymer-element.js'
import '../node_modules/@polymer/app-layout/app-drawer/app-drawer.js'
import '../node_modules/@polymer/app-layout/app-drawer-layout/app-drawer-layout.js'
import '../node_modules/@polymer/app-layout/app-header/app-header.js'
import '../node_modules/@polymer/app-layout/app-header-layout/app-header-layout.js'
import '../node_modules/@polymer/app-layout/app-toolbar/app-toolbar.js'

import './shared-styles.js';

export class TardisApp extends PolymerElement {
  // Define a string template instead of a `<template>` element.
  static get template() {
    return `
      <style include="shared-styles">
        :host {
          
          --primary-color: var(--app-primary-color);
          display: block;
          background-color: var(--primary-background-color);
        }

        app-header {
          color: #fff;
          background-color: var(--primary-color);
        }
        app-header paper-icon-button {
          --paper-icon-button-ink-color: white;
        }
        .avatar {
          width: 32px;
          height: 32px;
          background-size: cover;
          background-repeat: no-repeat;
          background-position: 50% 50%;
          border-radius: 50%;
        }
        .drawer-list {
          margin: 0 20px;
        }
        .drawer-list a {
          display: block;
          padding: 0 16px;
          text-decoration: none;
          color: var(--app-secondary-color);
          line-height: 40px;
        }
        .drawer-list a.iron-selected {
          color: black;
          font-weight: bold;
        }

      </style>
      <app-drawer-layout force-narrow fullbleed>
        <app-drawer swipe-open id="appDrawer" slot="drawer">
          <app-toolbar><div main-title>Tardis X</div></app-toolbar>
          <iron-selector
            selected="[[page]]"
            attr-for-selected="name"
            class="drawer-list"
            role="navigation"
            on-iron-select="closeDrawer"
          >
            <!--<a href="/voter">Voter</a>-->
            <!--<a href="/voter/results">Results</a>-->
            <a href="/speakers" name="speakers">Speakers</a>
            <a href="/organizations" name="organizations">Organizations</a>
          </iron-selector>

        </app-drawer>

        <app-header-layout fullbleed has-scrolling-region>
          <app-header slot="header" fixed>
            <app-toolbar sticky>
              <paper-icon-button icon="menu" drawer-toggle></paper-icon-button>
              <div main-title>Tardis X</div>
              <paper-icon-button
                icon="[[computeLockIcon(user)]]"
                on-tap="signOut">
                <!--disabled="[[!signedIn]]"-->
              </paper-icon-button>
              <span class="avatar" style="background-image: url([[user.photoURL]]);"></span>
            </app-toolbar>
          </app-header>

        </app-header-layout>
      </app-drawer-layout>
    `
  }

  constructor() {
    super();
    this.name = '3.0 preview';
  }

  // properties, observers, etc. are identical to 2.x
  static get properties() {
    name: {
      Type: String
    }
  }
}

customElements.define('tardis-app', TardisApp);
