import { useEffect } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import { CartDrawer } from './components/CartDrawer'
import { EmptyState } from './components/EmptyState'
import { Header } from './components/Header'
import { Toasts } from './components/Toasts'
import { Browse } from './pages/Browse'
import { Checkout } from './pages/Checkout'
import { Orders } from './pages/Orders'
import { RestaurantMenu } from './pages/RestaurantMenu'
import { TrackOrder } from './pages/TrackOrder'

/** Routing between screens shouldn't inherit the previous page's scroll. */
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [pathname])

  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Browse />} />
          <Route path="/r/:restaurantId" element={<RestaurantMenu />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/track/:orderId" element={<TrackOrder />} />
          <Route path="/orders" element={<Orders />} />
          <Route
            path="*"
            element={
              <div className="page page--narrow">
                <EmptyState
                  emoji="🤷"
                  title="This page doesn't exist"
                  description="Check the link, or head back to the restaurant list."
                  action={
                    <Link to="/" className="button">
                      Back to browse
                    </Link>
                  }
                />
              </div>
            }
          />
        </Routes>
      </main>
      <CartDrawer />
      <Toasts />
    </>
  )
}
