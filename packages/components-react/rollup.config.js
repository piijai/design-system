// import baseConfig from '../../rollup.base'
// import { nodeResolve } from '@rollup/plugin-node-resolve'
// import commonjs from '@rollup/plugin-commonjs'
// import peerDepsExternal from 'rollup-plugin-peer-deps-external'

// export default {
//   ...baseConfig,
//   external: id => {
//     return id.startsWith('react') || id.startsWith('@baloise')
//   },
//   plugins: [nodeResolve(), commonjs(), peerDepsExternal()],
// }

import config from '../../rollup.base'

export default Object.assign(config())
