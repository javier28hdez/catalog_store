export interface BusinessData{
    id_business: string, 
    name: string,
    eslogan: string,
    email_business: string,
    telephone: string,
    description: string,
    img_business: string ,
    created_at?: Date,
    update_at?: Date,
}

export interface BusinessProps{
    id_business: string | number,
    name: string,
    eslogan: string,
    description: string,
    img_url: string,
}

export interface BusinessFormData{
    name: string,
    eslogan: string,
    email_business: string,
    address: string,
    telephone: string,
    description: string,
    img_business: File,
}

export interface BusinessFormProps{
    onSuccess: () => void;
}