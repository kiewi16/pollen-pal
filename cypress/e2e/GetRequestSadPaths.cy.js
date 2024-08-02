describe('Get Request Sad Paths', () => {
    it('should display a message to the user if the network request for current pollen forecast data is unsuccessful', () => {
        cy.intercept('GET', 'https://dataservice.accuweather.com/forecasts/v1/daily/1day/337466?apikey=RlGJ3tQAAtATkTkWTQvIt9Mhy7FG2RS1&details=true', {
            statusCode: 500,
        })
        cy.visit('http://localhost:3000/CurrentPollenForecast')
        cy.get('.error-message').should('contain', "We've encountered an unexpected error and were unable to get the current pollen forecast for Highlands Ranch, CO. Please try again later.")
    })
    it('should display a message to the user if the network request for 5-day forecast data is unsuccessful', () => {
        cy.intercept('GET', 'https://dataservice.accuweather.com/forecasts/v1/daily/5day/337466?apikey=RlGJ3tQAAtATkTkWTQvIt9Mhy7FG2RS1&language=en-us&details=true&metric=false', {
            statusCode: 500,
        })
        cy.visit('http://localhost:3000/FiveDayPollenForecast')
        cy.get('.error-message').should('contain', "We've encountered an unexpected error and were unable to get the 5-day pollen forecast for Highlands Ranch, CO. Please try again later.")
    })
})
