'use strict';

class LoginUser {
  get rules() {
    return {
      email: 'required|email',
      password: 'required',
    };
  }

  get messages() {
    return {
      required: 'Sorry, {{ field }} is required.',
      email: 'Sorry, {{ field }} should be a valid email address.',
    };
  }

  async fails(error) {
    this.ctx.session.withErrors(error).flashAll();

    return this.ctx.response.redirect('back');
  }
}

module.exports = LoginUser;
