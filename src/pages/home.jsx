import { use, useContext, useEffect, useState } from 'react';
import Slider from '../components/slider/slider'
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import SectionProducts from '../components/products/sectionProducts';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import { ToastContext } from '../contexts/toastContext';


function home() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const categories = [
    'smartphones',
    'mens-watches',
    'mens-shoes',
    'laptops',
    'sunglasses',
    'tablets',
  ];
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  }

  useEffect(() => {
    async function fetchProductsByCategory() {
      try {
        const requests = categories.map(category =>
          axios.get(`https://dummyjson.com/products/category/${category}`)
        );

        const responses = await Promise.all(requests);
        const data = responses.map(res => res.data);

        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);

      }
    }

    if (categories.length) {
      fetchProductsByCategory();
    }
  }, []);

  return (

    <div>


      {!loading ?
        <>
          <Slider />
          {categories.map((category, index) => (
            <SectionProducts key={category} products={products[index]} category={category} />

          ))}
        </>
        : <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="relative">
            <div className="h-20 w-20 rounded-full border-t-4 border-b-4 border-gray-200"></div>
            <div className="absolute top-0 left-0 h-20 w-20 rounded-full border-t-4 border-b-4 border-indigo-600 animate-spin"></div>
          </div>
        </div>}
    </div>
  )
}

export default home
