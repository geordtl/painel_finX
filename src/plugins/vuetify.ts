import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { pt } from 'vuetify/locale'

import { createVuetify } from 'vuetify'

export default createVuetify({
   locale: {
    locale: 'pt',
    messages: { pt },
  },
  theme: {
    defaultTheme: 'myTheme',
    themes: {
      myTheme: {
        dark: false,
        colors: {
          primary: "#00A5EA",
          secondary: "#01698F",
          tertiary: "#1E3247",
          darkGrey: "#61646B",
          lightGrey: "#AAB4BE",
          lightBlue: "#E6F6FD"
        }
      }
    }
  },
})
