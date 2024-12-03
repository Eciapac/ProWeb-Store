import "../../styles/ProductList.scss"; 
import { AiOutlineStar } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { FilterContext } from "../../context/filterContext";
import PropTypes from 'prop-types';
import { useContext, useState } from "react";
import ReactPaginate from 'react-paginate';

const ProductList = ({ products }) => {
    const { grid_view } = useContext(FilterContext);

    // Параметры пагинации
    const itemsPerPage = 12; // Количество элементов на странице
    const [itemOffset, setItemOffset] = useState(0); // Текущий сдвиг
    const endOffset = itemOffset + itemsPerPage;

    // Разделяем продукты для отображения текущей страницы
    const currentItems = products.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(products.length / itemsPerPage);

    // Обработчик клика по пагинации
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % products.length;
        setItemOffset(newOffset);
    };

    return (
        <div className="products">
            <div className="container">
                <div className={`product-list ${grid_view ? 'gridview' : 'listview'}`}>
                    {currentItems.map(product => (
                        <Link to={`/products/${product?.id}`} className='product-item' key={product?.id}>
                            <div className='product-item-img'>
                                <img src={product?.thumbnail} alt={product?.title} className="img-cover" />
                                <div className='product-discount'>{product?.discountPercentage}<span>%</span></div>
                            </div>
                            <div className='product-item-body'>
                                <span className="product-category">{product?.category}</span>
                                <span className='product-title'>{product?.title}</span>

                                <div className='product-price'>
                                    <span className='fw-6 fs-16'>$ &nbsp;{product?.price}</span>
                                    <span className='text-dark'>Brand: {product?.brand}</span>
                                </div>

                                <div className='product-item-bottom fs-12 flex align-center'>
                                    <div><span className='fw-6'>Stock:</span> {product?.stock}</div>
                                    <div className='product-rating flex align-center'><AiOutlineStar />{product?.rating}</div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Пагинация */}
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="Вперед >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="< Назад"
                    containerClassName="pagination"
                    activeClassName="active"
                />
            </div>
        </div>
    );
}

export default ProductList;

ProductList.propTypes = {
    products: PropTypes.array
};
