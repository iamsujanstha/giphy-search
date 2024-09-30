
export function getNumberOfPages(
  rowCount: number,
  rowsPerPage: number
): number {
  return Math.ceil(rowCount / rowsPerPage)
}

export function recalculatePage(prevPage: number, nextPage: number): number {
  return Math.min(prevPage, nextPage)
}

export const paginationRowOpt = [10, 20, 30, 50, 80, 100]

interface GetPageNumbersArgs {
  currentPage: number
  pageSize: number
  total: number
  pageNumbersToShow?: number
}

export const getPageNumbers = ({
  currentPage,
  pageSize,
  total,
  pageNumbersToShow = 3,
}: GetPageNumbersArgs) => {
  const lastPageNumber = Math.ceil(total / pageSize)
  const currentPageNumber =
    currentPage <= lastPageNumber ? currentPage : lastPageNumber
  const maxPagesBeforeCurrentPage = Math.floor(pageNumbersToShow / 2)
  const maxPagesAfterCurrentPage = Math.ceil(pageNumbersToShow / 2) - 1
  let startPage = 1
  let endPage = lastPageNumber

  if (lastPageNumber <= 1) {
    return [1]
  }

  if (currentPageNumber <= maxPagesBeforeCurrentPage) {
    // near the start
    startPage = 1
    endPage = pageNumbersToShow
  } else if (currentPageNumber + maxPagesAfterCurrentPage >= lastPageNumber) {
    // near the end
    startPage = lastPageNumber - pageNumbersToShow + 1
  } else {
    // somewhere in the middle
    startPage = currentPageNumber - maxPagesBeforeCurrentPage
    endPage = currentPageNumber + maxPagesAfterCurrentPage
  }

  let pageNumbers: (string | number)[] = Array.from(
    Array(endPage + 1 - startPage).keys()
  )
    .map((pageNumber) => startPage + pageNumber)
    .filter((pageNumber) => pageNumber <= lastPageNumber && pageNumber > 0)

  if (Number(pageNumbers[0]) > 1) {
    if (Number(pageNumbers[0]) <= 2) {
      pageNumbers = [1, ...pageNumbers]
    } else {
      const ellipsis = Number(pageNumbers[0]) > 3 ? '...' : 2
      pageNumbers = [1, ellipsis, ...pageNumbers]
    }
  }

  if (pageNumbers[pageNumbers.length - 1] !== lastPageNumber) {
    if (pageNumbers[pageNumbers.length - 1] === lastPageNumber - 1) {
      pageNumbers = [...pageNumbers, lastPageNumber]
    } else {
      const ellipsis =
        Number(pageNumbers[pageNumbers.length - 1]) < lastPageNumber - 2
          ? '...'
          : lastPageNumber - 1
      pageNumbers = [...pageNumbers, ellipsis, lastPageNumber]
    }
  }

  return pageNumbers
}
