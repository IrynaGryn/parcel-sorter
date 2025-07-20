// vitest.setup.ts
import { beforeEach } from 'vitest'
import { config } from '@vue/test-utils'
import PrimeVue from 'primevue/config'

// Import PrimeVue components
import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import FileUpload from 'primevue/fileupload'
import InputText from 'primevue/inputtext'
import Panel from 'primevue/panel'
import ConfirmDialog from 'primevue/confirmdialog'
import Toast from 'primevue/toast'
import Select from 'primevue/select'
import Tooltip from 'primevue/tooltip'

// Setup PrimeVue globally with components before each test
beforeEach(() => {
  config.global.plugins = [PrimeVue]
  config.global.directives = { tooltip: Tooltip }
  config.global.components = {
    Button,
    DataTable,
    Column,
    FileUpload,
    InputText,
    Panel,
    ConfirmDialog,
    Toast,
    Select,
  }
})
