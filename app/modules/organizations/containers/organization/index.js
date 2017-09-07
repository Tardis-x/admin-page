import { Element as PolymerElement } from 'polymer/polymer-element';

import 'iron-flex-layout/iron-flex-layout-classes';

import 'iron-icons/iron-icons';
import 'iron-icon/iron-icon';
import 'paper-button/paper-button';
import 'paper-progress/paper-progress';
import 'paper-input/paper-input';

import ReduxMixin from 'store';
import 'shared-styles';

import {
  fetchOrganization,
  updateOrganization,
  uploadLogo,
} from '../../actions';
import {
  selectOrganization,
  selectOrganizationLogoUploading,
} from '../../selectors';

export class Organization extends ReduxMixin(PolymerElement) {
  static get template() {
    return `
      <style>
        :host {
          display: block;
          padding: 24px;
        }

        .logo img {
          cursor: pointer;
        }

        .logo paper-progress {
          width: 100%;
        }

        #logoFile {
          display: none;
        }
        paper-button.indigo {
          background-color: var(--app-primary-color);
          color: white;
          --paper-button-raised-keyboard-focus: {
            background-color: var(--paper-pink-a200) !important;
            color: white !important;
          };
        }

        paper-button[disabled] {
          background: #eaeaea;
        }

        paper-progress {
          --paper-progress-active-color: var(--google-blue-500);
        }

        .row *:first-child{
          margin-left: 0;
        }

        .row *:last-child{
          margin-right: 0;
        }
      </style>

      <div class="row">
        <paper-button icon="icons:save" on-tap="handleSave">Save</paper-button>
      </div>

      <div class="row">
        <paper-input label="Name" value="{{data.name}}"></paper-input>
      </div>

      <div class="row">
        <div class="logo">
          <img height="100" src="[[data.logoUrl]]"  />

          <template is="dom-if" if="[[logoUploading]]">
            <paper-progress indeterminate></paper-progress>
          </template>
        </div>
        <input type="file" id="logoFile" on-change="handleFile" accept="image/png,image/jpeg,image/svg+xml">
      </div>

      <div class="row">
        <paper-button class="indigo" on-tap="handleChangeLogo" disabled$="[[isNew(key)]]">Change Logo</paper-button>
      </div>

      <div class="row">
        <paper-input label="Company URL" value="{{data.url}}"></paper-input>
      </div>
    `;
  }

  static get properties() {
    return {
      data: {
        type: Object,
        value: {}
      },
      key: {
        type: String
      },
      organization: {
        type: Object,
        statePath: selectOrganization,
      },
      logoUploading: {
        type: Boolean,
        statePath: selectOrganizationLogoUploading,
      }
    };
  }

  static get observers() {
    return [
      '_keyChanged(key)',
      '_dataChanged(organization)',
    ];
  }

  _dataChanged (organization) {
    this.data = Object.assign({}, organization);
    this.$.logoFile.value = null;
  }

  _keyChanged (key) {
    if (!this.isNew(key)) {
      this.dispatch(fetchOrganization(key));
    } else {
      this.data = {};
    }
  }

  isNew(key) {
    return key === 'new';
  }

  handleSave () {
    if (!this.isNew(this.key)) {
      this.dispatch(updateOrganization(this.key, this.data));
    } else {
      this.dispatch(createOrganization(this.data));
    }
  }

  handleChangeLogo () {
    this.$.logoFile.click();
  }

  handleFile (ev) {
    if (ev.target && ev.target.files.length) {
      const file = ev.target.files[0];
      this.dispatch(uploadLogo(this.key, file));
    }
  }
}

customElements.define('organization-page', Organization);
