import { InitializerFactory } from '../initializer'
import {
  CONFIG_MOCK_DEFAULT,
  FIGMA_MOCK_DEFAULT,
  FIGMA_MOCK_MATERIAL,
} from '../../__mock__'
import { Config } from '../../interfaces'
import { ComposerFactory } from '../composer'
import { CONFIG_MOCK_MATERIAL } from '../../__mock__/material/config'
import {
  DEFAULT_COMPONENTS_SPEC,
  DEFAULT_FOUNDATION_SPEC,
} from './default.expect'
import {
  MATERIAL_COMPONENTS_SPEC,
  MATERIAL_FOUNDATION_SPEC,
} from './material.expect'

describe('InitializerFactory', () => {
  it('should create successfully', () => {
    const factory = new InitializerFactory()
    factory.json = FIGMA_MOCK_DEFAULT as any
    factory.config = CONFIG_MOCK_DEFAULT as Config
    expect(factory.foundation).toBeInstanceOf(ComposerFactory)
    expect(factory.components).toBeInstanceOf(ComposerFactory)
  })

  it('should compose json successfully', () => {
    const factory = new InitializerFactory()
    factory.json = FIGMA_MOCK_DEFAULT as any
    factory.config = CONFIG_MOCK_DEFAULT as Config
    const composed = factory.compose()
    expect(composed.foundation).toBeTruthy()
    expect(composed.components).toBeTruthy()
  })

  describe('InitializerFactory - Default Mock', () => {
    it('should compose foundation successfully', () => {
      const factory = new InitializerFactory()
      factory.json = FIGMA_MOCK_DEFAULT as any
      factory.config = CONFIG_MOCK_DEFAULT as Config
      const composed = factory.compose()
      expect(composed.foundation).toEqual(DEFAULT_FOUNDATION_SPEC)
    })

    it('should compose components successfully', () => {
      const factory = new InitializerFactory()
      factory.json = FIGMA_MOCK_DEFAULT as any
      factory.config = CONFIG_MOCK_DEFAULT as Config
      const composed = factory.compose()
      expect(composed.components).toEqual(DEFAULT_COMPONENTS_SPEC)
    })
  })

  //// Advanced tests based on material figma composition
  describe('InitializerFactory - Material Mock', () => {
    it('should compose foundation successfully', () => {
      const factory = new InitializerFactory()
      factory.json = FIGMA_MOCK_MATERIAL as any
      factory.config = CONFIG_MOCK_MATERIAL as Config
      const composed = factory.compose()
      expect(composed.foundation).toEqual(MATERIAL_FOUNDATION_SPEC)
    })

    it('should compose components successfully', () => {
      const factory = new InitializerFactory()
      factory.json = FIGMA_MOCK_MATERIAL as any
      factory.config = CONFIG_MOCK_MATERIAL as Config
      const composed = factory.compose()
      expect(composed.components).toEqual(MATERIAL_COMPONENTS_SPEC)
    })
  })
})
