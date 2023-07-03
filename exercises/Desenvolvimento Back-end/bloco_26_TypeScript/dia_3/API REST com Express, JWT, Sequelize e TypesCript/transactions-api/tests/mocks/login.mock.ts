const validPassword = 'ch4ng3m3';
const noEmailLoginBody = { email: '', password: validPassword };

const validEmail = 'user1@email.com';
const noPasswordLoginBody = { email: validEmail, password: '' };

const notExistingUserBody = { email: 'notfound@email.com', password: validPassword };

export default {
  noEmailLoginBody,
  noPasswordLoginBody,
  notExistingUserBody,
};