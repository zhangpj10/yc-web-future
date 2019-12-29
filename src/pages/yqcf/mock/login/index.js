const Mockjs = require('mockjs');
const user = require( './json/user.json');

const loginMock = (app) => {
  app.post('/yqcf/account/login', (req, res) =>{
    const data = Mockjs.mock(user);
    res.json(data);
  })
}

module.exports = loginMock;
