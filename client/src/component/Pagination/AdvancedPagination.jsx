import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import Wrapper from '../../assets/wrappers/PageBtnContainer';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

const AdvancedPagination = () => {
  const { numOfpages, currentPage } = useSelector((state) => state?.sort?.jobs);

  // * _ => undefined we not going to care
  // * _ => FROM HERE WE CAN GET AN ARRAY OF PAGES NUMBER BASED ON NUM OF PAGES
  const pages = Array.from({ length: numOfpages }, (_, index) => {
    return index + 1;
  });
  // console.log(pages);

  const { search, pathname } = useLocation();
  const navigate = useNavigate();
  // console.log(search, pathname);

  // ! PAGINATION HANDLER
  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    // console.log(searchParams);

    // * 'page' ===> THIS IS THE NAME WE PLACED ON THE BACKEND
    searchParams.set('page', pageNumber);

    // * HERE WE ARE STRUCTURING THE THE URL --> Ex: http://localhost:5173/dashboard/all-jobs-admin?page=2
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  const addPageButton = ({ pageNumber, activeClass }) => {
    return (
      <button
        className={`btn page-btn ${activeClass && 'active'}`}
        key={uuidv4()}
        onClick={() => handlePageChange(pageNumber)}
      >
        {`${pageNumber}`}
        {/* {pageNumber} */}
      </button>
    );
  };

  const renderPageButton = () => {
    const pageButtons = [];

    // * FIRST PAGE
    pageButtons.push(
      addPageButton({ pageNumber: 1, activeClass: currentPage === 1 }),
    );

    // DOTS
    if (currentPage > 3) {
      pageButtons.push(
        <span className="page-btn dots" key="dots-1">
          ...
        </span>,
      );
    }

    // * ONE BEFORE CURRENT PAGE
    if (currentPage !== 1 && currentPage !== 2) {
      pageButtons.push(
        addPageButton({
          pageNumber: currentPage - 1,
          activeClass: false,
        }),
      );
    }

    // Cuurent Page
    if (currentPage !== 1 && currentPage !== numOfpages) {
      pageButtons.push(
        addPageButton({
          pageNumber: currentPage,
          activeClass: true,
        }),
      );
    }

    // * ONE AFTER CURRENT PAGE
    if (currentPage !== numOfpages && currentPage !== numOfpages - 1) {
      pageButtons.push(
        addPageButton({
          pageNumber: currentPage + 1,
          activeClass: false,
        }),
      );
    }

    // DOTS
    if (currentPage < numOfpages - 2) {
      pageButtons.push(
        <span className="page-btn dots" key="dots+1">
          ...
        </span>,
      );
    }

    pageButtons.push(
      addPageButton({
        pageNumber: numOfpages,
        activeClass: currentPage === numOfpages,
      }),
    );
    return pageButtons;
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
      <div className="btn-container">{renderPageButton()}</div>
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
export default AdvancedPagination;
