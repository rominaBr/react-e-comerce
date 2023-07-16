import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Layaout from './components/nav/Layout'
import NotFound from './components/NotFound'
import Categories from './components/categories/Categories'
import Products from './components/products/Products'
import Cart from './components/cart/Cart'
import ProductDetail from './components/products/ProductDetail'
import Login from './components/login/Login'
import Register from './components/login/Register'
import { QueryClient, QueryClientProvider } from 'react-query'
import ProductsCategory from './components/products/ProductsCategory'

const queryClient = new QueryClient();

function App() {
  
  return (
    <>
      <QueryClientProvider client= {queryClient}>
        <BrowserRouter>
          <Routes>
            <Route element={<Layaout/>}>
              <Route path='/' element={<Home/>} />
              <Route path='/login' element={<Login/>}/>
              <Route path='/register' element={<Register/>}/>
              <Route path='/categories' element={<Categories />}/>
              <Route path='/products' element={<Products />}/>
              <Route path='/products/categorie/:id' element={<ProductsCategory />}/>
              <Route path='/products/:id' element={<ProductDetail/>}/>
              <Route path='/cart-detail' element={<Cart/>}/> 
              <Route path='*' element={<NotFound/>}/>           
            </Route>          
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  )
}

export default App
