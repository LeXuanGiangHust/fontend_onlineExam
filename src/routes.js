import React from 'react';

const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Exam = React.lazy(() => import('./pages/Exam'));
const User = React.lazy(() => import('./pages/User'));
const Test = React.lazy(() => import('./pages/Test'));
const Contact = React.lazy(() => import('./pages/Contact'));
// const History = React.lazy(() => import('./pages/History'));
const FieldQuestion = React.lazy(() => import('./pages/FieldQuestion'));
const ManageQuestion = React.lazy(() => import('./pages/ManageQuestion'));
const ManageSubjectTest = React.lazy(() => import('./pages/ManageSubjectTest'));
const Notify = React.lazy(() => import('./pages/Notify'));
const Information = React.lazy(() => import('./pages/Information'));
const ManageQuestion1 = React.lazy(() => import('./pages/ManageQuestion1'));

const routes = [
  { path: '/', exact: true, name: 'Home', roles: ['admin', 'teacher', 'student'] },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard, roles: ['admin', 'teacher', 'student'] },
  { path: '/exam', name: 'Exam', component: Exam, roles: ['admin', 'teacher', 'student'] },
  { path: '/user', name: 'User', component: User, roles: ['admin', 'teacher'] },
  { path: '/test', name: 'Test', component: Test, roles: ['admin', 'teacher', 'student'] },
  { path: '/contact', name: 'Contact', component: Contact, roles: ['admin', 'teacher', 'student'] },
  // { path: '/history', name: 'History', component: History },
  { path: '/field-question', name: 'Field Question', component: FieldQuestion, roles: ['admin', 'teacher'] },
  { path: '/manage-question', name: 'Manage Question', component: ManageQuestion, roles: ['admin', 'teacher'] },
  { path: '/manage-subject-test', name: 'Manage Subject Test', component: ManageSubjectTest, roles: ['admin', 'teacher'] },
  { path: '/notify', name: 'Notify', component: Notify, roles: ['admin', 'teacher', 'student'] },
  { path: '/information', name: 'Information', component: Information, roles: ['admin', 'teacher', 'student'] },
  {path: '/manage-question1', name: 'Manage Question 1', component: ManageQuestion1, roles: ['admin']}
];

export default routes;
