/* Joey Fuller */
/* Unit tests */

const express = require('express');
const expect = require('chai').expect;
const request = require('supertest');
const db = require('../src/models/db');
const urlGen = require('../src/lib/urlGen');

request('http://localhost:3000');
require('../src/lib/util');

const app = express();

require('dotenv').config();

/* server much be active and close */
describe('API', () => {
  let server;
  beforeEach(() => {
    server = require('../src/server');
  });
  afterEach(() => {
    server.close();
  });

/* express responds ONLY to / */
  describe('Express', () => {
    it('responds to /', () => {
      request(server)
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
    });
    // everything else will 404
    it('or else 404', () => {
      request(server)
        .get('/something/random')
        .expect(404);
    });
  });

/* Server active on 3000 */
  describe('Server', () => {
    it('server up and listening on Port 3000', () => {
      request(server);
      app.get('/', (req, res) => {
        res.status(200);
      });
      app.listen(3000, () => {
        server.address().port;
      });
      return server;
    });
  });

/* matching env file */
  describe('Database', () => {
    it('dotenv has to match database', () => {
      request(server);
      expect(db.sequelize.config.database).to.equal(process.env.DB_NAME);
      expect(db.sequelize.config.username).to.equal(process.env.DB_USER);
      expect(db.sequelize.config.password).to.equal(process.env.DB_PASS);
      expect(db.sequelize.config.host).to.equal(process.env.DB_HOST);
      expect(db.sequelize.options.dialect).to.equal(process.env.DB_SCHEMA);
      expect(db.sequelize.config.port).to.equal(process.env.DB_PORT);
    });
  });

/* checking debug */
  describe('Debug', () => {
    it('DEBUGGING IS CURRENTLY WORKING', () => {
    });
  });

  describe('Endpoint', () => {
/* will create short url from long url */
    it('POST returns randomly generated shortened URL of 4 characters', () => {
      request(server)
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(() => {
        const id = urlGen.urlGen();
        expect(id).to.have.length('4');
      });
    });

/* returns all urls from DB */
    it('GET returns all URLs', () => {
      request(server)
      .get('/api/v1/urls')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect((res) => {
        const urls = res.body;
        this.url.id = urls[0];
        expect(urls.length).to.be.above(0);
      });
    });

/* returns URLS based on ID */
    it('GET returns one URL with id, Long URL, and short URL', (done) => {
      request(server);
      app.get('/api/v1/urls' + this.url.id)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(() => {
          const url = this.url.id;
          expect(url).to.have.property('id');
          expect(url).to.have.property('longURL');
          expect(url).to.have.property('shortURL');
        });
      done();
    });

/* updates url based on id */
    it('UPDATE updates URL based on id', (done) => {
      request(server)
      .get('/api/v1/urls' + this.url.id)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/);
      app.update('/api/v1/urls/' + this.url.id, (req, res) => {
        res.status(200);
      });
      done();
    });

/* deletes url based on id */
    it('DELETE deletes one URL based on id', (done) => {
      request(server)
      .get('/api/v1/urls' + this.url.id)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/);
      app.delete('/api/v1/urls/' + this.url.id, (req, res) => {
        res.status(200);
      });
      done();
    });
  });

/* url redirecr */
  describe('Redirect', () => {
    const urlGo = ('longlinkexample.com');
    it('redirects short URL to long URL', () => {
      const short = urlGo.includes('/go/:shortURL');
      expect(short).to.equal(false);
    });
  });
});
