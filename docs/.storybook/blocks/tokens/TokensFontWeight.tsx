import React from 'react'
import tokens from '@baloise/design-system-tokens/dist/tokens.docs.json'
import { Clipboard } from '../Clipboard'

export const TokensFontWeight = ({ overview }) => {
  const list = tokens.size.text.weight

  return (
    <table className="sb-unstyled my-x-large table tokens" style={{ width: '100%' }}>
      <thead>
        <tr>
          <th style={{ width: '100%' }}>Token & Description</th>
          <th style={{ minWidth: '100px' }}>Value</th>
          <th style={{ minWidth: '100px' }}></th>
        </tr>
      </thead>

      {Object.keys(list).map(key => {
        const item = list[key]
        return (
          <tbody key={key}>
            <tr>
              <td style={{ verticalAlign: 'top' }} className="has-border-none">
                <Clipboard label={item.name} value={`var(--${item.name})`} />
              </td>
              <td style={{ verticalAlign: 'top' }} className="has-border-none">
                <p className={`mt-none mb-x-small text-small has-text-weight-bold py-xx-small`}>{item.value}</p>
              </td>
              <td style={{ verticalAlign: 'top' }} className="has-border-none">
                <div
                  className={`has-radius-normal has-text-primary text-x-large is-flex is-justify-content-center is-align-items-center`}
                  style={{ width: '48px', height: '48px', fontWeight: `var(--${item.name})` }}
                >
                  Aa
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={3} className={'has-border-bottom-grey'}>
                <p className="m-none text-small mb-small">{item.comment}</p>
              </td>
            </tr>
          </tbody>
        )
      })}
    </table>
  )
}
