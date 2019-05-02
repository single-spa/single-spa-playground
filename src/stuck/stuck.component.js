import React from 'react'
import PageHeader from '../shared/page-header.component';
import useLocalStorageData from '../shared/use-local-storage-data.hook';

export default function Stuck(props) {
  const {applications} = useLocalStorageData()

  const issueBody = `
## Data dump

Applications:
\`\`\`json
${JSON.stringify(applications, null, 2)}
\`\`\`

Import map:
\`\`\`json
${JSON.stringify(window.importMapOverrides.getOverrideMap(), null, 2)}
\`\`\`

## Description
`
  const newIssueUrl = `https://github.com/CanopyTax/single-spa-playground/issues/new?body=${encodeURIComponent(issueBody)}`

  return (
    <>
      <PageHeader title="Stuck?" />
      <article className="card">
        If you're stuck trying to get things working, feel free to <a href={newIssueUrl} target="_blank">file a Github issue with single-spa-playground</a> or
        to <a href="https://join.slack.com/t/single-spa/shared_invite/enQtMzIwMTcxNTU3ODQyLTM1Y2U1OWMzNTNjOWYyZDBlMDJhN2VkYzk3MDI2NzQ2Nzg0MzMzNjVhNWE2YjVhMTcxNjFkOWYzMjllMmUxMjk" target="_blank">join our Slack workspace</a>.
        There may be people who have experienced similar problems, so be sure to <a href="https://github.com/CanopyTax/single-spa-playground/issues" target="_blank">search for existing or closed issues</a> before filing a new one.
      </article>
    </>
  )
}