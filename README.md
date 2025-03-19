# CRM-MICHI

CRM-MICHI es una aplicación web para la gestión integral de restaurantes Michi. Permite llevar un control de gastos, compras, cuentas por cobrar y pagar, indicadores de gestión, y control estadístico de los restaurantes.

## Tecnologías

- **Frontend**: [Next.js](https://nextjs.org/) con [Tailwind CSS](https://tailwindcss.com/)
- **Backend**: Next.js API routes + [Supabase](https://supabase.io/)
- **Base de datos**: PostgreSQL (a través de Supabase)
- **Autenticación**: Supabase Auth
- **Hosting**: [Vercel](https://vercel.com/)
- **Gráficos**: [Recharts](https://recharts.org/)
- **Estado global**: [Zustand](https://github.com/pmndrs/zustand)

## Características

- **Dashboard**: Resumen de KPIs y actividad reciente
- **Gestión financiera**: Control de gastos, ingresos, cuentas por cobrar y por pagar
- **Control de inventario**: Gestión de productos, alertas de stock bajo
- **Ventas**: Registro y análisis de ventas
- **Gestión de compras**: Registro y seguimiento de compras
- **Reportes**: Análisis detallado con gráficos interactivos
- **Gestión de personal**: Control de empleados, horarios
- **Gestión de clientes**: Base de datos de clientes y programa de fidelización

## Instalación y configuración

1. **Clonar el repositorio**

```bash
git clone https://github.com/usuario/crm-michi.git
cd crm-michi
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Configurar variables de entorno**

Crea un archivo `.env.local` con las siguientes variables:

```
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anon_de_supabase
```

4. **Iniciar el servidor de desarrollo**

```bash
npm run dev
```

5. **Construir para producción**

```bash
npm run build
```

## Estructura del proyecto

- `app/`: Rutas y páginas (Next.js App Router)
- `components/`: Componentes reutilizables
- `lib/`: Utilidades, hooks y funciones auxiliares
- `store/`: Estado global con Zustand
- `types/`: Definiciones de tipos TypeScript
- `public/`: Archivos estáticos

## Configuración de la base de datos

La estructura de la base de datos está disponible en el archivo `database-schema.sql`. Puedes importar este archivo en tu proyecto de Supabase para crear todas las tablas necesarias con sus relaciones.

## Desarrollo

Para contribuir al proyecto, sigue estos pasos:

1. Crea una rama a partir de `main`
2. Realiza tus cambios
3. Envía un Pull Request

## Despliegue

La aplicación está configurada para desplegarse en Vercel:

```bash
npx vercel
```

## Licencia

Este proyecto es propiedad de Restaurantes Michi y su uso está restringido a fines autorizados.