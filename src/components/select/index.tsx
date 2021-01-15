// Packages
import React from 'react'
import { withTheme } from 'styled-components'
import { rgba, darken } from 'polished'
import ReactSelect, {
  Props as ReactSelectProps,
  StylesConfig,
  OptionTypeBase,
  components
} from 'react-select'

interface SelectProps extends Omit<ReactSelectProps, 'onChange'> {
  icon?: React.ReactElement
  borderless?: boolean
  onChange?(event: { target: { name: string; value: OptionTypeBase } }): void
  theme: {
    border: Record<string, string>
    colors: Record<string, string>
    spaces: Record<string, string>
    transition: Record<string, string>
  }
}

function Select(
  props: React.PropsWithChildren<SelectProps>
): React.ReactElement {
  const {
    name,
    icon,
    options,
    borderless,
    onChange,
    theme,
    ...restProps
  } = props
  const inputStyles = {
    fontSize: 14,
    color: theme.colors.darkGray,
    '&:focus, &:active': {
      boxShadow: `0 0 0 2px ${rgba(theme.colors.muted, 1)}`
    }
  }

  const styles: StylesConfig = {
    control: (styles) => ({
      ...styles,
      border: 0,
      flexWrap: 'nowrap',
      borderRadius: theme.border.radius,
      boxShadow: borderless ?? `0 0 0 1px ${rgba(theme.colors.muted, 1)}`,
      '&:hover': {
        boxShadow: `0 0 0 2px ${rgba(theme.colors.gray, 0.3)}`
      },
      '&:focus, &:active': {
        boxShadow: `0 0 0 2px ${rgba(theme.colors.gray, 0.3)}`
      }
    }),
    dropdownIndicator: (styles) => ({
      ...styles,
      padding: theme.spaces.tiny,
      color: theme.colors.gray,
      '&:hover': {
        color: darken(0.2, theme.colors.gray)
      }
    }),
    indicatorSeparator: () => ({ display: 'none' }),
    valueContainer: (styles) => ({
      ...styles,
      paddingLeft: theme.spaces.xsmall,
      color: theme.colors.gray,
      '&:hover': {
        color: darken(0.2, theme.colors.gray)
      }
    }),
    placeholder: (styles) => ({
      ...styles,
      inputStyles
    }),
    input: (styles) => ({
      ...styles,
      inputStyles
    }),
    option: (styles, state) => ({
      ...styles,
      fontSize: 14,
      background: 'transparent',
      cursor: 'pointer',
      color: state.isSelected ? theme.colors.secondary : theme.colors.primary,
      fontWeight: state.isSelected ? 'bolder' : 'normal',
      transition: theme.transition.ease,
      '&:hover': {
        color: theme.colors.secondary,
        fontWeight: 'bolder'
      }
    })
  }

  const ValueContainer = ({ children, ...props }) => {
    return (
      components.ValueContainer && (
        <components.ValueContainer {...props}>
          {Boolean(children) &&
            Boolean(icon) &&
            React.cloneElement(icon, {
              style: { position: 'absolute', left: 6 }
            })}
          {children}
        </components.ValueContainer>
      )
    )
  }

  return (
    <ReactSelect
      name={name}
      inputId={name}
      options={options}
      isSearchable={false}
      components={{ ValueContainer }}
      onChange={(option: OptionTypeBase) => {
        onChange && onChange({ target: { name, value: option } })
      }}
      styles={styles}
      {...restProps}
    />
  )
}

export default withTheme(Select)
