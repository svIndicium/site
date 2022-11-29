export interface Event {
    title: string
    description: string
    date: Date,
    url: string,
    categories: Array<string>
}

export interface Category {
    courseTitle: string
    hex: string
}

export interface ContactItems {
    [key: string]: string
}

export interface MenuItem {
    title: string
    url: string
}
