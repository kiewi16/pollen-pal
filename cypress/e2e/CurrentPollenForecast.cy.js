describe('Current Pollen Forecast Page Tests', () => {
    beforeEach(() => {
        cy.fixture('currentpollenforecast').then((currentpollenforecast) => {
            cy.intercept('GET', 'http://dataservice.accuweather.com/forecasts/v1/daily/1day/337466?apikey=RlGJ3tQAAtATkTkWTQvIt9Mhy7FG2RS1&details=true', {
                statusCode: 200,
                body: currentpollenforecast
            })
        })
        cy.fixture('fivedaypollenforecast').then((fivedaypollenforecast) => {
            cy.intercept('GET', 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/337466?apikey=RlGJ3tQAAtATkTkWTQvIt9Mhy7FG2RS1&language=en-us&details=true&metric=false', {
                statusCode: 200,
                body: fivedaypollenforecast
            })
        })
        cy.visit('http://localhost:3000/CurrentPollenForecast')
    })
    it('should land on the Current Pollen Forecast page that has a title, a link to the 5-Day Pollen Forecast, a label for the drop down, a drop down, a search button, and a clear search button', () => {
        cy.get('h2').should('contain', 'Current Pollen Forecast for Highlands Ranch, Colorado')
        cy.get('.five-day-pollen-forecast-link-in-current-pollen-forecast').should('be.visible')
        cy.get('label').should('contain', 'Search By Pollen/Mold Scale Level')
        cy.get('.drop-down').should('be.visible')
        cy.get('.search-button').should('contain', 'SEARCH')
        cy.get('.clear-search-results-button').should('contain', 'CLEAR SEARCH RESULTS')
    })

    it('should see four pollen forecast cards with an allergen type, a number value, and a category', () => {
        cy.get('.current-pollen-forecast-cards-wrapper').should('be.visible')
        cy.get('.current-pollen-forecast-cards-wrapper .current-pollen-forecast-card').should('have.length', 4)
        cy.get('.current-pollen-forecast-cards-wrapper .current-pollen-forecast-card h3').first().should('contain', 'Grass')
        cy.get('.current-pollen-forecast-cards-wrapper .current-pollen-forecast-card .value').first().should('contain', '110')
        cy.get('.current-pollen-forecast-cards-wrapper .current-pollen-forecast-card .category').first().should('contain', 'High')
        cy.get('.current-pollen-forecast-cards-wrapper .current-pollen-forecast-card h3').last().should('contain', 'Tree')
        cy.get('.current-pollen-forecast-cards-wrapper .current-pollen-forecast-card .value').last().should('contain', '0')
        cy.get('.current-pollen-forecast-cards-wrapper .current-pollen-forecast-card .category').last().should('contain', 'Low')
    })

    it('should see a mold/pollen chart with a title and five category descriptions', () => {
        cy.get('.pollen-scale-current-forecast > strong').should('contain', 'Pollen/Mold Scale')
        cy.get('.current-pollen-forecast .category-scale').should('have.length', 5)
        cy.get('.current-pollen-forecast .category-scale').first().should('contain', 'Low: risk of pollen or mold symptoms is low.')
        cy.get('.current-pollen-forecast .category-scale').last().should('contain', 'Extreme: risk of pollen or mold symptoms is extremely high. Avoid outdoor activity.')
    })

    it('should select a pollen/mold scale value in the drop down and hit submit, returning any pollen forecasts that match the search criteria', () => {
        cy.get('.drop-down').select('Low')
        cy.get('.search-button').click()
        cy.get('.current-pollen-forecast-cards-wrapper .search-result-pollen-forecast-card-2').should('have.length', 2)
        cy.get('.current-pollen-forecast-cards-wrapper .search-result-pollen-forecast-card-2 h3').first().should('contain', 'Mold')
        cy.get('.current-pollen-forecast-cards-wrapper .search-result-pollen-forecast-card-2 .value').first().should('contain', '0')
        cy.get('.current-pollen-forecast-cards-wrapper .search-result-pollen-forecast-card-2 .category').first().should('contain', 'Low')
        cy.get('.current-pollen-forecast-cards-wrapper .search-result-pollen-forecast-card-2 h3').last().should('contain', 'Tree')
        cy.get('.current-pollen-forecast-cards-wrapper .search-result-pollen-forecast-card-2 .category').last().should('contain', 'Low')       
    })

    it('should clear the search results when the clear search button is clicked and display four current pollen cards', () => {
        cy.get('.drop-down').select('Low')
        cy.get('.search-button').click()
        cy.get('.current-pollen-forecast-cards-wrapper .search-result-pollen-forecast-card-2').should('have.length', 2)
        cy.get('.clear-search-results-button').click()    
        cy.get('.current-pollen-forecast-cards-wrapper .search-result-pollen-forecast-card-2').should('have.length', 0)
    })

    it('should select a pollen/mold scale level in the drop down and hit submit, returning a message if no pollen forecasts meet the search criteria', () => {
        cy.get('.drop-down').select('Moderate')
        cy.get('.search-button').click()
        cy.get('.current-pollen-forecast-cards-wrapper .search-result-pollen-forecast-card-2').should('have.length', 0)
        cy.get('.search-results-error-message').should('contain', 'No Matches Returned')    
    })

    it('should clear the No Matches Returned message when the clear search results button is clicked', () => {
        cy.get('.drop-down').select('Moderate')
        cy.get('.search-button').click()
        cy.get('.current-pollen-forecast-cards-wrapper .current-pollen-forecast-card').should('have.length', 0)
        cy.get('.search-results-error-message').should('contain', 'No Matches Returned')    
        cy.get('.clear-search-results-button').click()
        cy.get('.search-results-error-message').should('not.exist') 
        cy.get('.current-pollen-forecast-cards-wrapper .current-pollen-forecast-card').should('have.length', 4)
    })

    it('should navigate to the 5-Day Pollen Forecast Page when the 5-Day Pollen Forecast link is clicked', () => {
        cy.get('.five-day-pollen-forecast-link-in-current-pollen-forecast').click()
        cy.url().should('contain', '/FiveDayPollenForecast')
    })

    it('should navigate to the Home Page when the Home Page button is clicked', () => {
        cy.get('button > a').click()
        cy.url().should('contain', '/')
    })
})