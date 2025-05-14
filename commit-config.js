module.exports = {
  types: [
    { value: 'feat', name: 'feat:     A new feature' },
    { value: 'fix', name: 'fix:      A bug fix' },
    { value: 'docs', name: 'docs:     Documentation only changes' },
    { value: 'style', name: 'style:    Changes that do not affect the meaning of the code' },
    { value: 'refactor', name: 'refactor: A code change that neither fixes a bug nor adds a feature' },
    { value: 'perf', name: 'perf:     A code change that improves performance' },
    { value: 'test', name: 'test:     Adding missing tests or correcting existing tests' },
    { value: 'build', name: 'build:    Changes that affect the build system or external dependencies' },
    { value: 'ci', name: 'ci:       Changes to our CI configuration files and scripts' },
    { value: 'chore', name: 'chore:    Other changes that do not modify src or test files' },
    { value: 'revert', name: 'revert:   Reverts a previous commit' }
  ],

  scopes: [
    { name: 'layout' },
    { name: 'style' },
    { name: 'content' },
    { name: 'config' },
    { name: 'scripts' },
    { name: 'seo' },
    { name: 'ci' },
    { name: 'docs' },
    { name: 'deps' },
    { name: 'routes' },
    { name: 'security' }
  ],

  allowTicketNumber: false,
  isTicketNumberRequired: false,
  ticketNumberPrefix: '#',
  ticketNumberRegExp: '\\d{1,5}',

  // override the messages, defaults are as follows
  messages: {
    type: "Select the type of change that you're committing:",
    scope: '\nDenote the SCOPE of this change (optional):',
    customScope: 'Denote the SCOPE of this change:',
    subject: 'Write a SHORT, IMPERATIVE tense description of the change:\n',
    body: 'Provide a LONGER description of the change (optional). Use "|" to break new line:\n',
    breaking: 'List any BREAKING CHANGES (optional):\n',
    footer: 'List any ISSUES CLOSED by this change (optional). E.g.: #31, #34:\n',
    confirmCommit: 'Are you sure you want to proceed with the commit above?'
  },

  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix'],
  skipQuestions: ['body', 'footer'],
  subjectLimit: 100,
  breaklineChar: '|',
  footerPrefix : 'ISSUES CLOSED:',
  askForBreakingChangeFirst : true
}; 