import { Route, Routes } from 'react-router-dom'
import { History } from './pages/History'
import { Home } from './pages/Home'
import { Default } from './layouts/Default'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Default />}>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
      </Route>
    </Routes>
  )
}
