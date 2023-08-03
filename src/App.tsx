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
import AuthProvider from './auth/AuthContext'
import ProductCreate from './components/complements/protected/products/ProductCreate'
import RequireAuth from './auth/RequireAuth'
import RequireAdmin from './auth/RequireAdmin'
import CategoryCreate from './components/complements/protected/categories/CategoryCreate'
import CategoryEdit from './components/complements/protected/categories/CategoryEdit'
import ProductEdit from './components/complements/protected/products/ProductEdit'
import Profile from './components/profile/Profile'

const queryClient = new QueryClient();

function App() {
  
  return (
    <>
      <QueryClientProvider client= {queryClient}>
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route element={<Layaout/>}>
                <Route path="/" element={<Home/>} />
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/categories" element={<Categories />}/>
                <Route path="/products" element={<Products />}/>
                <Route path="/products/categorie/:id" element={<ProductsCategory />}/>
                <Route path="/products/:id" element={<ProductDetail/>}/>
                <Route path="/cart-detail" element={<Cart/>}/> 
                <Route path="*" element={<NotFound/>}/>     
                <Route path="/products/create" element={
                  <RequireAuth>
                    <RequireAdmin>
                      <ProductCreate/>                      
                    </RequireAdmin>                    
                  </RequireAuth>
                } /> 
                <Route path="/categories/create" element={
                  <RequireAuth>
                    <RequireAdmin>
                      <CategoryCreate/>
                    </RequireAdmin>                    
                  </RequireAuth>
                } /> 
                <Route path="/categories/edit/:id" element={
                  <RequireAuth>
                    <RequireAdmin>
                      <CategoryEdit/>
                    </RequireAdmin>                    
                  </RequireAuth>
                } />      
                <Route path="/products/edit/:id" element={
                  <RequireAuth>
                    <RequireAdmin>
                      <ProductEdit/>
                    </RequireAdmin>                    
                  </RequireAuth>
                } />  
                <Route path="/profile" element ={
                  <RequireAuth>
                    <Profile/>
                  </RequireAuth>
                }/>
              </Route>          
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  )
}

export default App
