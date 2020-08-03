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
}

module.exports = UserController;
