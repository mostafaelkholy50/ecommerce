import './App.css'
import TopHead from './components/header/topHead'
import LinksNav from './components/header/linksNav'
import Home from './pages/home.jsx'
import Cart from './pages/cart.jsx'
import ProductDetails from './pages/productDetails.jsx'
import { Route, Routes as Routs } from 'react-router-dom'
import ScrollToTop from './components/scrollToTop.jsx'
import { useContext } from 'react';
import { ToastContext } from './contexts/toastContext.jsx';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import Category from './pages/category.jsx';
import Search from './pages/search.jsx';

function App() {
  const { open, setOpen } = useContext(ToastContext);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);

  }
  const action = (
    <>
      <Link to="/cart">
        <Button color="inherit" size="small" onClick={handleClose}>
          View Cart
        </Button>
      </Link>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <>
      <div className='sticky top-0 z-50 bg-white shadow-md'>
        <ScrollToTop />
        <TopHead />
        <LinksNav />
      </div>
      <Routs>
        <Route path='/' element={<Home />} />
        <Route path='/Cart' element={<Cart />} />
        <Route path='/Product/:id' element={<ProductDetails />} />
        <Route path='/Category/:category' element={<Category />} />
        <Route path='/search' element={<Search />} />
        <Route path='*' element={<Home />} />
      </Routs>

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
          action={action}
        >
          Item added to cart successfully!
        </Alert>
      </Snackbar>
    </>
  )
}

export default App
