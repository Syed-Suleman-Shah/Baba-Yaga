import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
useSelector
const ProductDetail = () => {

    const {id} = useParams()
    const products = useSelector(state => state.product.products)
    const [product, setProduct] =useState()

      useEffect(() => {
        const newProduct = products.find(product => product.id === id)
        setProduct(newProduct)
    }, [id])

  return (
    <div>
        {product.name}
    </div>
  )
}

export default ProductDetail