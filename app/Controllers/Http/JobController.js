'use strict';

const Job = use('App/Models/Job');

class JobController {
  async home({ view }) {
    // Fetch all jobs
    const jobs = await Job.all();

    return view.render('index', {
      jobs: jobs.toJSON(),
    });
  }

  async userJobs({ auth, view }) {
    const jobs = await auth.user.jobs().fetch();

    return view.render('jobs', {
      jobs: jobs.toJSON(),
    });
  }

  async create({ request, response, session, auth }) {
    const job = request.all();

    const postedJob = await auth.user.jobs().create({
      title: job.title,
      link: job.link,
      description: job.description,
    });

    session.flash({ message: 'Your job has been posted' });
    return response.redirect('back');
  }

  async delete({ request, response, session }) {
    await request.job.delete();

    session.flash({ message: 'Your job has been Removed' });
    return response.redirect('back');
  }

  async edit({ request, params, view }) {
    return view.render('edit', { job: request.job });
  }

  async update({ response, request, session }) {
    request.job.title = request.all().title;
    request.job.link = request.all().link;
    request.job.description = request.all().description;

    await request.job.save();

    session.flash({ message: 'Your job has been updated. ' });
    return response.redirect('/your-jobs');
  }
}
module.exports = JobController;
