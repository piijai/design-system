import config from '../../../rollup.base'

export default Object.assign(config, {
  external: ['path', 'util', 'fs'],
})
