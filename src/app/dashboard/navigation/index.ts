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
      },
      {
        name:'Consultar',
        path:'/consultar',
      },
      {
        name:'Ver Programacion',
        path:'/programacion',
      },
      {
        name:'Ver Ejecicion',
        path:'/ejecucion',
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
      },
      {
        name:'Consultar',
        path:'/consultar',
      },
      {
        name:'Ver Programacion',
        path:'/programacion',
      },
      {
        name:'Ver Ejecucion',
        path:'/ejecucion',
      }
    ]
  },
  {
    name: "Configuracion",
    icon:'',
    path:'/configuracion',
    subRoute:[
      {
        name:'Responsable',
        path:'/responsable',
      },
      {
        name:'Ubicacion',
        path:'/ubicacion',
      },
      {
        name:'Magnitud',
        path:'/magnitud',
      },
      {
        name:'Variables',
        path:'/variables',
      },
      {
        name:'Actividades',
        path:'/actividad',
      },
      {
        name:'Frecuencias',
        path:'/frecuencia',
      },
      {
        name:'Marca',
        path:'/marca',
      },
      {
        name:'Tipo Patron',
        path:'/tipoPatron',
      },
    ]
  },
];
