import { createContext, useContext, useState, useEffect } from 'react'

const WishlistContext = createContext(null)
const STORAGE_KEY = 'dpt_wishlist_v1'

export function WishlistProvider({ children }) {
  const [ids, setIds] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
  }, [ids])

  const toggleWishlist = (id) => {
    setIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  const isWishlisted = (id) => ids.includes(id)

  return (
    <WishlistContext.Provider value={{ ids, toggleWishlist, isWishlisted, count: ids.length }}>
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => useContext(WishlistContext)
