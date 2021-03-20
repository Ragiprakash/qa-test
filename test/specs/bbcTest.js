const expect = require('chai').expect;
const homePage = require('../pageobjects/bbcHomePage');


describe("Test bbc weather", async () => {
    it("Navigate to BBC Homepage", async ()  => {
        let actualTitle = await homePage.navigateToHomePage();
        expect(actualTitle).to.equal('Welcome to the BBC', 'Header Title is not as expected');
    })

    it('should accept cookies', async () => {
        await homePage.acceptCookies();
    })

    it('should click on weather tab and validate search box text', async () => {
        await homePage.clickOnTab('Weather');
        let searchText = await homePage.searchBox();
        expect(searchText).to.equal('Enter a town, city or UK postcode', 'Search Text is not as expected');
    })

    it('should be able to search city', async () => {
        let appliedLocation = await homePage.applyLocationFilter('Melbourne, Australia');
        expect(appliedLocation).to.equal('Melbourne', 'Search Text is not as expected');
    })

    it('should be able apply filters', async () => {
        let appliedLocation = await homePage.applyLocationFilter('Melbourne, Australia');
        expect(appliedLocation).to.equal('Melbourne', 'Search Text is not as expected');
    })

    it('should be able get weather details', async () => {
        await homePage.getWeatherDetails();
    })







})
