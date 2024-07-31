describe('5-Day Pollen Forecast Page Tests', () => {
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
        cy.visit('http://localhost:3000/FiveDayPollenForecast')
    })
    it('should land on the 5-day Pollen Forecast page that has a title, a link to the Current Pollen Forecast, a label for the drop downs, two drop downs, a search button, and a clear search button', () => {
        cy.get('h2').should('contain', '5-Day Pollen Forecast for Highlands Ranch, Colorado')
        cy.get('.current-pollen-forecast-link-in-five-day-pollen-forecast').should('be.visible')
        cy.get('label').should('contain', 'Search By Allergen & Pollen/Mold Scale Level')
        cy.get('.drop-down').should('have.length', 2)
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
        cy.get('.five-day-pollen-forecast .category-scale').should('have.length', 5)
        cy.get('.five-day-pollen-forecast .category-scale').first().should('contain', 'Low: risk of pollen or mold symptoms is low.')
        cy.get('.five-day-pollen-forecast .category-scale').last().should('contain', 'Extreme: risk of pollen or mold symptoms is extremely high. Avoid outdoor activity.')       
    })

    it.only('should select an allergen and a pollen/mold scale level in the drop downs and hit submit, returning any pollen forecasts that match the search criteria', () => {
        cy.get('.allergen-drop-down').select('Grass')
        cy.get('.scale-level-drop-down').select('High')
        cy.get('.search-button').click()
        // cy.get('.five-day-pollen-forecast-cards-wrapper .five-day-pollen-forecast-card h3').first().should('contain', '7/30/2024')
        // cy.get('.five-day-pollen-forecast-cards-wrapper').should('contain', 'Grass: 110 (High)')
        // cy.get('.five-day-pollen-forecast-cards-wrapper .five-day-pollen-forecast-card h3').last().should('contain', '8/3/2024')
        // cy.get(':nth-child(5) > :nth-child(2)').should('contain', 'Grass: 30 (High)')    
    })

    // it('should clear the search results when the clear search button is clicked and display four current pollen cards', () => {
    //     cy.get('.drop-down').select('Low')
    //     cy.get('.search-button').click()
    //     cy.get('.current-pollen-forecast-cards-wrapper .current-pollen-forecast-card').should('have.length', 2)
    //     cy.get('.clear-search-results-button').click()    
    //     cy.get('.current-pollen-forecast-cards-wrapper .current-pollen-forecast-card').should('have.length', 4)
    // })

    it('should select an allergen and a pollen/mold scale level in the drop down and hit submit, returning a message if no pollen forecasts meet the search criteria', () => {
        cy.get('.allergen-drop-down').select('Ragweed')
        cy.get('.scale-level-drop-down').select('Moderate')
        cy.get('.search-button').click()
        cy.get('.search-results-error-message').should('contain', 'No Matches Returned')    
    })

    it('should clear the No Matches Returned message when the clear search results button is clicked', () => {
        cy.get('.allergen-drop-down').select('Ragweed')
        cy.get('.scale-level-drop-down').select('Moderate')
        cy.get('.search-button').click()
        cy.get('.search-results-error-message').should('contain', 'No Matches Returned')    
        cy.get('.clear-search-results-button').click()
        cy.get('.search-results-error-message').should('not.exist') 
        cy.get('.five-day-pollen-forecast .category-scale').should('have.length', 5)
    })

    it('should navigate to the Current Pollen Forecast Page when the Current Pollen Forecast link is clicked', () => {
        cy.get('.current-pollen-forecast-link-in-five-day-pollen-forecast').click()
        cy.url().should('contain', '/CurrentPollenForecast')
    })
})