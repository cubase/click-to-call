import React from 'react'
import { css } from 'emotion'

const layoutBodyStyles = css`
  margin: 1.5em 0;

  & > .module-heading {
    margin: 1.5em 0;
    font-size: 1.75em;
    font-weight: bold;
    color: #444;
    text-align: center;
    text-transform: none;
  }
`

type FormLayoutProps = {
  form: JSX.Element
  heading: string
}

const FormLayout = ({ heading, form }: FormLayoutProps): JSX.Element => (
  <div className={layoutBodyStyles}>
    <h1 className="module-heading">{heading}</h1>
    {form}
  </div>
)

export default FormLayout
