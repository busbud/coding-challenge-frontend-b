import { NONAME } from 'dns'
import { styledTheme } from './theme'

export const grommetTheme = {
  global: {
    font: {
      family: 'Codec Pro',
      size: '16px',
      height: '18px',
    },
    colors: {
      brand: styledTheme.colors.blue,
    },
    input: {
      padding: {
        horizontal: '12px',
        vertical: '4px',
      },
      font: {
        weight: 400,
      },
      extend: {
        border: 'none',
      },
    },
  },
  formField: {
    margin: {
      bottom: 'none',
    },
    label: {
      color: '#0795ff',
      size: '14px',
      margin: {
        bottom: 'none',
      },
    },
    border: 'transparent',
  },
  dateInput: {
    icon: {
      size: '20px',
    },
  },
  select: {
    control: {
      extend: {
        marginLeft: '15px',
        whiteSpace: 'nowrap',
        border: 'none',
      },
    },
  },
}
