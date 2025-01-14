import { toast } from "react-hot-toast"
import { useReducer, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { CircularProgress } from '@mui/material';

import "../AddProduct/AddProduct.css"
import PageHeader from "../../components/PageHeader/PageHeader"
import ProductTopHead from "../../components/Products/ProductTopHead/ProductTopHead"
import ProductsBasicInfo from "../../components/Products/ProductsBasicInfo/ProductsBasicInfo"
import ProductImageVideos from "../../components/Products/ProductImageVideos/ProductImageVideos"
import Category from "../../components/Products/Category/Category"
import Pricing from "../../components/Products/Pricing/Pricing"
import Variants from "../../components/Products/Variants/Variants"
import Type from "../../components/Products/Type/Type"
import SeoOptions from "../../components/Products/SeoOptions/SeoOptions"
import Collection from "../../components/Products/Collection/Collection"
import AddProdutReducer, { initialState } from "../../hooks/editProductsReducer"
import API from "../../services/common"
import { useEffect } from "react";
import { getApprovdProduct } from "../../store/actions/productAction/productAction";
import { useDispatch, useSelector } from "react-redux";
import editProductsReducer from "../../hooks/editProductsReducer";

const EditProduct = () => {
    const dispatch = useDispatch()
    const { productId } = useParams()
    const { products } = useSelector(state => state)
    console.log(products)
    console.log(products.productList)
    const [isLoading, setIsLoading] = useState(false)
    const product = products?.productList?.find(item => item.id == productId)
    const [formState, storeDispatch] = useReducer(editProductsReducer, product);
    const navigate = useNavigate()


    console.log(product)
    console.log(productId)
    console.log(formState)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const res = await API.post("/api/seller/product/", formState);
            console.log(res)
            if (res.status === 200) {
                toast.success("Product added successfully");
                setIsLoading(false)
                navigate("/products")
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
            setIsLoading(false)
        }
    }

    useEffect(() => {
        dispatch(getApprovdProduct())
    }, [])
    return (
        <p>hello</p>
        // <form onSubmit={handleSubmit} className="addProductWrapper">
        //     <PageHeader
        //         headerTitle="Add Products"
        //         headerBtnName="Add Product"
        //         type="back"
        //         handleBack={() => navigate("/products")}
        //         handleClick={() => navigate("/products/add")}
        //     />
        //     <ProductTopHead title="Product Info" />
        //     <ProductsBasicInfo formState={formState} dispatch={dispatch} />
        //     <ProductTopHead title="Image and Video" />
        //     <ProductImageVideos formState={formState} dispatch={dispatch} />
        //     <ProductTopHead title="Type" />
        //     <Type formState={formState} dispatch={dispatch} />
        //     <ProductTopHead title="Category" />
        //     <Category formState={formState} dispatch={dispatch} />
        //     <ProductTopHead title="Collection" />
        //     <Collection formState={formState} dispatch={dispatch} />
        //     <ProductTopHead title="Pricing and Dicount" />
        //     <Pricing formState={formState} dispatch={dispatch} />

        //     <Variants formState={formState} dispatch={dispatch} />
        //     <ProductTopHead title="SEO Tags" />
        //     <SeoOptions formState={formState} dispatch={dispatch} />
        //     <div className="addProductBtn">
        //         <button type="submit" >{isLoading ? <CircularProgress sx={{ color: "white" }}
        //             size={20} /> : "Submit"}</button>
        //     </div>
        // </form>
    )

}

export default EditProduct