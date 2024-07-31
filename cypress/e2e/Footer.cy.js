describe('Footer Tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })
    it('should have an AccuWeather API section, an About Me section, and a Data Explanation section with links', () => {
        cy.get('.accuweather-section').should('be.visible')
        cy.get('.accuweather-section > p').should('contain', 'AccuWeather APIs')
        cy.get('.accuweather').should('be.visible')
        cy.get('.info-section').should('be.visible')
        cy.get('.name').should('contain', 'Kim Ewing')
        cy.get('.github').should('be.visible')
        cy.get('.linkedin').should('be.visible')
        cy.get('.data-explaination-section').should('be.visible')
        cy.get('.data-explaination').should('contain', 'Data Explanation')
    })
})