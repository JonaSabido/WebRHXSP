export interface CalendarDay {
    value: number;
    currentMonth: boolean;
    isToday: boolean;
    selected: boolean,
    isBirthDay: boolean,
    isPayment: boolean,
    isContract: boolean
}

export interface CalendarMonth {
    year: number,
    month: number,
    startDate: Date,
    daysInMonth: CalendarDay[]
    textDisplay: string
}

interface Month {
    name: string,
    value: number,
}

export const DaysOfWeek = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab']

export const months: Month[] = [
    {
        name: 'Enero',
        value: 1
    },
    {
        name: 'Febrero',
        value: 2
    },
    {
        name: 'Marzo',
        value: 3
    },
    {
        name: 'Abril',
        value: 4
    },
    {
        name: 'Mayo',
        value: 5
    },
    {
        name: 'Junio',
        value: 6
    },
    {
        name: 'Julio',
        value: 7
    },
    {
        name: 'Agosto',
        value: 8
    },
    {
        name: 'Septiembre',
        value: 9
    },
    {
        name: 'Octubre',
        value: 10
    },
    {
        name: 'Noviembre',
        value: 11
    },
    {
        name: 'Diciembre',
        value: 12
    }
];
