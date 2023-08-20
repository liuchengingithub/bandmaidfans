/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

import utils from './common/utils'

const app = createApp(App)

registerPlugins(app)

app.mount('#app')

app.config.globalProperties.$utils = utils