// importing required modules
const constants = require("../../constants");

/**
 * The function filters, sorts, and paginates data based on given queries.
 * @param data - The `data` parameter is an array of objects that needs to be filtered, sorted, and
 * paginated based on the provided queries.
 * @param queries - The `queries` parameter is an object containing key-value pairs where the key
 * represents the type of query to be performed (e.g. "filter", "sort", "page") and the value is a
 * stringified JSON object containing the parameters for that query. The `filterSortPage` function
 * applies.
 * @returns The function `filterSortPage` returns an object with a `status` and `data` property. If an
 * error occurs during the processing of the queries, it also includes an `error` property. If the
 * result is an empty array, it returns a `NOT_FOUND` status code and a message indicating that the
 * task was not found. Otherwise, it returns an `OK` status code and data.
 */
const filterSortPage = (data, queries) => {
  let result = data;
  for (let query in queries) {
    try {
      result = processor[query](result, JSON.parse(queries[query]));
    } catch (error) {
      return {
        status: constants.CODES.INTERNAL_SERVER_ERROR,
        data: constants.MESSAGES.SYNTAX_ERROR,
        error: error.stack,
      };
    }
  }
  if (result.length === 0)
    return {
      status: constants.CODES.NOT_FOUND,
      data: constants.MESSAGES.TASK_NOT_FOUND,
    };
  return { status: constants.CODES.OK, data: result };
};

const processor = {
  filter: (data, constraints) => {
    for (let constraint of constraints) {
      data = data.filter((item) => {
        for (var key in constraint) {
          if (item[key] === undefined || item[key] != constraint[key])
            return false;
        }
        return true;
      });
    }
    return data;
  },
  sortBy: (prop, asc) => {
    if (asc)
      return function (a, b) {
        if (a[prop] > b[prop]) return 1;
        else if (a[prop] < b[prop]) return -1;
        return 0;
      };
    return function (a, b) {
      if (a[prop] < b[prop]) return 1;
      else if (a[prop] > b[prop]) return -1;
      return 0;
    };
  },
  sort: (data, constraints) => {
    for (let constraint of constraints.reverse()) {
      data = data.sort(
        processor.sortBy(constraint.key, constraint.ascending ?? true)
      );
    }
    return data;
  },
  page: (data, constraints) => {
    const pNo = constraints.pageNo ?? 0;
    const pSize = constraints.pageSize ?? 10;
    return data.slice(pNo * pSize, (pNo + 1) * pSize);
  },
};

module.exports = filterSortPage;
