import angular from 'angular';
import angularUiRouter from 'angular-ui-router';
import routes from './routes';
import config from './config';

export default angular.module('app', [
    angularUiRouter,
    config.name,
    routes.name
]);