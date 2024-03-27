describe('Register user and patch update after successful register', () => {
    // Check the user with id 20 has register or not
    it('should check single user found', () => {
        cy.request({
            failOnStatusCode: false,
            method: 'GET',
            url: 'https://reqres.in/api/users/20'
        }).then((response) => {
            expect(response.status).to.eq(404);
        });
    });
    // Negative case to register without password
    it('should check register without password is unable', () => {
        cy.requestAPIWithError('POST', 'https://reqres.in/api/register', {
            username: 'arlingga@outlook.co.id'
            },{
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
            });
        });
    // Positive case to register user
    it('should create register user successfully', () => {
        cy.requestAPI('POST', 'https://reqres.in/api/register', {
            email: "eve.holt@reqres.in",
            password: "pistol"
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('id').and.to.be.a('number');
                expect(response.body).to.have.property('token');
            });
        });
    // Update name that already register
    it('should update register user successfully', () => {
        cy.requestAPI('PATCH', 'https://reqres.in/api/users/2', {
            name: "arlingga"
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('name').and.to.be.a('string');
                expect(response.body.updatedAt).to.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/);
        });
    });
    // For make video export little bit longer for review
    it('wait for video record duration purpose', () => {
        cy.wait(3000)
    });
});
