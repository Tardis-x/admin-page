import { Element as PolymerElement } from 'polymer/polymer-element';

import 'app-route/app-route';
import 'iron-pages/iron-pages';

import './containers/list';
import './containers/organization';

export class Organizations extends PolymerElement {
  static get template() {
    return `
      <app-route
        active="{{routeActive}}"
        route="{{route}}"
        pattern="/:id"
        data="{{routeData}}"></app-route>
      <iron-pages role="main" attr-for-selected="name" selected="[[page]]">		
        <organizations-list name="list"></organizations-list>		
        <organization-page name="organization" key="[[routeData.id]]"></organization-page>
      </iron-pages>
    `
  }

  static get properties() {
    return {
      page: {
        type: String
      },
      route: {
        type: Object
      }
    };
  }

  static get observers() {
    return [
      '_routePageChanged(routeActive)',
    ];
  }

  connectedCallback() {
    super.connectedCallback();
  }

  _routePageChanged(routeActive) {
    this.page = routeActive ? 'organization' : 'list';
  }
}

customElements.define('tardis-organizations', Organizations);
