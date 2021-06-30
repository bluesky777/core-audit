import React from 'react';


const Dashboard = React.lazy(() => import('../views/dashboard/Dashboard'));
const Users = React.lazy(() => import('../views/users/Users'));
const User = React.lazy(() => import('../views/users/User'));
const Iglesias = React.lazy(() => import('./iglesias/Iglesias'));
const AddEditIglesia = React.lazy(() => import('./iglesias/AddEditIglesia'));
const AddEditUnion = React.lazy(() => import('./uniones/AddEditUnion'));
const UnionesTable = React.lazy(() => import('./uniones/UnionesTable'));
const AddEditAsociaciones = React.lazy(() => import('./asociaciones/AddEditAsociaciones'));
const Asociaciones = React.lazy(() => import('./asociaciones/Asociaciones'));
const AddEditDistritos = React.lazy(() => import('./distritos/AddEditDistritos'));
const Distritos = React.lazy(() => import('./distritos/Distritos'));
const Auditorias = React.lazy(() => import('./auditorias/Auditorias'));
const AddEditAuditoria = React.lazy(() => import('./auditorias/AddEditAuditoria'));
const DatosAuditoria = React.lazy(() => import('./datosAuditorias/Datos'));

const routes = [
  { path: '/', exact: true, name: 'Inico' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },
  { path: '/iglesias', exact: true, name: 'Iglesias', component: Iglesias },
  { path: '/iglesias/add', exact: true, name: 'Añadir Iglesias', component: AddEditIglesia },
  { path: '/uniones', exact: true, name: 'Uniones', component: UnionesTable },
  { path: '/uniones/add', exact: true, name: 'Añadir Unión', component: AddEditUnion },
  { path: '/uniones/edit/:id', exact: true, name: 'Editar Unión', component: AddEditUnion },
  { path: '/asociaciones', exact: true, name: 'Uniones', component: Asociaciones },
  { path: '/asociaciones/add', exact: true, name: 'Añadir Unión', component: AddEditAsociaciones },
  { path: '/asociaciones/edit/:id', exact: true, name: 'Editar Unión', component: AddEditAsociaciones },
  { path: '/distritos', exact: true, name: 'Uniones', component: Distritos },
  { path: '/distritos/add', exact: true, name: 'Añadir Unión', component: AddEditDistritos },
  { path: '/distritos/edit/:id', exact: true, name: 'Editar Unión', component: AddEditDistritos },
  { path: '/auditorias', exact: true, name: ' Auditorias', component: Auditorias },
  { path: '/auditorias/add', exact: true, name: ' Auditorias', component: AddEditAuditoria },
  { path: '/datos-auditoria', exact: true, name: 'Auditar', component: DatosAuditoria },
];

export default routes;
