const { expect } = require('chai')
const userController = require('../src/controllers/user')
const db = require('../src/dbClient')

describe('User', () => {
  
  beforeEach(() => {
    // Clean DB before each test
    db.flushdb()
  })

  describe('Create', () => {

    it('create a new user', (done) => {
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      userController.create(user, (err, result) => {
        expect(err).to.be.equal(null)
        expect(result).to.be.equal('OK')
        done()
      })
    })

    it('passing wrong user parameters', (done) => {
      const user = {
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      userController.create(user, (err, result) => {
        expect(err).to.not.be.equal(null)
        expect(result).to.be.equal(null)
        done()
      })
    })

    // it('avoid creating an existing user', (done)=> {
    //   // TODO create this test
    //   // Warning: the user already exists
    //   done()
    // })
  })

  describe('Get', ()=> {
    
    it('get a user by username', (done) => {
      const userToCreate = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      };
      // 1. First, create a user to make this unit test independent from the others
      userController.create(userToCreate, (err, result) => {
        expect(err).to.be.equal(null);
        expect(result).to.be.equal('OK');
       // 2. Then, check if the result of the get method is correct
        userController.get('sergkudinov', (err, user) => {
          expect(err).to.be.equal(null);
          expect(user).to.deep.equal(userToCreate);
          done();
        })
      })
    })
  
    it('cannot get a user when it does not exist', (done) => {
      userController.get('utilisateurinexistant1235456456456', (err, user) => {
        expect(err).to.not.be.equal(null);
        expect(user).to.be.equal(null);
        done();
      })
    })
  
  })
})
