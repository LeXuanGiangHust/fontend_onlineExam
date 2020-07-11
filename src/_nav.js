export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: 'NEW',
      },
      roles: ['admin', 'teacher', 'student'],
    },
    {
      name: 'Information',
      url: '/information',
      icon: 'cui-bell',
      roles: ['admin', 'teacher', 'student'],
    },
    // {
    //   name: 'Notify',
    //   url: '/notify',
    //   icon: 'cui-bell',
    //   roles: ['admin', 'teacher', 'student'],
    // },
    {
      name: 'Exam',
      url: '/exam',
      icon: 'fa fa-hourglass-half',
      roles: ['admin', 'student'],
    },
    {
      name: 'User',
      url: '/user',
      icon: 'cui-layers',
      roles: ['admin', 'teacher'],
    },
    {
      name: 'Test',
      url: '/test',
      icon: 'fa fa-pencil',
      roles: ['admin', 'teacher', 'student'],
    },
    {
      name: 'Contact',
      url: '/contact',
      icon: 'icon-people',
      roles: ['admin', 'teacher', 'student'],
    },
    // {
    //   name: 'History',
    //   url: '/history',
    //   icon: 'fa fa-history',
    // },
    {
      name: 'Field Question',
      url: '/field-question',
      icon: 'cui-align-left',
      roles: ['admin'],
    },
    {
      name: 'Manage Question',
      url: '/manage-question',
      icon: 'cui-list',
      roles: ['admin'],
    },
    {
      name: 'Manage Subject Test',
      url: '/manage-subject-test',
      icon: 'fa fa-newspaper-o',
      roles: ['admin', 'teacher'],
    },
  ],
};
