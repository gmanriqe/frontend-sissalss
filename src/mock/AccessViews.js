export const views = [
    {
        id: '1',
        first_name: 'Jesús Alexander',
        last_name: 'Gonzales Manrique',
        email: 'jgonzales@luchasalonspa.pe',
        image: '',
        state: 1,
        section_list: [
            {
                id: '1',
                name: 'Control',
                description: 'Control de personal',
                state: 1,
                submenu: [
                    {
                        id: '5',
                        name: 'Personal',
                        url: '/personal',
                        icon: 'groups',
                        state: 1,
                    }
                ]
            },
            {
                id: '1',
                name: 'CITAS',
                description: 'Citas y clientas',
                state: 1,
                submenu: [
                    {
                        id: '5',
                        name: 'Citas',
                        url: '/citas',
                        icon: 'volunteer_activism',
                        state: 1,
                    },
                    {
                        id: '6',
                        name: 'Clientes',
                        url: '/clientes',
                        icon: 'group',
                        state: 1,
                    }
                ]
            },
        ]
    }
]
