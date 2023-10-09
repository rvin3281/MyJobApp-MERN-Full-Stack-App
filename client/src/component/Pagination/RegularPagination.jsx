import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import Wrapper from '../../assets/wrappers/PageBtnContainer';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RegularPagination = () => {
  const { numOfpages, currentPage } = useSelector((state) => state?.sort?.jobs);

  // * _ => undefined we not going to care
  // * _ => FROM HERE WE CAN GET AN ARRAY OF PAGES NUMBER BASED ON NUM OF PAGES
  const pages = Array.from({ length: numOfpages }, (_, index) => {
    return index + 1;
  });
  // console.log(pages);

  const { search, pathname } = useLocation();
  const navigate = useNavigate();
  console.log(search, pathname);

  // ! PAGINATION HANDLER
  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set('page', pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  return (
    <Wrapper>
      <button
        className="btn prev-btn"
        onClick={() => {
          let prevPage = currentPage - 1;
          if (prevPage < 1) prevPage = numOfpages;
          handlePageChange(prevPage);
        }}
      >
        <HiChevronDoubleLeft />
        Prev
      </button>
      <div className="btn-container">
        {pages.map((pageNum) => {
          return (
            <button
              className={`btn page-btn ${pageNum === currentPage && 'active'}`}
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
            >
              {pageNum}
            </button>
          );
        })}
      </div>
      <button
        className="btn next-btn"
        onClick={() => {
          let nextPage = currentPage + 1;
          if (nextPage > numOfpages) nextPage = 1;
          handlePageChange(nextPage);
        }}
      >
        Next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};
export default RegularPagination;
