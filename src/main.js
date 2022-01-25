const core = require('@actions/core')
const github = require('@actions/github')

async function run() {
    try {
        const { context } = require('@actions/github')

        //takes inputs 
        const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN')
        const ISSUE_COMMENT = core.getInput('ISSUE_COMMENT')

        if ( typeof GITHUB_TOKEN !== 'string') {
            throw new Error('GITHUB_TOKEN is not a string')
        }

        if( typeof ISSUE_COMMENT !== 'string') {
            throw new Error('ISSUE_COMMENT is not a string')
        }

        const octokit = new github.getOctokit(GITHUB_TOKEN)
        const { issue } = context.payload
        const payload = context.payload.issue

        await octokit.rest.issues.createComment({
            ...context.repo,
            issue_number: issue.number,
            body: ISSUE_COMMENT
        })
    } catch (error) {
        core.error(error)
        core.setFailed(error.message)
    }
}

run()