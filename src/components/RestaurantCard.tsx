import { Link } from 'react-router-dom'
import type { Restaurant } from '../data/restaurants'
import { fee, priceLevel } from '../lib/format'
import { gradientStyle } from '../lib/gradient'

export function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  const [fastest, slowest] = restaurant.eta

  return (
    <Link to={`/r/${restaurant.id}`} className="restaurant-card">
      <div
        className="restaurant-card__media"
        style={gradientStyle(restaurant.gradient)}
      >
        <span aria-hidden="true">{restaurant.emoji}</span>
        <span className="restaurant-card__eta">
          {fastest}–{slowest} min
        </span>
        {restaurant.promo && (
          <span className="restaurant-card__promo">{restaurant.promo}</span>
        )}
      </div>

      <div className="restaurant-card__body">
        <div className="restaurant-card__title">
          <h3>{restaurant.name}</h3>
          <span className="badge badge--rating">
            <span aria-hidden="true">★</span>
            {restaurant.rating}
          </span>
        </div>

        <p className="restaurant-card__meta">
          {restaurant.cuisine}
          <span className="dot">{priceLevel(restaurant.priceLevel)}</span>
          <span className="dot">{fee(restaurant.deliveryFee)} delivery</span>
        </p>
      </div>
    </Link>
  )
}
