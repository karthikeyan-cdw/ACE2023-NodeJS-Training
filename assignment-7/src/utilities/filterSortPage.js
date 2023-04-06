const filterSortPage = (data, queries) => {
  let result = data;
  for (let query in queries) {
    try {
      result = processor[query](result, JSON.parse(queries[query]));
    } catch (error) {
      return { status: 500, data: "Syntax Error", error: error.stack };
    }
  }
  if (result.length === 0) return { status: 404, data: "No Data Found" };
  return { status: 200, data: result };
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
        processor.sortBy(constraint.key, constraint.ascending || true)
      );
    }
    return data;
  },
  page: (data, constraints) => {
    const pNo = constraints.pageNo;
    const pSize = constraints.pageSize;
    return data.slice(pNo * pSize, (pNo + 1) * pSize);
  },
};

module.exports = filterSortPage;
