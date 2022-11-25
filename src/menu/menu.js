const admin = [
    {
        label: 'Principal',
        items: [{
            label: 'Inicio', icon: 'pi pi-fw pi-home', to: '/'
        }]
    },
    {
        label: 'Planificación', icon: 'pi pi-fw pi-sitemap',
        items: [
            { label: 'Planificación anual', icon: 'pi pi-fw pi-calendar', to: '/planification' },

        ]
    },
    {
        label: 'Indicadores', icon: 'pi pi-fw pi-sitemap',
        items: [
            { label: 'Indicadores del mes', icon: 'pi pi-fw pi-chart-bar', to: '/indicatorcompanydirection' },

        ]
    },
    {
        label: 'Nomencladores',
        items: [
            { label: 'Empresas', icon: 'pi pi-fw  pi-list', to: '/companies' },
            { label: 'Direcciones', icon: 'pi pi-fw  pi-list', to: '/directions' },
            { label: 'Tipos de indicadores', icon: 'pi pi-fw  pi-list', to: '/indicators' },
            { label: 'Unidades de medida', icon: 'pi pi-fw  pi-list', to: '/measurementunits' },
            { label: 'Indicadores-dirección', icon: 'pi pi-fw  pi-list', to: '/indicatordirection' },
            { label: 'Empresas-dirección', icon: 'pi pi-fw  pi-list', to: '/companydirection' },
            { label: 'Reportes', icon: 'pi pi-fw  pi-list', to: '/reportes' }

        ]
    }, {
        label: 'Seguridad', icon: 'pi pi-fw pi-sitemap',
        items: [
            { label: 'Usurios', icon: 'pi pi-fw pi-users', to: '/users' },
            { label: 'Bitacora', icon: 'pi pi-fw pi-shield', to: '/bitacora' },
            { label: 'Fecha límite ', icon: 'pi pi-fw pi-history', to: '/bitacora' },

        ]
    },
];
const especialista = [
    {
        label: 'Principal',
        items: [{
            label: 'Inicio', icon: 'pi pi-fw pi-home', to: '/'
        }]
    },
    {
        label: 'Planificación', icon: 'pi pi-fw pi-sitemap',
        items: [
            { label: 'Planificación anual', icon: 'pi pi-fw pi-calendar', to: '/planification' },

        ]
    },
    {
        label: 'Indicadores', icon: 'pi pi-fw pi-sitemap',
        items: [
            { label: 'Indicadores del mes', icon: 'pi pi-fw pi-chart-bar', to: '/indicatorcompanydirection' },

        ]
    },
    {
        label: 'Nomencladores',
        items: [
            { label: 'Reportes', icon: 'pi pi-fw  pi-list', to: '/reportes' }
        ]
    },
];
const director = [
    {
        label: 'Principal',
        items: [{
            label: 'Inicio', icon: 'pi pi-fw pi-home', to: '/'
        }]
    },
    {
        label: 'Nomencladores',
        items: [
            { label: 'Reportes', icon: 'pi pi-fw  pi-list', to: '/reportes' }
        ]
    },
];

export default function roles(role) {

    let roles = [];
    switch (role) {
        case 'admin':
            roles = admin;        
            break;
        case 'especialista':
            roles = especialista;
            break;
        case 'director': 
            roles = director;
            break;
    }

    return roles;
}