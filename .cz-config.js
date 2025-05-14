'use strict';

module.exports = {
  types: [
    { value: 'Add', name: 'Add:      Adding a new feature' },
    { value: 'Fix', name: 'Fix:      Fixing a bug' },
    { value: 'Update', name: 'Update:    Making non-breaking changes' },
    { value: 'Refactor', name: 'Refactor:  Code change without changing functionality' },
    { value: 'Docs', name: 'Docs:     Documentation only changes' },
    { value: 'Style', name: 'Style:    Changes that do not affect the meaning of the code' },
    { value: 'Test', name: 'Test:     Adding or updating tests' },
    { value: 'Build', name: 'Build:    Changes to build process or tooling' },
    { value: 'CI', name: 'CI:       Changes to CI configuration' },
    { value: 'Chore', name: 'Chore:    Other changes that don\'t modify src or test files' }
  ],

  scopes: [],

  allowTicketNumber: false,
  isTicketNumberRequired: false,
  ticketNumberPrefix: 'TICKET-',
  ticketNumberRegExp: '\\d{1,5}',

  // override the messages, defaults are as follows
  messages: {
    type: 'Select the type of change that you\'re committing:',
    scope: '\nDenote the SCOPE of this change (optional):',
    // used if allowCustomScopes is true
    customScope: 'Denote the SCOPE of this change:',
    subject: 'Write a SHORT, IMPERATIVE tense description of the change:\n',
    body: 'Provide a LONGER description of the change (optional). Use "|" to break new line:\n',
    breaking: 'List any BREAKING CHANGES (optional):\n',
    footer: 'List any ISSUES CLOSED by this change (optional). E.g.: #31, #34:\n',
    confirmCommit: 'Are you sure you want to proceed with the commit above?'
  },

  allowCustomScopes: true,
  allowBreakingChanges: ['Add', 'Fix', 'Update', 'Refactor'],
  // skip any questions you want
  skipQuestions: ['scope', 'breaking', 'footer'],

  // limit subject length
  subjectLimit: 100,
  // breaklineChar: '|', // It is supported for fields body and footer.
  // footerPrefix : 'ISSUES CLOSED:'
  // askForBreakingChangeFirst : true, // default is false
}; 