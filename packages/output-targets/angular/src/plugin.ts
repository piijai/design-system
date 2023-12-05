import type { Config, OutputTargetCustom } from '@stencil/core/internal'
import { normalizePath } from './utils'
import { angularDirectiveProxyOutput } from './output-angular'
import type { OutputTargetAngular } from './types'
import path from 'path'

export const angularOutputTarget = (outputTarget: OutputTargetAngular): OutputTargetCustom => {
  return {
    type: 'custom',
    name: 'angular-library-' + outputTarget.outputType || 'module',
    validate(config) {
      return normalizeOutputTarget(config, outputTarget)
    },
    async generator(config, compilerCtx, buildCtx) {
      const timespan = buildCtx.createTimeSpan(
        `generate angular ${outputTarget.outputType || 'module'} proxies started`,
        true,
      )

      await angularDirectiveProxyOutput(compilerCtx, outputTarget, buildCtx.components, config)

      timespan.finish(`generate angular ${outputTarget.outputType || 'module'} proxies finished`)
    },
  }
}

export function normalizeOutputTarget(config: Config, outputTarget: any) {
  const results: OutputTargetAngular = {
    ...outputTarget,
    excludeComponents: outputTarget.excludeComponents || [],
    valueAccessorConfig: outputTarget.valueAccessorConfig || [],
  }

  if (config.rootDir == null) {
    throw new Error('rootDir is not set and it should be set by stencil itself')
  }
  if (outputTarget.directivesProxyFile == null) {
    throw new Error('directivesProxyFile is required')
  }
  if (outputTarget.directivesMetaFile == null) {
    throw new Error('directivesMetaFile is required')
  }

  if (outputTarget.directivesProxyFile && !path.isAbsolute(outputTarget.directivesProxyFile)) {
    results.directivesProxyFile = normalizePath(path.join(config.rootDir, outputTarget.directivesProxyFile))
  }

  if (outputTarget.directivesMetaFile && !path.isAbsolute(outputTarget.directivesMetaFile)) {
    results.directivesMetaFile = normalizePath(path.join(config.rootDir, outputTarget.directivesMetaFile))
  }

  if (outputTarget.directivesArrayFile && !path.isAbsolute(outputTarget.directivesArrayFile)) {
    results.directivesArrayFile = normalizePath(path.join(config.rootDir, outputTarget.directivesArrayFile))
  }

  if (outputTarget.directivesUtilsFile && !path.isAbsolute(outputTarget.directivesUtilsFile)) {
    results.directivesUtilsFile = normalizePath(path.join(config.rootDir, outputTarget.directivesUtilsFile))
  }

  return results
}
