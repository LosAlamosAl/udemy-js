// Disable some ESLint checks
/* eslint-disable eol-last */
/* eslint-disable no-multi-spaces */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */
/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
// @ts-nocheck

const github = new GitHub();
const ui = new UI();

document.getElementById('searchUser').addEventListener('keyup', searchUser);

function searchUser(e) {
  if (e.target.value !== '') {
    github.getUser(e.target.value).then((data) => {
      if (data.profile.message === 'Not Found') {
        ui.showAlert('User not found', 'alert alert-danger');
      } else {
        ui.clearAlert();
        ui.showProfile(data.profile);
        ui.showRepos(data.repos);
      }
    });
  } else {
    ui.clearAlert();
    ui.clearProfile();
  }
}