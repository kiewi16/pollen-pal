describe('Home Page Tests', () => {
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
    cy.visit('http://localhost:3000')
  })
  it('should land on a home page with a welcome message, a link to the current pollen forecast, a link to the 5-day pollen forecast, an image, a dedication paragraph, and a footer', () => {
    cy.get('h1').should('contain', 'Welcome to Pollen Pal!')
    cy.get('.current-pollen-forecast-link').should('contain', 'Current Pollen Forecast')
    cy.get('.five-day-pollen-forecast-link').should('contain', '5-Day Pollen Forecast')
    cy.get('.sneezing-cat').should('exist')
    cy.get('.homepage-wrapper > p').should('exist')
    cy.get('.footer').should('exist')
  })

  it('should route the user to the Current Pollen Forecast page when the Current Pollen Forecast link is clicked', () => {
    cy.get('.current-pollen-forecast-link').click()
    cy.url().should('contains', '/CurrentPollenForecast')
  })

  it('should route the user to the 5-Day Pollen Forecast page when the 5-Day Pollen Forecast link is clicked', () => {
    cy.get('.five-day-pollen-forecast-link').click()
    cy.url().should('include', '/FiveDayPollenForecast')
  })
})