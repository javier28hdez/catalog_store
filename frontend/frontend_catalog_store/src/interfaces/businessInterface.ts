export interface BusinessData{
    id_business: string
    name: string,
    email_business: string,
    telephone: string,
    description: string,
    img_business: string ,
    created_at?: Date,
    update_at?: Date,
}

export interface BusinessProps{
    name: string,
    description: string,
    img_url: string,
}
