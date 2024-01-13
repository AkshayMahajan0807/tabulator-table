class CommanClass {
  /**
   * type {URLSearchParams}
   */
  #searchParam = null;
  constructor() {
    this.#searchParam = new URLSearchParams(window.location.search);
  }
  /**
   *
   * @param {string} value
   * @param {string} title
   * @param {string} defaultValue
   * @returns
   */
  _option(value, title, defaultValue) {
    return `<option value="${value}" ${defaultValue == value ? "selected" : ""}
      >${title}</option>`;
  }

  /**
   * @abstract
   * @param {[]} data
   * @description set to the existing data
   */
  setHTMLFormData(data) {}
  checkNumberAndConvert(value) {
    const num = +value;
    return Number.isNaN(num) ? 0 : num;
  }
  /**
   *
   * @param {[]any} listingData
   * @param {string} valueKey
   * @param {string} titleKey
   * @param {string} defaultValue
   * @param {string} firstOptionTitle
   * @returns
   */
  optionListingWithJoin(
    listingData = [],
    valueKey = "",
    titleKey = "",
    defaultValue = "",
    firstOptionTitle = "निवड करा"
  ) {
    const firstOption = this._option("", firstOptionTitle);
    const optionList = listingData.map((item) =>
      this._option(item[valueKey], item[titleKey], defaultValue)
    );
    optionList.unshift(firstOption);
    return optionList.join("");
  }

  /**
   *
   * @param {Element} selector
   * @typedef {}
   * @description for this is use for particular selector to pass as arguemnt then it will
   *
   * @returns { id:string, title:string,parent:Element }:{}
   */
  getELementIDAndTitle(selector) {
    const id = selector.id;
    const parent = selector.closest("div");
    const title = selector.previousElementSibling.innerHTML;
    return { id, title, parent };
  }
  backBtnToReload() {
    const perfEntries = performance.getEntriesByType("navigation");
    if (perfEntries[0].type === "back_forward") {
      location.reload();
    }
  }

  /**
   *
   * @param {string} id
   * @description for this is for use by name and id
   * @param {string} title
   * @description for this is for use by title for lable and lable inner html text
   * @param {string} value
   * @description for this is use to dynamic value
   * @returns {HTML}
   */
  setToTheTextFieldData(id, title, value, division_id) {
    return `
      <label class="form-label " style="font-family:kokila; font-size:17px; line-height: 23px;" for="${id}">${title}</label>
      <input type="text" class="form-control" id="${id}" name="${id}" data-id="${division_id}" value="${value}" readonly  placeholder="${title}" />`;
  }

  /**
   *
   * @param {*} id
   * @returns {Element||null}
   */
  querySelector(id = "") {
    if (!id) {
      alert("please provide id ");
      return;
    }
    return document.querySelector(
      `#${CommanClass.gatNoReformat.call(CommanClass, id)}`
    );
  }

  /**
   *
   * @param {Element} formSelector
   * @returns
   */
  getFormData(formSelector) {
    const form = new FormData(formSelector);
    return Object.fromEntries(form);
  }

  /**
   * @description js object convert into stringify data
   * @param {{}|[]} data
   * @returns string
   */
  stringifyData(data) {
    if (!data) return "";
    return JSON.stringify(data);
  }

  /**
   * @description  stringify data convert into js objects
   * @param {string} data
   * @returns {[]|{}}
   */
  parseData(data) {
    if (data == "" || data == undefined) return [];
    return JSON.parse(data);
  }

  /**
   *
   * @param {string} gatNo
   * @returns
   */
  static gatNoReformat(gatNo) {
    return gatNo.split("/").join("_");
  }

  /**
   *
   * @param {string} data
   * @returns{[]}
   */
  splitAndTrimData(data) {
    if (!data) {
      return [];
    }
    let splitedData = data.split(",").map((item) => item.trim());
    return splitedData;
  }

  /**
   *
   * @param {number[]} gat_no
   * @returns {boolean}
   */
  dataisExist(gat_no = [], formData = []) {
    return gat_no.every((gat_no) => {
      return formData.find((item) => item.gat_no === gat_no)?.gat_no === gat_no;
    });
  }

  /**
   *
   * @param {number[]} gat_no
   * @param {any[]} formData
   * @returns {number[]}
   */
  nonExistingData(gat_no = [], formData = []) {
    const oldGatNumber = formData.map((item) => item.gat_no);
    const data = gat_no.filter((num) => {
      return !oldGatNumber.includes(num);
    });
    return data;
  }

  /**
   *
   * @param {Element} selector
   * @param {string} FORM_NAME
   * @param {string|number[]} deletedGatNumber
   */
  removeForm(selector, FORM_NAME, deletedGatNumber) {
    deletedGatNumber.forEach((num) => {
      const current = selector.querySelector(
        `#${FORM_NAME}-${CommanClass.gatNoReformat.call(CommanClass, num)}`
      );
      current && current.remove();
    });
  }

  /**
   *
   * @param {string} keyName
   * @returns
   */
  getLocalStorageData(keyName) {
    if (!keyName) return;
    const data = localStorage.getItem(keyName);
    if (!data) {
      alert("No data found in local storage!!!!");
      return "";
    }
    return this.parseData(data);
  }

  /**
   *
   * @param {string} keyName
   * @param {any} value
   */
  setLocalStorageData(keyName, value) {
    if (!keyName && !value) {
      value = JSON.stringify(value);
      localStorage.setItem(keyName, value);
    }
  }
  /**
   *
   * @param {number|string[]} oldGatNumber
   * @param {number|string[]} currentGatNumber
   * @returns{number|string[]}
   */
  getDeletedGatNumber(oldGatNumber, currentGatNumber) {
    return oldGatNumber.filter((num) => !currentGatNumber.includes(num));
  }

  /**
   *
   * @param {any[]} formData
   * @param {number|string[]} deletedGatNumber
   * @returns {object[]}
   */
  removeDeletedGatNumberObj(formData, deletedGatNumber) {
    return formData.filter((item) => !deletedGatNumber.includes(item.gat_no));
  }
  /**
   *
   * @param {[]} formDataArray
   * @param {any} currentFormData
   * @returns {{currentItem:any,currentIndex:number,formDataArray:any[],isExistense:boolean}}
   * @description if data is exist then replace it.
   */
  findFormDataAndIndex_replaceData(formDataArray, currentFormData) {
    let isExistense = false;
    console.log(formDataArray, currentFormData);
    const currentItem = formDataArray.find(
      (item) => currentFormData.gat_no === item.gat_no
    );
    const currentIndex = formDataArray.findIndex(
      (item) => currentFormData.gat_no === item.gat_no
    );
    console.log("currentItem, currentIndex", currentItem, currentIndex);
    /**
     * @description here we will assign old object id assign to new object
     */
    if (currentIndex !== -1) {
      isExistense = true;
      currentFormData.id = currentItem.id;

      /**
       * @description  here we will be replace it
       */
      formDataArray.splice(currentIndex, 1, currentFormData);
      /**
       * @description here will be return
       */
      return { currentItem, currentIndex, formDataArray, isExistense };
    } else {
      return { currentItem, currentIndex, formDataArray, isExistense };
    }
  }

  /**
   *
   * @param {string} name
   */
  getQueryParam(name) {
    if (this.#searchParam.has(name)) {
      return this.#searchParam.get(name);
    }
    return;
  }
}

class TagifyClass extends CommanClass {
  #tagify;
  constructor(id) {
    super();
    this.#tagify = new Tagify(this.querySelector(id));
  }

  getTagify() {
    return this.#tagify;
  }
  getInputData() {
    return this.#tagify.value;
  }
  addInputValues(inputValues = []) {
    this.#tagify.addTags(inputValues);
  }
  getInputArrayAsTitle() {
    return this.#tagify.value.map((item) => item.value);
  }
}
