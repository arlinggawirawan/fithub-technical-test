describe('View and modify list user', () => {
  // Get all list user from page
  it('should retrieve all list of users', () => {
    const fetchUsers = (page) => {
      return cy.request('GET', `https://reqres.in/api/users?page=${page}`);
    };
      cy.request('GET', 'https://reqres.in/api/users?page=1').then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property('total_pages').and.to.be.a('number');
    
          const totalPages = response.body.total_pages;
          
          for (let page = 1; page <= totalPages; page++) {
            fetchUsers(page).then((response) => {
              expect(response.status).to.eq(200);
              expect(response.body).to.have.property('data').and.to.be.an('array');
            });
          }
      });
  });
  // Create new user
  it('should create a new user request', () => {
    const newUser = {
      name: 'Arlingga',
      job: 'Sr. QA Engineer',
    };
      cy.request('POST', 'https://reqres.in/api/users', newUser)
        .then((response) => {
          expect(response.status).to.eq(201);
          expect(response.body).to.have.property('name', newUser.name);
          expect(response.body).to.have.property('job', newUser.job);
          expect(response.body).to.have.property('id');
          expect(response.body.createdAt).to.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/);
          expect(response.headers).to.have.property('content-type', 'application/json; charset=utf-8');
      });
    });
  // Update user information
  it('should update user information', () => {
    cy.requestAPI('PUT', 'https://reqres.in/api/users/2', {
        name: 'Arlingga',
        job: 'Sr. Front End Developer'
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('name', 'Arlingga');
            expect(response.body).to.have.property('job', 'Sr. Front End Developer');
            expect(response.body.updatedAt).to.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/);
        });
    });
    // Delete user information
    it('should delete user information', () => {
      cy.request('DELETE', 'https://reqres.in/api/users/1').then((response => {
        expect(response.status).to.eq(204);
      }));
    });
    // View detail user information
    it('should view detail user information', () => {
      cy.request('GET', 'https://reqres.in/api/users/1').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('data');

        const data = response.body.data;
        expect(data).to.have.property('id').and.to.be.a('number');
        expect(data).to.have.property('email').and.to.be.a('string');
        expect(data).to.have.property('first_name').and.to.be.a('string');
        expect(data).to.have.property('last_name').and.to.be.a('string');
        expect(data).to.have.property('avatar').and.to.be.a('string');
    
        // Assert if user avatar = null, skip file format assertion
        const avatarUrl = response.body.data.avatar;
        if (avatarUrl !== null) {
          const fileFormatRegex = /\.(jpg|jpeg|png|gif)$/;
          expect(avatarUrl).to.match(fileFormatRegex);
        } else {
          cy.log('Avatar URL is null. skip avatar format assertion.');
        }
     });
  });
    // For make video export little bit longer for review
    it('wait for video record duration purpose', () => {
      cy.wait(3000)
  });
});