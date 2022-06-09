import React from "react";
import { useRouter } from "next/router";
import ReactPaginate from "react-paginate";
import useMediaQuery from "../hooks/useMediaQuery";
const Pagination = (props) => {
  const router = useRouter();
  const { page } = router.query;
  const desktop = useMediaQuery("(min-width: 960px)");

  const pageChangeHandler = (e) => {
    router.query.page = e.selected + 1;
    router.push({
      pathname: router.pathname,
      query: router.query,
    });
  };
  return (
    <ReactPaginate
      pageCount={props.count || 200}
      pageRangeDisplayed={desktop ? 8 : 0}
      marginPagesDisplayed={desktop ? 1 : 1}
      initialPage={+page - 1 || 0}
      containerClassName={"paginationBtns"}
      nextClassName={page < 200 ? "nextBtn" : "nextBtnHide"}
      previousClassName={page > 1 ? "previousBtn" : "previousBtnHide"}
      nextLabel={"Next"}
      previousLabel={page > 1 && "Previous"}
      activeClassName={"paginationActive"}
      onPageChange={pageChangeHandler}
    />
  );
};

export default Pagination;
