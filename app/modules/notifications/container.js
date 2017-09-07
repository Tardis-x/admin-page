import { Element as PolymerElement } from 'polymer/polymer-element';

import 'iron-icons/iron-icons';
import 'iron-icon/iron-icon';
import 'paper-button/paper-button';
import 'paper-progress/paper-progress';
import 'paper-input/paper-input';
import 'paper-input/paper-textarea';

import ReduxMixin from 'store';
import 'shared-styles';
import { send } from './actions';
import { selectSending, selectSendingError } from './selectors';

export class SendNotification extends ReduxMixin(PolymerElement) {
  static get template() {
    return `
      <style>
        :host {
          display: block;
          padding: 24px;
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
        <paper-input label="Title" value="{{title}}"></paper-input>
      </div>

      <div class="row">
        <paper-textarea label="Message" value="{{body}}"></paper-textarea>
      </div>

      <div class="row">
        <paper-button class="indigo" on-tap="handleSend" disabled$="[[sending]]">Send</paper-button>
      </div>
    `;
  }

  static get properties() {
    return {
      title: String,
      body: String,
      sending: {
        type: Boolean,
        statePath: selectSending,
      },
      sendingError: {
        statePath: selectSendingError,
      },
    };
  }

  handleSend () {
    const { body, title } = this;
    this.dispatch(send({ body, title }));
  }
}

customElements.define('tardis-send-notification', SendNotification);
