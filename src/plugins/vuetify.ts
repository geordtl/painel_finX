import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import { createVuetify } from 'vuetify'

export default createVuetify({
  theme: {
    defaultTheme: 'myTheme',
    themes: {
      myTheme: {
        dark: false,
        colors: {
          primay: "#00A5EA",
          secondary: "#01698F",
          tertiary: "#1E3247",
          darkGrey: "#61646B",
          lightGrey: "#AAB4BE"
        }
      }
    }
  },
})
