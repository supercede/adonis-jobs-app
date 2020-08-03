'use strict';

class CreateUser {
  get rules() {
    return {
      // validation rules
      username: 'required|unique:users',
      email: 'required|email|unique:users',
      password: 'required',
    };
  }

  get messages() {
    return {
      required: 'Sorry, {{ field }} is required.',
      unique: 'Sorry, {{ field }} already exists.',
      email: 'Sorry, {{ field }} should be a valid email address.',
    };
  }

  async fails(error) {
    this.ctx.session.withErrors(error).flashAll();

    return this.ctx.response.redirect('back');
  }
}

module.exports = CreateUser;
