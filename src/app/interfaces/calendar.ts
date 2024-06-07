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
    value: string,
}

export const DaysOfWeek = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab']

export const months: Month[] = [
    {
        name: 'Enero',
        value: '01'
    },
    {
        name: 'Febrero',
        value: '02'
    },
    {
        name: 'Marzo',
        value: '03'
    },
    {
        name: 'Abril',
        value: '04'
    },
    {
        name: 'Mayo',
        value: '05'
    },
    {
        name: 'Junio',
        value: '06'
    },
    {
        name: 'Julio',
        value: '07'
    },
    {
        name: 'Agosto',
        value: '08'
    },
    {
        name: 'Septiembre',
        value: '09'
    },
    {
        name: 'Octubre',
        value: '10'
    },
    {
        name: 'Noviembre',
        value: '11'
    },
    {
        name: 'Diciembre',
        value: '12'
    }
];
