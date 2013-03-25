/**
 * TEST LIBRARY
 *
 * Prey Client
 *
 * Specific OSX Functions and Variables
 *
 */

// Module requirements
var fs = require('fs');

// Module constructor
var os_utils = module.exports = function () {};

/**
 * @param   {String} username
 *
 * @summary  Returns command to grep the `username`
 *           from an output of the user list
 */
os_utils.grep_user_from_list_command = function (username) {
  return 'dscl . -list /Users | grep ' + username;
}

/**
 * @param   {String} username
 *
 * @summary  Returns command to delete user
 */
os_utils.delete_user_command = function (username) {
  return 'dscl . -delete /Users/' + username;
}

/**
 * @param   {String} username
 *
 * @summary  Returns information of `username`
 */
os_utils.get_user_info_command = function (username) {
  return 'dscl . -read /Users/' + username;
}

/**
 * @param   {String} username
 *
 * @summary Returns the command to get the id of user `username`
 */
os_utils.get_test_user_id_command = function (username) {
  return 'dscl . -read /Users/' + username + ' | grep UniqueID';
}

/**
 * @param   {String} username
 *
 * @summary  Returns the command to get a existing username
 *           (different from the parameter username)
 */
os_utils.get_existing_user_command = function (username) {
  var command = 'dscl . -list /Users | '
              + 'grep -Ev "^_|daemon|nobody|root|Guest|' + username
              + '" | tail -1';
  return command;
}

/**
 * @summary  Returns the temporal directory name
 */
os_utils.get_test_env_directory = function () {
  return '/tmp/test_prey';
}

/**
 * @param   {String}    directory
 *
 * @summary  Returns the command to delete a directory
 */
os_utils.get_delete_directory_command = function (directory) {
  return 'rm -rf ' + directory;
}

/**
 * @param   {String}    directory
 * @param   {Callback}  callback
 *
 * @summary Creates a mock nodeJS executable file which just echoes
 *          its calling parameters in the designated directory
 */
os_utils.create_mock_node_exec_file = function (directory, callback) {
  var file_contents = '#!/bin/bash\necho "-- ARGV: " $@\n';
  var file_path     = directory + '/node'
  fs.writeFile(file_path, file_contents, wrote_file);

  function wrote_file (err) {
    if (err) return callback(err);
    fs.chmod(file_path, '777', done_chmod);
  }

  function done_chmod (err) {
    if (err) return callback(err);
    return callback();
  }
}