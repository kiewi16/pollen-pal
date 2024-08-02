describe('5-Day Pollen Forecast Page Tests', () => {
    beforeEach(() => {
        cy.fixture('currentpollenforecast').then((currentpollenforecast) => {
            cy.intercept('GET', 'https://dataservice.accuweather.com/forecasts/v1/daily/1day/337466?apikey=RlGJ3tQAAtATkTkWTQvIt9Mhy7FG2RS1&details=true', {
                statusCode: 200,
                body: currentpollenforecast
            })
        })
        cy.fixture('fivedaypollenforecast').then((fivedaypollenforecast) => {
            cy.intercept('GET', 'https://dataservice.accuweather.com/forecasts/v1/daily/5day/337466?apikey=RlGJ3tQAAtATkTkWTQvIt9Mhy7FG2RS1&language=en-us&details=true&metric=false', {
                statusCode: 200,
                body: fivedaypollenforecast
            })
        })
        cy.visit('http://localhost:3000/FiveDayPollenForecast')
    })

    it('should land on the 5-day Pollen Forecast page that has a title, a link to the Current Pollen Forecast, a label for the drop down inputs, two drop down inputs, a search button, and a clear search button', () => {
        cy.get('h2').should('contain', '5-Day Pollen Forecast for Highlands Ranch, Colorado')
        cy.get('.current-pollen-forecast-link-in-five-day-pollen-forecast').should('be.visible')
        cy.get('label').should('contain', 'Search By Allergen & Pollen/Mold Scale Level')
        cy.get('.allergen-drop-down').should('be.visible')
        cy.get('.clear-search-results-button').should('be.visible')
        cy.get('.search-button').should('contain', 'SEARCH')
        cy.get('.clear-search-results-button').should('contain', 'CLEAR SEARCH RESULTS')
    })

    it('should see five pollen forecast cards each with a date, four allergen types, four number values, and four categories', () => {
        cy.get('.five-day-pollen-forecast-cards-wrapper').should('be.visible')
        cy.get('.five-day-pollen-forecast-cards-wrapper .five-day-pollen-forecast-card').should('have.length', 5)
        cy.get('.five-day-pollen-forecast-cards-wrapper .five-day-pollen-forecast-card .five-day-pollen-forecast-card-p-element').should('have.length', 20)
        cy.get('.five-day-pollen-forecast-cards-wrapper .five-day-pollen-forecast-card h3').first().should('contain', '7/30/2024')
        cy.get('.five-day-pollen-forecast-cards-wrapper').should('contain', 'Grass: 110 (High)')
        cy.get('.five-day-pollen-forecast-cards-wrapper > :nth-child(1) > :nth-child(5)').should('contain', 'Tree: 0 (Low)')
        cy.get('.five-day-pollen-forecast-cards-wrapper .five-day-pollen-forecast-card h3').last().should('contain', '8/3/2024')
        cy.get(':nth-child(5) > :nth-child(2)').should('contain', 'Grass: 30 (High)')
        cy.get(':nth-child(5) > :nth-child(5)').should('contain', 'Tree: 0 (Low)')
    })

    it('should see a mold/pollen chart with a title and five category descriptions', () => {
        cy.get('.pollen-scale > strong').should('contain', 'Pollen/Mold Scale')
        cy.get('.five-day-pollen-forecast .category-scale-low').should('contain', 'Low: risk of pollen or mold symptoms is low.')
        cy.get('.five-day-pollen-forecast .category-scale-extreme').should('contain', 'Extreme: risk of pollen or mold symptoms is extremely high. Avoid outdoor activity.')       
    })

    it('should select an allergen and a pollen/mold scale level in the drop down inputs and hit submit, returning a message and any pollen forecasts that match the search criteria', () => {
        cy.get('.allergen-drop-down').select('Grass')
        cy.get('.scale-level-drop-down').select('High')
        cy.get('.search-button').click()
        cy.get('.five-day-pollen-forecast > :nth-child(5)').should('contain', 'HERE ARE YOUR SEARCH RESULTS:')
        cy.get('.five-day-pollen-forecast-cards-wrapper .search-result-pollen-forecast-card').should('have.length', 5)
        cy.get('.five-day-pollen-forecast-cards-wrapper .search-result-pollen-forecast-card h3').first().should('contain', '7/30/2024')
        cy.get('.five-day-pollen-forecast-cards-wrapper .search-result-forecast-card-p-element').first().should('contain', 'Grass: 110 (High)')
        cy.get('.five-day-pollen-forecast-cards-wrapper .search-result-pollen-forecast-card h3').last().should('contain', '8/3/2024')
        cy.get('.five-day-pollen-forecast-cards-wrapper .search-result-forecast-card-p-element').last().should('contain', 'Tree: 0 (Low)') 
    })

    it('should clear the search results when the clear search button is clicked and display five pollen forecast cards', () => {
        cy.get('.allergen-drop-down').select('Grass')
        cy.get('.scale-level-drop-down').select('High')
        cy.get('.search-button').click()
        cy.get('.five-day-pollen-forecast-cards-wrapper .search-result-pollen-forecast-card').should('have.length', 5)
        cy.get('.clear-search-results-button').click()    
        cy.get('.five-day-pollen-forecast-cards-wrapper .five-day-pollen-forecast-card').should('have.length', 5)
    })

    it('should select an allergen and a pollen/mold scale level in the drop down and hit submit, returning a message if no pollen forecasts meet the search criteria', () => {
        cy.get('.allergen-drop-down').select('Ragweed')
        cy.get('.scale-level-drop-down').select('Moderate')
        cy.get('.search-button').click()
        cy.get('.search-results-error-message').should('contain', 'No Matches Returned')
        cy.get('.five-day-pollen-forecast-cards-wrapper .search-result-pollen-forecast-card').should('have.length', 0)   
        cy.get('.five-day-pollen-forecast-cards-wrapper .five-day-pollen-forecast-card').should('have.length', 0) 
    })

    it('should clear the No Matches Returned message when the clear search results button is clicked', () => {
        cy.get('.allergen-drop-down').select('Ragweed')
        cy.get('.scale-level-drop-down').select('Moderate')
        cy.get('.search-button').click()
        cy.get('.search-results-error-message').should('contain', 'No Matches Returned')   
        cy.get('.five-day-pollen-forecast-cards-wrapper .search-result-pollen-forecast-card').should('have.length', 0)    
        cy.get('.clear-search-results-button').click()
        cy.get('.search-results-error-message').should('not.exist') 
    })

    it('should navigate to the Current Pollen Forecast Page when the Current Pollen Forecast link is clicked', () => {
        cy.get('.current-pollen-forecast-link-in-five-day-pollen-forecast').click()
        cy.url().should('contain', '/CurrentPollenForecast')
    })

    it('should navigate to the Home Page when the Home Page button is clicked', () => {
        cy.get('button > a').click()
        cy.url().should('contain', '/')
    })
})