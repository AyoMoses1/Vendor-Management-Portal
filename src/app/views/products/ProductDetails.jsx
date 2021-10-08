import React, { useState, useEffect } from 'react'
import { Card, Divider, Grid, Icon } from '@material-ui/core'
import { Breadcrumb, SimpleCard } from 'matx'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import http from '../../services/api'

const usestyles = makeStyles(({ palette, ...theme }) => ({
    imageBorder: {
        border: '2px solid rgba(var(--primary), 0.67)',
    },
}))

const ProductDetails = ({location}) => {
    const State = location.state
    const {id} = State
    const [selectedImage, setSelectedImage] = useState('')
    const classes = usestyles()
    const [product, setProduct] = useState([])
    const [brand, setBrand] = useState([])
    const [imageList, setImageList] = useState([])
    const [store, setStore] = useState([])
    const [seller, setSeller] = useState([])

    const getProduct = () => {
    http
      .get(`/afrimash/products/${id}`)
      .then((response) => {
          const {brandId, storeId} = response.data.object
        console.log(response.data.object.brandId.name)
        setProduct(response.data.object)
        setBrand(brandId)
        setStore(storeId)
        setSeller(storeId.sellerId)
        if (response.data.object.productImages !== []){
            const {productImages} = response.data.object
            setImageList(productImages)
            setSelectedImage(productImages[0].imageUrl)
        }
        else {
            setImageList([])
            setSelectedImage('')
        }
    
      })
      .catch((err) => alert(err.response.data))
  }

    useEffect(() => {
      getProduct()
    }, [])

    return (

        <div className="m-sm-30">
            <div className="mb-sm-30">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Products', path: '/products' },
                        { name: 'View Product' },
                    ]}
                />
            </div>
    	<SimpleCard>
                <Grid container spacing={3}>
                    <Grid item md={6} xs={12}>
                        <div className="flex-column justify-center items-center">
                            <img
                                className="max-w-full mb-4 max-h-400"
                                src={selectedImage}
                                alt="Product Image"
                            />
                            <div className="flex justify-center items-center">
                                {imageList.map((imgUrl) => (
                                    <img
                                    className={clsx({
                                        'w-80 mx-2 p-2 border-radius-4': true,
                                        [classes.imageBorder]:
                                            selectedImage === imgUrl.imageUrl,
                                    })}
                                        src={imgUrl.imageUrl}
                                        alt="Product Image"
                                        key={imgUrl.imageUrl}
                                        onClick={() => setSelectedImage(imgUrl.imageUrl)}
                                    />
                                ))}
                            </div>
                        </div>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <h4 className="mt-0 mb-4">
                            {product.name}
                        </h4>
                        <p className="text-muted mt-0 mb-2">Price: {product.price}</p>
                        <p className="text-muted mt-0 mb-2">SKU: {product.sku}</p>
                        <p className="mt-0 mb-4">
                            <span className="text-muted">BRAND: </span>
                            <span className="text-primary">
                               {brand.name}
                            </span>
                        </p>

                        <Divider className="mb-4" />
                        <p className="mt-0 mb-4">
                            <span className="text-muted">STORE: </span>
                            <span className="text-primary">
                               {store.name}
                            </span>
                        </p>
                        <p className="mt-0 mb-4">
                            <span className="text-muted">SELLER: </span>
                            <span className="text-primary">
                               {seller.name}
                            </span>
                        </p>
                        <Divider className="mb-4" />
                        <p className="mt-0 mb-2 font-medium text-muted">
                            Have questions about this product
                        </p>
                        <div className="flex items-center mb-4">
                            <Icon
                                className="mr-2"
                                fontSize="small"
                                color="primary"
                            >
                                call
                            </Icon>
                            <h5 className="text-primary m-0">{seller.mobileNo}</h5>
                        </div>
                        <Divider className="mb-4" />

                        <h4 className="mt-0 mb-4">Description</h4>
                        <p>{product.description}</p>
                    </Grid>
                </Grid>
            </SimpleCard>
        </div>
    )
}

export default ProductDetails
