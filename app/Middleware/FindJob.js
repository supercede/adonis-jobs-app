'use strict';
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Job = use('App/Models/Job');

class FindJob {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ auth, request, params }, next) {
    console.log(params);
    request.job = await Job.query()
      .where('id', params.id)
      .where('user_id', auth.user.id)
      .first();

    // call next to advance the request
    await next();
  }
}

module.exports = FindJob;
