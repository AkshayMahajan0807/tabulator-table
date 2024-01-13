class TabulatorTable extends CommanClass {
  table;
  curretUrl;
  user;
  role;
  paginationSizeSelector;
  paginationSize;
  paginationDataReceived;
  paginationDataSent;
  tableSelector;
  #tabulator;
  STRUCTType;
  #tableData;
  constructor(
    tableSelectorID,
    curretUrl,
    tableData,
    paginationSizeSelector = [10, 25, 50, 100],
    paginationSize = 25,
    paginationDataSent = {
      page: "page",
      size: "perPage",
    },
    paginationDataReceived = {
      last_page: "last_page",
      current_page: "current_page",
      data: "data",
    }
  ) {
    super();
    this.tableSelector = this.querySelector(tableSelectorID);
    this.#tableData = tableData;
    this.user = this.getLocalStorageData("user");
    this.paginationSizeSelector = paginationSizeSelector;
    this.curretUrl = curretUrl;
    this.paginationSize = paginationSize;
    this.paginationDataSent = paginationDataSent;
    this.paginationDataReceived = paginationDataReceived;
    this.#tabulator = this.loadTabulatorTable();
  }

  getURL() {
    return this.curretUrl;
  }
  ajaxConfig() {
    return {
      method: "POST", // Change type to method
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json", // You may need to specify this header
      },
    };
  }

  getAjaxParam() {
    const { role } = this.user;
    let params = { role };
    if (role === "circle") {
      const { circle_id } = this.user;
      params.circle_id = circle_id;
    } else if (role === "vibhag") {
      const { vibhag_id } = this.user;
      params.division_id = vibhag_id;
    }
    return params;
  }
  getPaginationDataReceived() {
    return this.paginationDataReceived;
  }
  loadTabulatorTable() {
    return new Tabulator(this.tableSelector, {
      ajaxURL: this.getURL.call(this),
      ajaxConfig: this.ajaxConfig.call(this),
      ajaxContentType: "json", // Ensure that you're sending JSON

      ajaxParams: this.getAjaxParam.call(this),
      pagination: "remote",
      paginationSize: this.paginationSize,

      layout: "fitColumns",
      paginationDataReceived: this.getPaginationDataReceived.call(this),
      ajaxResponse: this.getAjaxResponse.bind(this),
      paginationSizeSelector: this.getPaginationSizeSelector.call(this),
      paginationDataSent: this.getPaginationDataSent.call(this),
      columns: this.getTabulatorColumnData.call(this),
    });
  }
  getPaginationDataSent() {
    return this.paginationDataSent;
  }
  getPaginationSizeSelector() {
    return this.paginationSizeSelector;
  }
  setToThePayloadForPagination(res) {
    if (
      res.status === 204 ||
      res?.status === 404 ||
      !res?.data ||
      res?.data.length === 0
    ) {
      // Display message to user
      // Return an empty data set
      return {
        last_page: 0,
        current_page: 1,
        data: [],
      };
    }

    return {
      last_page: res.pagination.total_pages,
      current_page: res.pagination.page,
      data: res.data,
    };
  }
  getAjaxResponse(url, params, response) {
    return this.setToThePayloadForPagination(response);
  }
  getTabulatorColumnData() {
    return this.#tableData;
  }
}
