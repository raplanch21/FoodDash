/**
 * The app's domain state: the cart you're building and the orders you've
 * placed. Persisted to localStorage so a demo survives a page refresh.
 *
 * Order status is *derived* from `placedAt` rather than stored, so tracking
 * keeps working correctly after a reload instead of restarting a timer.
 *
 * This module holds the state shape, reducer, contexts, and hooks. The
 * provider component lives in StoreProvider.tsx.
 */

import { createContext, useContext, useMemo } from 'react'
import type { Dispatch } from 'react'
import type { MenuItem, Restaurant } from '../data/restaurants'

export const STORAGE_KEY = 'takeout.state.v1'

export type CartLine = {
  itemId: string
  name: string
  price: number
  emoji: string
  qty: number
}

export type Cart = {
  /** A cart belongs to exactly one restaurant, like every real delivery app. */
  restaurantId: string | null
  lines: CartLine[]
}

export type Fulfillment = 'delivery' | 'pickup'

export type Totals = {
  subtotal: number
  deliveryFee: number
  serviceFee: number
  tip: number
  total: number
}

export type Order = {
  id: string
  restaurantId: string
  restaurantName: string
  restaurantEmoji: string
  lines: CartLine[]
  totals: Totals
  fulfillment: Fulfillment
  address: string
  courier: string
  /** Epoch ms. Drives the whole tracking timeline. */
  placedAt: number
  etaMinutes: number
}

export type State = {
  cart: Cart
  orders: Order[]
}

export type Action =
  | { type: 'cart/add'; restaurantId: string; item: MenuItem; qty?: number }
  | { type: 'cart/setQty'; itemId: string; qty: number }
  | { type: 'cart/clear' }
  | { type: 'cart/replace'; restaurantId: string; lines: CartLine[] }
  | { type: 'order/place'; order: Order }
  | { type: 'demo/reset' }

const emptyCart: Cart = { restaurantId: null, lines: [] }

export const initialState: State = { cart: emptyCart, orders: [] }

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'cart/add': {
      // Adding from a different restaurant starts a fresh cart. The UI asks
      // for confirmation first, so reaching here means the swap is intended.
      const sameRestaurant = state.cart.restaurantId === action.restaurantId
      const lines = sameRestaurant ? state.cart.lines : []
      const qty = action.qty ?? 1
      const existing = lines.find((line) => line.itemId === action.item.id)

      const nextLines = existing
        ? lines.map((line) =>
            line.itemId === action.item.id
              ? { ...line, qty: line.qty + qty }
              : line,
          )
        : [
            ...lines,
            {
              itemId: action.item.id,
              name: action.item.name,
              price: action.item.price,
              emoji: action.item.emoji,
              qty,
            },
          ]

      return {
        ...state,
        cart: { restaurantId: action.restaurantId, lines: nextLines },
      }
    }

    case 'cart/setQty': {
      const nextLines = state.cart.lines
        .map((line) =>
          line.itemId === action.itemId ? { ...line, qty: action.qty } : line,
        )
        .filter((line) => line.qty > 0)

      return {
        ...state,
        cart: {
          restaurantId: nextLines.length > 0 ? state.cart.restaurantId : null,
          lines: nextLines,
        },
      }
    }

    case 'cart/clear':
      return { ...state, cart: emptyCart }

    case 'cart/replace':
      return {
        ...state,
        cart: { restaurantId: action.restaurantId, lines: action.lines },
      }

    case 'order/place':
      return { cart: emptyCart, orders: [action.order, ...state.orders] }

    case 'demo/reset':
      return initialState

    default:
      return state
  }
}

export function loadState(): State {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return initialState
    const parsed = JSON.parse(raw) as Partial<State>
    return {
      cart: parsed.cart ?? emptyCart,
      orders: parsed.orders ?? [],
    }
  } catch {
    // A corrupt or unreadable value should never block the app from starting.
    return initialState
  }
}

export const StateContext = createContext<State | null>(null)
export const DispatchContext = createContext<Dispatch<Action> | null>(null)

function useStoreState(): State {
  const state = useContext(StateContext)
  if (!state) throw new Error('Store hooks must be used inside StoreProvider')
  return state
}

export function useStoreDispatch(): Dispatch<Action> {
  const dispatch = useContext(DispatchContext)
  if (!dispatch) {
    throw new Error('useStoreDispatch must be used inside StoreProvider')
  }
  return dispatch
}

export function useOrders(): Order[] {
  return useStoreState().orders
}

export function useOrder(id: string | undefined): Order | undefined {
  return useOrders().find((order) => order.id === id)
}

export function useCart() {
  const { cart } = useStoreState()

  return useMemo(() => {
    const itemCount = cart.lines.reduce((sum, line) => sum + line.qty, 0)
    const subtotal = cart.lines.reduce(
      (sum, line) => sum + line.price * line.qty,
      0,
    )
    const qtyOf = (itemId: string) =>
      cart.lines.find((line) => line.itemId === itemId)?.qty ?? 0

    return { ...cart, itemCount, subtotal, qtyOf, isEmpty: itemCount === 0 }
  }, [cart])
}

const SERVICE_FEE_RATE = 0.05

export function computeTotals(
  subtotal: number,
  restaurant: Restaurant | undefined,
  fulfillment: Fulfillment,
  tipPercent: number,
): Totals {
  const deliveryFee =
    fulfillment === 'pickup' ? 0 : (restaurant?.deliveryFee ?? 0)
  const serviceFee = Math.round(subtotal * SERVICE_FEE_RATE)
  const tip = fulfillment === 'pickup' ? 0 : Math.round(subtotal * tipPercent)

  return {
    subtotal,
    deliveryFee,
    serviceFee,
    tip,
    total: subtotal + deliveryFee + serviceFee + tip,
  }
}

export function newOrderId(): string {
  return `TK-${Math.random().toString(36).slice(2, 7).toUpperCase()}`
}
