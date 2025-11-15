export const FeesDetail = [
    {
        id: 1,
        id_socio: 23,
        title: 'Informacion del socio',
        active: false,
        rows: [
            [
                { label: 'Numero de socio', value: 'informacion', attribute:'partnerNumber' },
                { label: 'Nombre del socio', value: 'informacion',  attribute: 'name' }
            ]
        ]
    },
    {
        id: 2,
        id_socio: 23,
        title: 'Informacion de la cuota',
        active: false,
        rows: [
            [
                { label: 'Id de la cuota', value: 'informacion', attribute: 'feeid' }
            ],
            [
                { label: 'Año', value: 'informacion', attribute: 'year' },
                { label: 'Mes', value: 'informacion', attribute: 'month' }
            ],
            [
                { label: 'Monto', value: 'informacion', attribute: 'amount' },
                { label: 'Observaciones', value: 'informacion', attribute: 'observation' }
            ]
        ]
    },
    {
        id: 3,
        id_socio: 23,
        title: 'Estado de pago',
        active: false,
        rows: [
            [
                { label: 'Estado de pago', value: 'información', attribute: 'paid' },
                { label: 'Fecha de pago', value: 'información', attribute: 'date_of_paid' }
            ]
        ]
    }
];