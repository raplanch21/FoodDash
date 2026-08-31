import { useMemo, useState } from 'react'
import { cuisines, restaurants } from '../data/restaurants'
import type { Restaurant } from '../data/restaurants'
import { RestaurantCard } from '../components/RestaurantCard'
import { EmptyState } from '../components/EmptyState'

type SortKey = 'recommended' | 'fastest' | 'cheapest'

const SORTS: { key: SortKey; label: string }[] = [
  { key: 'recommended', label: 'Top rated' },
  { key: 'fastest', label: 'Fastest' },
  { key: 'cheapest', label: 'Lowest delivery fee' },
]

/** Matches the name, the cuisine, or any dish on the menu. */
function matchesQuery(restaurant: Restaurant, query: string): boolean {
  const needle = query.trim().toLowerCase()
  if (!needle) return true

  if (
    restaurant.name.toLowerCase().includes(needle) ||
    restaurant.cuisine.toLowerCase().includes(needle)
  ) {
    return true
  }

  return restaurant.menu.some((section) =>
    section.items.some((item) => item.name.toLowerCase().includes(needle)),
  )
}

function sortRestaurants(list: Restaurant[], sort: SortKey): Restaurant[] {
  const sorted = [...list]
  switch (sort) {
    case 'fastest':
      return sorted.sort((a, b) => a.eta[0] - b.eta[0])
    case 'cheapest':
      return sorted.sort((a, b) => a.deliveryFee - b.deliveryFee)
    default:
      return sorted.sort((a, b) => b.rating - a.rating)
  }
}

export function Browse() {
  const [query, setQuery] = useState('')
  const [cuisine, setCuisine] = useState<string | null>(null)
  const [freeDeliveryOnly, setFreeDeliveryOnly] = useState(false)
  const [sort, setSort] = useState<SortKey>('recommended')

  const results = useMemo(() => {
    const filtered = restaurants.filter(
      (restaurant) =>
        matchesQuery(restaurant, query) &&
        (!cuisine || restaurant.cuisine === cuisine) &&
        (!freeDeliveryOnly || restaurant.deliveryFee === 0),
    )
    return sortRestaurants(filtered, sort)
  }, [query, cuisine, freeDeliveryOnly, sort])

  const clearFilters = () => {
    setQuery('')
    setCuisine(null)
    setFreeDeliveryOnly(false)
  }

  return (
    <div className="page">
      <section className="hero">
        <span className="hero__eyebrow">
          <span aria-hidden="true">📍</span> Delivering to 24 Alder St
        </span>
        <h1 className="hero__title">What are you hungry for tonight?</h1>
        <div className="hero__search">
          <span aria-hidden="true">🔍</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search restaurants or dishes"
            aria-label="Search restaurants or dishes"
          />
          <button
            type="button"
            className="button"
            onClick={() => {
              if (typeof pendo !== 'undefined') {
                pendo.track('restaurant_search_executed', {
                  query: query.slice(0, 100),
                  cuisineFilter: cuisine ?? 'all',
                  freeDeliveryOnly,
                  sortKey: sort,
                  resultsCount: results.length,
                })
              }
            }}
          >
            Search
          </button>
        </div>
      </section>

      <div className="filters">
        <div className="filters__chips">
          <button
            type="button"
            className={`chip${cuisine === null ? ' is-active' : ''}`}
            onClick={() => setCuisine(null)}
          >
            All
          </button>
          {cuisines.map((name) => (
            <button
              key={name}
              type="button"
              className={`chip${cuisine === name ? ' is-active' : ''}`}
              onClick={() => setCuisine(name)}
            >
              {name}
            </button>
          ))}
        </div>

        <div className="filters__spacer" />

        <button
          type="button"
          className={`chip${freeDeliveryOnly ? ' is-active' : ''}`}
          aria-pressed={freeDeliveryOnly}
          onClick={() => setFreeDeliveryOnly((value) => !value)}
        >
          Free delivery
        </button>

        <label className="visually-hidden" htmlFor="sort">
          Sort restaurants
        </label>
        <select
          id="sort"
          className="select"
          value={sort}
          onChange={(event) => setSort(event.target.value as SortKey)}
        >
          {SORTS.map((option) => (
            <option key={option.key} value={option.key}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="section-heading">
        <h2>
          {results.length} {results.length === 1 ? 'restaurant' : 'restaurants'}
        </h2>
        <span className="muted">Prices include taxes</span>
      </div>

      {results.length === 0 ? (
        <EmptyState
          emoji="🍽️"
          title="Nothing matched that search"
          description="Try a different dish, or clear your filters to see everything."
          action={
            <button type="button" className="button" onClick={clearFilters}>
              Clear filters
            </button>
          }
        />
      ) : (
        <div className="restaurant-grid">
          {results.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      )}
    </div>
  )
}
