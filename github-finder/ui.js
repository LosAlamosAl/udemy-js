/* eslint-disable class-methods-use-this */
// Disable some ESLint checks
/* eslint-disable no-multi-spaces */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */
/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
// @ts-nocheck

class UI {

  constructor() {
    this.profile = document.getElementById('profile');
    this.div = null;
  }

  showProfile(user) {
    this.profile.innerHTML = `
      <div class="card card-body mb3">
        <div class="row">
          <div class="col-md-3">
            <img class="img-fluid mb-2" src="${user.avatar_url}">
            <a href="${user.html_url}" target="_blank" class="btn btn-primary btn-block mb-3">View Profile</a>
          </div>
          <div class="col-md-9">
          <span class="badge badge-primary">Public Repos: ${user.public_repos}</span>
          <span class="badge badge-secondary">Public Gists: ${user.public_gists}</span>
          <span class="badge badge-success">Followers: ${user.followers}</span>
          <span class="badge badge-info">Following: ${user.following}</span>
          <br><br>
          <ul class="lost-group">
          <li class="list-group-item">Company: ${user.compamy}</li>
          <li class="list-group-item">Website: ${user.blog}</li>
          <li class="list-group-item">Location: ${user.location}</li>
          <li class="list-group-item">Member Since: ${user.created_at}</li>
          </ul>
          </div>
        </div>
      </div>
      <h3 class="page-heading mb-3">Latest Repos</h3>
      <div id="repos"></div>
    `;
  }

  showRepos(repos) {
    let output = '';

    repos.forEach((repo) => {
      output += `
        <div class="card card-body mb-2">
          <div class="row">
            <div class="col-md-6">
              <a href="${repo.html_url}" target="_blank">${repo.name}</a>
            </div>
            <div class="col-md-6>
              <span class="badge badge-primary">Stars: ${repo.stargazers_count}</span>
              <span class="badge badge-secondary">Watchers: ${repo.watchers_count}</span>
              <span class="badge badge-success">Forks: ${repo.forms_count}</span>
            </div>
          </div>
        </div>
      `;
    });
    
    document.getElementById('repos').innerHTML = output;
  }

  clearProfile() {
    this.profile.innerHTML = '';
  }

  showAlert(message, className) {
    if (this.div !== null) {
      return;
    }
    this.div = document.createElement('div');
    this.div.className = className;
    this.div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.searchContainer');
    const search = document.querySelector('.search');
    container.insertBefore(this.div, search);
  }

  clearAlert() {
    console.log(this.div);
    if (this.div !== null) {
      this.div.parentElement.removeChild(this.div);
      this.div = null;
    }
  }
}