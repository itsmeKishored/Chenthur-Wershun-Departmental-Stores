// import { Fragment, useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getProducts } from "../actions/productActions";
// import Loader from "./layouts/Loader";
// import MetaData from "./layouts/MetaData";
// import Product from "./product/Product";
// import  {toast} from 'react-toastify';
// import Pagination from 'react-js-pagination';

// export  default function Home(){
//     const dispatch = useDispatch();
//     const {products, loading, error, productsCount, resPerPage} =    useSelector((state) => state.productsState)
//     const [currentPage, setCurrentPage] = useState(1);
 
//     const setCurrentPageNo = (pageNo) =>{

//         setCurrentPage(pageNo)
       
//     }

//     useEffect(()=>{
//         if(error) {
//             return toast.error(error,{
//                 position: toast.POSITION.BOTTOM_CENTER
//             })
//         }
//         dispatch(getProducts(null, null, null, null, currentPage)) 
//     }, [error, dispatch, currentPage])


//     return (
//         <Fragment>
//             {loading ? <Loader/>:
//                 <Fragment>
//                     <MetaData title={'Buy Best Products'} />
//                     <h1 id="products_heading">Latest Products</h1>
//                     <section id="products" className="container mt-5">
//                         <div className="row">
//                             { products && products.map(product => (
//                                 <Product col={4} key={product._id}  product={product}/>
//                             ))}
        
//                         </div>
//                     </section>
//                     {productsCount > 0 && productsCount > resPerPage?
//                     <div className="d-flex justify-content-center mt-5">
//                            <Pagination 
//                                 activePage={currentPage}
//                                 onChange={setCurrentPageNo}
//                                 totalItemsCount={productsCount}
//                                 itemsCountPerPage={resPerPage}
//                                 nextPageText={'Next'}
//                                 firstPageText={'First'}
//                                 lastPageText={'Last'}
//                                 itemClass={'page-item'}
//                                 linkClass={'page-link'}
//                            />     
//                     </div> : null }
//                 </Fragment>
//            }
//         </Fragment>
//     )
// }

import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";
import Loader from "./layouts/Loader";
import MetaData from "./layouts/MetaData";
import Product from "./product/Product";
import { toast } from 'react-toastify';
import Pagination from 'react-js-pagination';

export default function Home() {
    const dispatch = useDispatch();
    const { products, loading, error, productsCount, resPerPage } = useSelector((state) => state.productsState);
    const [currentPage, setCurrentPage] = useState(1);
    const [category, setCategory] = useState(null);  // Added category state

    const categories = [
        'Snacks',
        'Food',
        'Groceries',
        'Beauty/Health',
    ];

    const setCurrentPageNo = (pageNo) => {
        setCurrentPage(pageNo);
    };

    useEffect(() => {
        if (error) {
            return toast.error(error, {
                position: toast.POSITION.BOTTOM_CENTER
            });
        }
        dispatch(getProducts(null, null, category, null, currentPage));  // Pass the category
    }, [error, dispatch, currentPage, category]);  // Add category to the dependency array

    return (
        <Fragment>
            {loading ? <Loader /> :
                <Fragment>
                    <MetaData title={'Buy Best Products'} />
                    <h1 id="products_heading">Latest Products</h1>

                    <div className="container mt-5">
                        <div className="row">
                            {/* Left Column: Category Filter */}
                            <div className="col-md-3">
                                <h3 className="mb-3">Categories</h3>
                                <ul className="list-group">
                                    {categories.map(cat => (
                                        <li
                                            className={`list-group-item ${category === cat ? 'active' : ''}`}  // Highlight selected category
                                            style={{ cursor: "pointer" }}
                                            key={cat}
                                            onClick={() => {
                                                setCategory(cat);
                                                setCurrentPage(1);  // Reset to page 1 when category changes
                                            }}
                                        >
                                            {cat}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Right Column: Products */}
                            <div className="col-md-9">
                                <section id="products" className="row">
                                    {products && products.map(product => (
                                        <Product col={4} key={product._id} product={product} />
                                    ))}
                                </section>

                                {productsCount > 0 && productsCount > resPerPage ?
                                    <div className="d-flex justify-content-center mt-5">
                                        <Pagination
                                            activePage={currentPage}
                                            onChange={setCurrentPageNo}
                                            totalItemsCount={productsCount}
                                            itemsCountPerPage={resPerPage}
                                            nextPageText={'Next'}
                                            firstPageText={'First'}
                                            lastPageText={'Last'}
                                            itemClass={'page-item'}
                                            linkClass={'page-link'}
                                        />
                                    </div> : null}
                            </div>
                        </div>
                    </div>
                </Fragment>
            }
        </Fragment>
    );
}
