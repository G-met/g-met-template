import { LucideIcon, Scale, Settings, Weight } from "lucide-react";

// export interface Route {
//   name: string;
//   icon?: any;
//   path: string;
//   items?: Route[];
// }

interface Route {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: SubNavItem[];
}

interface SubNavItem {
  title: string;
  url: string;
}

export const routes: Route[] = [
  {
    title: "Equipos",
    icon: Scale,
    url: "/equipos",
    items: [
      {
        title: "Crear",
        url: "/crear",
      },
      {
        title: "Consultar",
        url: "/consultar",
      },
      {
        title: "Ver Programacion",
        url: "/programacion",
      },
      {
        title: "Ver Ejecicion",
        url: "/ejecucion",
      },
    ],
  },
  {
    title: "Patrones",
    icon: Weight,
    url: "/patrones",
    items: [
      {
        title: "Crear",
        url: "/crear",
      },
      {
        title: "Consultar",
        url: "/consultar",
      },
      {
        title: "Ver Programacion",
        url: "/programacion",
      },
      {
        title: "Ver Ejecucion",
        url: "/ejecucion",
      },
    ],
  },
  {
    title: "Configuracion",
    icon: Settings,
    url: "/configuracion",
    items: [
      {
        title: "Responsable",
        url: "/responsable",
      },
      {
        title: "Ubicacion",
        url: "/ubicacion",
      },
      {
        title: "Magnitud",
        url: "/magnitud",
      },
      {
        title: "Variables",
        url: "/variables",
      },
      {
        title: "Actividades",
        url: "/actividad",
      },
      {
        title: "Frecuencias",
        url: "/frecuencia",
      },
      {
        title: "Marca",
        url: "/marca",
      },
      {
        title: "Proveedores",
        url: "/proveedor",
      },
      {
        title: "Usuarios",
        url: "/usuario",
      },
    ],
  },
];
