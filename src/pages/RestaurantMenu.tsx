import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getRestaurant } from '../data/restaurants'
import type { MenuItem, MenuSection } from '../data/restaurants'
import { ConfirmDialog } from '../components/ConfirmDialog'
import { EmptyState } from '../components/EmptyState'
import { MenuItemRow } from '../components/MenuItemRow'
import { fee, money, priceLevel } from '../lib/format'
import { gradientStyle } from '../lib/gradient'
import { useCart, useStoreDispatch } from '../lib/store'
import { useUI } from '../lib/ui'

export function RestaurantMenu() {
  const { restaurantId } = useParams()
  const restaurant = getRestaurant(restaurantId)
  const cart = useCart()
  const dispatch = useStoreDispatch()
  const { openCart, notify } = useUI()

  /** Set when adding would replace another restaurant's cart. */
  const [conflictItem, setConflictItem] = useState<MenuItem | null>(null)

  const sections = useMemo<MenuSection[]>(() => {
    if (!restaurant) return []

    const popular = restaurant.menu
      .flatMap((section) => section.items)
      .filter((item) => item.popular)

    return popular.length >= 2
      ? [
          { id: 'popular', name: 'Popular right now', items: popular },
          ...restaurant.menu,
        ]
      : restaurant.menu
  }, [restaurant])

  if (!restaurant) {
    return (
      <div className="page page--narrow">
        <EmptyState
          emoji="🧭"
          title="We couldn't find that restaurant"
          description="It may have closed, or the link is out of date."
          action={
            <Link to="/" className="button">
              Back to browse
            </Link>
          }
        />
      </div>
    )
  }

  const cartIsElsewhere =
    !cart.isEmpty &&
    cart.restaurantId !== null &&
    cart.restaurantId !== restaurant.id

  const addItem = (item: MenuItem) => {
    dispatch({ type: 'cart/add', restaurantId: restaurant.id, item })
    if (typeof pendo !== 'undefined') {
      pendo.track('item_added_to_cart', {
        restaurantId: restaurant.id,
        restaurantName: restaurant.name,
        itemId: item.id,
        itemName: item.name,
        itemPrice: item.price,
        isPopular: item.popular ?? false,
        isVegetarian: item.vegetarian ?? false,
        isSpicy: item.spicy ?? false,
        cuisine: restaurant.cuisine,
      })
    }
    notify(`${item.name} added`)
  }

  const requestAdd = (item: MenuItem) => {
    if (cartIsElsewhere) {
      setConflictItem(item)
      return
    }
    addItem(item)
  }

  const changeQuantity = (item: MenuItem, quantity: number) => {
    dispatch({ type: 'cart/setQty', itemId: item.id, qty: quantity })
  }

  const [fastest, slowest] = restaurant.eta
  const cartBelongsHere = !cart.isEmpty && cart.restaurantId === restaurant.id

  return (
    <div className="page">
      <div className="banner" style={gradientStyle(restaurant.gradient)}>
        <Link to="/" className="back-link">
          <span aria-hidden="true">←</span> All restaurants
        </Link>
        <span aria-hidden="true">{restaurant.emoji}</span>
      </div>

      <div className="restaurant-head">
        <div className="row row--between">
          <h1>{restaurant.name}</h1>
          <span className="badge badge--rating">
            <span aria-hidden="true">★</span>
            {restaurant.rating}
          </span>
        </div>
        <p className="restaurant-head__meta">
          {restaurant.cuisine}
          <span className="dot">{priceLevel(restaurant.priceLevel)}</span>
          <span className="dot">
            {fastest}–{slowest} min
          </span>
          <span className="dot">{fee(restaurant.deliveryFee)} delivery</span>
          <span className="dot">
            {restaurant.reviewCount.toLocaleString()} ratings
          </span>
        </p>
        <p className="muted" style={{ marginTop: 8 }}>
          {restaurant.blurb}
        </p>
        {restaurant.promo && (
          <p style={{ marginTop: 12 }}>
            <span className="badge badge--promo">🎉 {restaurant.promo}</span>
          </p>
        )}
      </div>

      {sections.map((section) => (
        <section key={section.id} className="menu-section">
          <div className="section-heading">
            <h2>{section.name}</h2>
            <span className="muted">{section.items.length} items</span>
          </div>
          <ul className="menu-list">
            {section.items.map((item) => (
              <MenuItemRow
                key={item.id}
                item={item}
                restaurant={restaurant}
                quantity={cartBelongsHere ? cart.qtyOf(item.id) : 0}
                onAdd={requestAdd}
                onQuantityChange={changeQuantity}
              />
            ))}
          </ul>
        </section>
      ))}

      {cartBelongsHere && (
        <div className="cart-bar">
          <span className="cart-bar__summary">
            {cart.itemCount} {cart.itemCount === 1 ? 'item' : 'items'} ·{' '}
            <span className="cart-bar__total">{money(cart.subtotal)}</span>
          </span>
          <button type="button" className="button" onClick={openCart}>
            View cart
          </button>
        </div>
      )}

      {conflictItem && (
        <ConfirmDialog
          title="Start a new cart?"
          description={`Your cart has items from another restaurant. Adding ${conflictItem.name} will empty it.`}
          confirmLabel="Start new cart"
          onConfirm={() => {
            if (typeof pendo !== 'undefined') {
              pendo.track('cart_replaced', {
                newRestaurantId: restaurant.id,
                newRestaurantName: restaurant.name,
                previousRestaurantId: cart.restaurantId,
                newItemName: conflictItem.name,
                newItemPrice: conflictItem.price,
              })
            }
            addItem(conflictItem)
            setConflictItem(null)
          }}
          onCancel={() => setConflictItem(null)}
        />
      )}
    </div>
  )
}
