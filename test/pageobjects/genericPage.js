class generic_Page{

    get timeOut() {
        return browser.config.waitForTimeout;
    }

    clickOnElement(element, timeout = this.timeOut) {
        element.click();
    }

    waitForElementToBeDisplayed(element, timeout = this.timeOut) {
        element.waitForDisplayed(timeout, undefined, `Element '${element.selector}' is not exist after ${timeout} milliseconds`);
    }


}

module.exports = new generic_Page();

