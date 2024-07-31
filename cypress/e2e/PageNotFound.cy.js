describe('Page Not Found Tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/nonsense')
    })
    it('should land a page with 404 Page Not Found message and a link back to the home page', () => {
        cy.get('h1').should('contain', '404 Page Not Found')
        cy.get('.link-to-home-page').should('be.visible')
    })
    it('should route the user to the Home Page when the Back to Home Page link is clicked', () => {
        cy.get('.link-to-home-page').click()
        cy.url().should('contains', '/')
    })
})