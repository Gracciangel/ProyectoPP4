describe('Recorrido 1', () => {
  it('Un usuario se registra, se loguea y ve los libros disponibles', () => {
    cy.visit('http://localhost:5173/');
    cy.get('ul').contains('Registrar').click();
    cy.location('pathname').should('equal', '/register');

    cy.get('input').eq(0).type('Prueba');
    cy.get('input').eq(1).type('Prueba@gmail.com');
    cy.get('input').eq(2).type('Prueba123');
    cy.get('button').contains('Registrar').click();
    cy.get('.chakra-alert__title')
      .should('exist')
      .contains('El usuario Prueba fue agregado exitosamente');
    
    cy.get('ul svg').click();
    cy.location('pathname').should('equal', '/login');
    
    cy.get('input').eq(0).type('fernando@gmail.com');
    cy.get('input').eq(1).type('Fernando123');
    cy.get('button').contains('Iniciar Sesion').click();
    
    cy.location('pathname').should('equal', '/perfil');
    cy.get('h1').contains('hola Fernando');

    cy.get('ul').contains('Libros').click();
    cy.location('pathname').should('equal', '/books');
    cy.get('.cards-grid').should('be.visible');
  })
})