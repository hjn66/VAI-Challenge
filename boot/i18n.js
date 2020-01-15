const i18n = require('i18n')
const path = require('path')

/**
 * Configure setup two locales and a project specific directory of i18n module
 * @note i18n module is a simple translation module with dynamic json storage
 */
i18n.configure({
  locales: ['en', 'de'],
  defaultLocale: 'en',
  register: global,
  directory: path.join(global.rootPath, 'locals')
})
