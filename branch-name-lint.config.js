const childProcess = require('child_process')
const util = require('util')

const options = {
  prefixes: ['feature', 'hotfix', 'release', 'improvement', 'bugfix'],
  suggestions: {
    features: 'feature',
    feat: 'feature',
    fix: 'bugfix',
    releases: 'release',
    refactor: 'improvement',
  },
  disallowed: ['master', 'develop', 'staging'],
  seperator: '/',
  msgBranchDisallowed: 'Pushing to "%s" is not allowed, use git-flow.',
  msgPrefixNotAllowed: 'Branch prefix "%s" is not allowed.',
  msgPrefixSuggestion: 'Instead of "%s" try "%s".',
  msgSeperatorRequired: 'Branch "%s" must contain a seperator "%s".',
}

function error() {
  process.exit(1)
}

function success() {
  process.exit(0)
}

function messageError(...args) {
  console.error('\x1b[31m', 'Branch name lint fail!', util.format.apply(null, args))
}

function getBranchName() {
  return childProcess.execFileSync('git', ['rev-parse', '--abbrev-ref', 'HEAD']).toString().trim()
}

function doValidation() {
  const branch = getBranchName()
  const parts = branch.split(options.seperator)
  const prefix = parts[0].toLowerCase()
  const name = parts[1] ? parts[1].toLowerCase() : null

  if (options.disallowed.includes(branch)) {
    messageError(options.msgBranchDisallowed, branch)
    error()
  }

  if (!branch.includes(options.seperator)) {
    messageError(options.msgSeperatorRequired, branch, options.seperator)
    error()
  }

  if (!options.prefixes.includes(prefix)) {
    messageError(options.msgPrefixNotAllowed, prefix)

    if (options.suggestions[prefix]) {
      messageError(
        options.msgPrefixSuggestion,
        [prefix, name].join(options.seperator),
        [options.suggestions[prefix], name].join(options.seperator),
      )
    }
    error()
  }

  success()
}

doValidation()
