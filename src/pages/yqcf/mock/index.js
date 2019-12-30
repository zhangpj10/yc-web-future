const loginMock = require('./login');

function Mock(app) {
  loginMock(app);
}

module.exports = Mock;
