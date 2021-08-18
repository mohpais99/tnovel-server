import React from 'react'
import ReactPaginate from 'react-paginate';
import './pagination.css'

function Pagination(props) {
    return (
        <div className="col-sm-12">
            <ReactPaginate 
                previousLabel={"Prev"}
                nextLabel={"Next"}
                pageCount={props.pageCount}
                onPageChange={props.handlePageClick}
                breakLabel={"..."}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                disabledClassName={"pagination-disabled"}
                activeClassName={"active"}
            />
        </div>
    )
}

export default Pagination
