import { Element as PolymerElement } from 'polymer/polymer-element';

import 'paper-button/paper-button';
import 'paper-input/paper-input';
import 'paper-input/paper-textarea';
import 'iron-form/iron-form';

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

        .alert-error {
          color: var(--error-color);
        }
      </style>

      <template is="dom-if" if="[[sendingError]]">
        <div class="row error">
          <p class="alert-error">[[sendingError.code]]</p>
        </div>
      </template>

      <iron-form id="form">
        <form>
          <div class="row">
            <paper-input
              auto-validate
              error-message="Notification title is required"
              label="Title"
              name="title"
              required
            />
          </div>

          <div class="row">
            <paper-textarea
              auto-validate
              error-message="Notification message is required"
              label="Message"
              name="body"
              required
            />
          </div>

          <div class="row">
            <paper-input label="Click Action" name="clickAction" />
          </div>

          <div class="row">
            <paper-input label="Icon" name="icon" />
          </div>

          <div class="row">
            <paper-button class="indigo" on-tap="handleSend" disabled$="[[sending]]">Send</paper-button>
          </div>
        </form>
      </iron-form>
    `;
  }

  static get properties() {
    return {
      body: String,
      clickAction: String,
      title: String,

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
    const form = this.$.form;
    if (form.validate()) {
      const { body, clickAction, icon, title } = form.serializeForm();
      const notification = { body, title };

      if (clickAction) {
        notification.clickAction = clickAction;
      }

      if (icon) {
        notification.icon = icon;
      }

      this.dispatch(send(notification));
    }
  }
}

customElements.define('tardis-send-notification', SendNotification);
