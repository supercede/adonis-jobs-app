'use strict';

const User = use('App/Models/User');

class UserController {
  async create({ request, response, auth }) {
    const user = await User.create(
      request.only(['username', 'password', 'email'])
    );

    await auth.login(user);

    return response.redirect('/');
  }

  async login({ request, response, auth, session }) {
    const { email, password } = request.all();

    try {
      await auth.attempt(email, password);
      return response.redirect('/');
    } catch (error) {
      session.flash({
        loginError: 'Invalid Credentials. Please try again or signup',
      });

      return response.redirect('/login');
    }
  }
}

module.exports = UserController;
