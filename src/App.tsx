import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Layaout from './components/nav/Layout'
import NotFound from './components/NotFound'
import Categories from './components/categories/Categories'
import Products from './components/products/Products'
import Cart from './components/cart/Cart'

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layaout/>}>
            <Route path='/' element={<Home/>} />
            <Route path='/login'/>
            <Route path='/register'/>
            <Route path='/categories' element={<Categories />}/>
            <Route path='/products' element={<Products />}/>
            <Route path='/products/:id'/>
            <Route path='/cart-detail' element={<Cart/>}/> 
            <Route path='*' element={<NotFound/>}/>           
          </Route>          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
