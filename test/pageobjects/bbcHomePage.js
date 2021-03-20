const genericPage = require('./genericPage')

class bbcHomePage {

    get pageHeaderElem() {return $("[class*='ProductNavigationContainer']");}
    get tabElements() {return (("//a[contains(.,'%s')]"));}
    get searchLabel () { return $("[id*='input-label']");}
    get locationTitle() {return $("[id*='wr-location-name-id']");}
    get weatherDays() {return ("[class*='wr-day-carousel'] li a[id='daylink-%s']");}
    get weatherHighValues() {return ((`${this.weatherDays} [class='wr-day-temperature__high'] [class='wr-value--temperature--c']`));}
    get weatherLowValues() {return ((`${this.weatherDays} [class='wr-day-temperature__low'] [class='wr-value--temperature--c']`));}
    get weatherDescription() {return ((`${this.weatherDays} [class*='day__details__weather-type-description']`));}
    get dayAndDate() {return ((`${this.weatherDays} [class*='wr-day__title']`));}
    get cookies() {return $("[id='bbccookies-continue-button']");}


    async navigateToHomePage(){
        browser.url("/");
        return await this.getPageHeaderTitle();
    }

    async acceptCookies(){
        let cookies = await this.cookies;
        if(cookies.isDisplayed()){
            cookies.click();
        }
    }

    async  getPageHeaderTitle() {
        let headerElement = await this.pageHeaderElem;
        await genericPage.waitForElementToBeDisplayed(headerElement);
        return headerElement.getText();
    }

    async clickOnTab(elemName){
        let matchingElem = await $(this.tabElements.replace('%s',elemName));
        await genericPage.clickOnElement(matchingElem);
    }

    async searchBox(){
        let searchLabel = await this.searchLabel;
        let holderText = await searchLabel.getAttribute('placeholder');
        return holderText;
    }

    async applyLocationFilter(filterElem){
        let searchField = await this.searchLabel;
        await genericPage.clickOnElement(searchField);
        await searchField.setValue(filterElem);
        await this.clickOnTab(filterElem);
        let location = await this.locationTitle;
        await genericPage.waitForElementToBeDisplayed(location);
        return location.getText();
    }

    async getWeatherDetails(){
        for(let i=1; i < 4; i++) {
            let highTemp = await $(this.weatherHighValues.replace('%s',i.toString()));
            let lowTemp = await $(this.weatherLowValues.replace('%s',i.toString()));
            let description = await $(this.weatherDescription.replace('%s',i.toString()));
            let dayAndDate = await $(this.dayAndDate.replace('%s',i.toString()));
            console.log("Day " +i+ "-" + await dayAndDate.getAttribute('aria-label') + await description.getText()+ ",Min Temp-" + await lowTemp.getText() +",Max Temp-" + await highTemp.getText());
        }

    }

}

module.exports = new bbcHomePage();
