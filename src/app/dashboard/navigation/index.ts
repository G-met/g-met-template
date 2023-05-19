export interface Route {
  name: string;
  icon?: any;
  path: string;
  subRoute?: Route[];
}

export const routes: Route[] = [
  {
    name: "Equipos",
    icon:'',
    path:'/equipos',
    subRoute:[
      {
        name:'Crear',
        path:'/crear',
      }
    ]
  },
  {
    name: "Patrones",
    icon:'',
    path:'/patrones',
    subRoute:[
      {
        name:'Crear',
        path:'/crear',
      }
    ]
  },
  {
    name: "Configuracion",
    icon:'',
    path:'/configuracion',
  },
];