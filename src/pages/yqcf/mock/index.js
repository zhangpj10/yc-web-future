const loginMock = require('./login');

// mock数据
const test = () => {
  return {
    test: 'test'
  };
};
function Mock(app) {
  loginMock(app);
}

module.exports = Mock;
