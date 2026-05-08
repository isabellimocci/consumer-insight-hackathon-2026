import type { IconType } from 'react-icons'
import {
  PiBookOpenBold,
  PiBookOpenLight,
  PiBusBold,
  PiBusLight,
  PiDeviceMobileBold,
  PiDeviceMobileLight,
  PiForkKnifeBold,
  PiForkKnifeLight,
  PiGameControllerBold,
  PiGameControllerLight,
  PiHeartbeatBold,
  PiHeartbeatLight,
  PiShoppingBagBold,
  PiShoppingBagLight,
} from 'react-icons/pi'

import type { Category } from '../types'

export const CATEGORY_ICONS: Record<Category, string> = {
  Alimentação: '🍽️',
  Transporte: '🚌',
  Lazer: '🎯',
  Assinaturas: '📱',
  Compras: '🛍️',
  Saúde: '💊',
  Educação: '📚',
}

export const CATEGORY_ICONS_PI: Record<Category, IconType> = {
  Alimentação: PiForkKnifeLight,
  Transporte: PiBusLight,
  Lazer: PiGameControllerLight,
  Assinaturas: PiDeviceMobileLight,
  Compras: PiShoppingBagLight,
  Saúde: PiHeartbeatLight,
  Educação: PiBookOpenLight,
}

export const CATEGORY_ICONS_BOLD_PI: Record<Category, IconType> = {
  Alimentação: PiForkKnifeBold,
  Transporte: PiBusBold,
  Lazer: PiGameControllerBold,
  Assinaturas: PiDeviceMobileBold,
  Compras: PiShoppingBagBold,
  Saúde: PiHeartbeatBold,
  Educação: PiBookOpenBold,
}

export const CATEGORY_COLORS: Record<Category, string> = {
  Alimentação: '#F97316',
  Transporte: '#06B6D4',
  Lazer: '#A78BFA',
  Assinaturas: '#60A5FA',
  Compras: '#F472B6',
  Saúde: '#34D399',
  Educação: '#FBBF24',
}
