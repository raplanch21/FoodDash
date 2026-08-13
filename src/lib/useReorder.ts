import { useCallback } from 'react'
import { useStoreDispatch } from './store'
import type { Order } from './store'
import { useUI } from './ui'

/**
 * Refills the cart from a past order and opens the drawer so the next step is
 * obvious. Shared by the tracking screen and order history.
 */
export function useReorder(): (order: Order) => void {
  const dispatch = useStoreDispatch()
  const { openCart, notify } = useUI()

  return useCallback(
    (order: Order) => {
      dispatch({
        type: 'cart/replace',
        restaurantId: order.restaurantId,
        lines: order.lines,
      })
      notify(`${order.restaurantName} order added to your cart`)
      openCart()
    },
    [dispatch, notify, openCart],
  )
}
