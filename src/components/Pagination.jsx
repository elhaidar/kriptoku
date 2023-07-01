/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePagination, DOTS } from "./hooks/usePagination";
import "./styles/pagination.css";
import classNames from "classnames";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul
      className={classNames(
        "pagination-container flex items-center justify-center mt-4 mb-8",
        {
          [className]: className,
        }
      )}
    >
      <li
        className={classNames("pagination-item", {
          disabled: currentPage === 1,
        })}
        onClick={onPrevious}
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </li>
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <li className="pagination-item dots" key={index}>
              &#8230;
            </li>
          );
        }

        return (
          <li
            className={classNames("pagination-item", {
              selected: pageNumber === currentPage,
            })}
            onClick={() => onPageChange(pageNumber)}
            key={index}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={classNames("pagination-item", {
          disabled: currentPage === lastPage,
        })}
        onClick={onNext}
      >
        <FontAwesomeIcon icon={faAngleRight} />
      </li>
    </ul>
  );
};

export default Pagination;
