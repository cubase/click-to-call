export type Theme = {
  color: string
  position: 'left' | 'right'
}

export type ThemedStyleFunction = (arg: Theme) => string

const withTheme = (styleFunc: ThemedStyleFunction, theme: Theme): string => styleFunc(theme)

export { withTheme }
