const routesMock = [
  {
    name: 'Principal',
    path: '/home',
    active: false,
    submenu: [
      {
        name: 'Página inicial',
        path: '/home/client',
        icon: 'github',
        active: false,
      },
    ],
  },
  {
    name: 'Opções',
    path: '/options',
    active: false,
    icon: 'github',
    submenu: [
      {
        name: 'Empresas',
        path: '/options/companies',
        icon: 'github',
        active: false,
      },
      {
        name: 'Beneficiários',
        path: '/options/beneficiaries',
        icon: 'github',
        active: false,
      },
      {
        name: 'Produtos',
        path: '/options/clients',
        icon: 'github',
        active: false,
      },
      {
        name: 'Faturamento',
        path: '/options/billing',
        icon: 'github',
        active: false,
      },
      {
        name: 'Cotações',
        path: '/options/cotations',
        icon: 'github',
        active: false,
      },
    ],
  },
  {
    name: 'Configurações',
    path: '/config',
    active: false,
    icon: 'github',
    submenu: [
      {
        name: 'Seu cadastro',
        path: '/config/register',
        icon: 'github',
        active: false,
      },
      {
        name: 'Sair',
        path: '/config/logout',
        icon: 'github',
        active: false,
      },
    ],
  },
]

export default routesMock
