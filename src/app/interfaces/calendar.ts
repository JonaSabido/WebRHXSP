export interface CalendarDay {
    value: number;
    currentMonth: boolean;
    isToday: boolean;
    selected: boolean
}

export interface CalendarMonth {
    year: number,
    month: number,
    startDate: Date,
    daysInMonth: CalendarDay[]
    textDisplay: string
}

export const DaysOfWeek = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab']