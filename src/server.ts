import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import EvaluationsRoute from '@routes/evaluations.route';
import QuestionsRoute from '@routes/questions.route';
import ReportsRoute from '@routes/reports.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([
  new IndexRoute(),
  new UsersRoute(),
  new AuthRoute(),
  new EvaluationsRoute(),
  new QuestionsRoute(),
  new ReportsRoute(),
  new AuthRoute(),
]);

app.listen();
