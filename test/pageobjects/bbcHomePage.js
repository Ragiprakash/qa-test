const genericPage = require('./genericPage')

class bbcHomePage {

    get pageHeaderElem() {return $("[class*='ProductNavigationContainer']");}
    get tabElements() {return (("//a[contains(.,'%s')]"));}
    get searchLabel () { return $("[id*='input-label']");}
    get locationTitle() {return $("[id*='wr-location-name-id']");}
    get weatherHighValues() {return ("[class='wr-day-temperature__high'] [class='wr-value--temperature--c']");}
    get weatherLowValues() {return ("[class='wr-day-temperature__low'] [class='wr-value--temperature--c']");}
    get weatherDays() {return ("[class*='wr-day-carousel'] li a[id^='daylink-%s']");}
    get weatherDescription() {return ("[class*='day__details__weather-type-description']");}
    get dayAndDate() {return ("[class*='wr-day__title']");}


    async navigateToHomePage(){
        browser.url("/");
        return await this.getPageHeaderTitle();
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
            let tab =  await $(this.weatherDays.replace('%s',i.toString()));
            let highTemp = await tab.$(this.weatherHighValues).getText();
            let lowTemp = await tab.$(this.weatherLowValues).getText();
            let description = await tab.$(this.weatherDescription).getText();
            let dayAndDate = await tab.$(this.dayAndDate).getAttribute('aria-label');
            console.log("day " +i+ "-" + dayAndDate + "," +description+ "," + lowTemp +"," + highTemp);
        }

    }

}

module.exports = new bbcHomePage();
