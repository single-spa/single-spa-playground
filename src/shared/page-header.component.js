import React from 'react'
import {useCss} from 'kremling'

export default function PageHeader(props) {
  const scope = useCss(css)

  return (
    <header {...scope}>
      {props.title}
    </header>
  )
}

const css = `
& header {
  height: 160rem;
  background-color: var(--single-spa-blue);
  display: flex;
  align-items: flex-end;
  color: white;
  padding: 24rem;
  font-size: 32rem;
  font-weight: bold;
  margin-bottom: 16rem;
}
`