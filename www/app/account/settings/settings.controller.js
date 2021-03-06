'use strict';

angular.module('preserveusMobile')
    .controller('SettingsCtrl', function($scope, User, Auth, $state, ValidationService) {
        $scope.errors = {};

        $scope.changePassword = function(form) {
            $scope.submitted = true;
            if (form.$valid) {
                Auth.changePassword($scope.user.oldPassword, $scope.user.newPassword)
                    .then(function() {
                        ValidationService.success('Password successfully changed.');
                        $state.go('app.userView', { id: Auth.getCurrentUser()._id });
                    })
                    .catch(function() {
                        form.password.$setValidity('mongoose', false);
                        $scope.errors.other = 'Incorrect password';
                        $scope.message = '';
                    });
            }
        };
    });
