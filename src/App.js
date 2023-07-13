import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Navbar, Sidebar, Footer } from './components'
import { Error, About, SingleProduct, Cart, Checkout, Products, Home, PrivateRoute } from './pages'

function App() {
  return (
    <Router>
      <Navbar />
      <Sidebar />
      <Route exact path='/'>
        <Home />
      </Route>

      <Route exact path='/about'>
        <About />
      </Route>

      <Route exact path='/cart'>
        <Cart />
      </Route>

      <Route exact path='/products'>
        <Products />
      </Route>

      <Route exact path='/products/:id' children={<SingleProduct />}>
        <Products />
      </Route>
      <Route exact path='/checkout'>
        <Checkout />
      </Route>

      <Route exact path='/error'>
        <Error />
      </Route>

      <Footer />
    </Router >
  )
}

export default App
