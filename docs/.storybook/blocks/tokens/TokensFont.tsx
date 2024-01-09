import React from 'react'
import { Clipboard } from '../Clipboard'

export const TokensFont = ({ overview }) => {
  return (
    <table className="sb-unstyled my-x-large table tokens" style={{ width: '100%' }}>
      <thead>
        <tr>
          <th style={{ minWidth: '220px' }}>Example</th>
          <th>Description</th>
          <th style={{ minWidth: '220px' }}>Token</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ verticalAlign: 'top' }}>
            <span className="is-family-title has-text-weight-bold has-text-primary is-size-medium">Bold Headline</span>
            <br />
            <span className="is-family-title has-text-primary is-size-medium">Light Headline</span>
          </td>
          <td style={{ verticalAlign: 'top' }}>
            <p className="has-text-weight-bold is-size-large mt-none mb-x-small">
              Title <span className="is-size-medium">(BaloiseCreateHeadline)</span>
            </p>
            <p className="m-none is-size-small">Should only be used for headings and buttons</p>
          </td>
          <td style={{ verticalAlign: 'top' }}>
            <Clipboard label={'bal-font-family-title'} value={`var(--bal-font-family-title)`} />
          </td>
        </tr>
        <tr>
          <td style={{ verticalAlign: 'top' }}>
            <span className="is-family-text has-text-weight-bold has-text-primary is-size-medium">Bold Text</span>
            <br />
            <span className="is-family-text has-text-primary is-size-medium">Regular Text</span>
          </td>
          <td style={{ verticalAlign: 'top' }}>
            <p className="has-text-weight-bold is-size-large mt-none mb-x-small">
              Text <span className="is-size-medium">(BaloiseCreateText)</span>
            </p>
            <p className="m-none is-size-small">Should only be used for body texts and form controls</p>
          </td>
          <td style={{ verticalAlign: 'top' }}>
            <Clipboard label={'bal-font-family-text'} value={`var(--bal-font-family-text)`} />
          </td>
        </tr>
      </tbody>
    </table>
  )
}
