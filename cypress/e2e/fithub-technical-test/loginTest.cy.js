describe('Login API https://reqres.in/ Test Case', () => {
    // Positive case scenario
    it('Positive case - Login with valid credentials', () => {
      cy.requestAPI('POST', 'https://reqres.in/api/login', {
            username: 'eve.holt@reqres.in',
            password: 'cityslicka'
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('token');
      });
    });
    it('Get list user with delay response after login success', () => {
        cy.request('GET', 'https://reqres.in/api/users?delay=3').then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('total_pages').and.to.be.a('number');
            expect(response.body).to.have.property('data').and.to.be.an('array');
        });
    });
    // Negative case scenario
    it('Negative case - Login with invalid credentials', () => {
      cy.request({
        method: 'POST',
        url: 'https://reqres.in/api/login',
        body: {
          email: 'arlingga@outlook.co.id',
          password: 'invalidpassword'
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.equal(400);
        expect(response.body).to.have.property('error');
      });
    });
    it('Negative case - Login without input password', () => {
        cy.requestAPIWithError('POST', 'https://reqres.in/api/login',{
            username: 'peter@klaven'
        },{
            failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.equal(400);
          expect(response.body).to.have.property('error');
        });
    });
    it('Negative case - Login without input email', () => {
        cy.requestAPIWithError('POST', 'https://reqres.in/api/login',{
            password: 'cityslicka'
        },{
            failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.equal(400);
          expect(response.body).to.have.property('error');
        });
    });
    // For make video export little bit longer for review
    it('wait for video record duration purpose', () => {
        cy.wait(3000)
    });
});