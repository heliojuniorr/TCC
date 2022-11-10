export type UserType = {
    id?: string,
    name?: string,
    location?: string,
    specialty?: string,
    businessArea?: string,
    education?: string,
    Arquiteturadesoftware?: number,
    CLevel?: number,
    Finanças?: number,
    Gestãodeprojetos?: number,
    Mídias?: number,
    Parceriasempresariais?: number,
    Programasdeaceleração?: number,
    Relaçõeshumanas?: number,
    Relaçõespúblicas?: number,
    Startups?: number,
    Venturecapital?: number,
    institutional?: boolean,
}

export type FirebaseUserType = Record<string, {
    id?: string,
    name?: string,
    location?: string,
    specialty?: string,
    businessArea?: string,
    education?: string,
    Arquiteturadesoftware?: number,
    CLevel?: number,
    Finanças?: number,
    Gestãodeprojetos?: number,
    Mídias?: number,
    Parceriasempresariais?: number,
    Programasdeaceleração?: number,
    Relaçõeshumanas?: number,
    Relaçõespúblicas?: number,
    Startups?: number,
    Venturecapital?: number,
    institutional?: boolean,
}>

export type ApiUserType = {
    id: string,
    name?: string,
    location?: string,
    specialty?: string,
    businessArea?: string,
    education?: string,
    Arquiteturadesoftware?: string,
    CLevel?: string,
    Finanças?: string,
    Gestãodeprojetos?: string,
    Mídias?: string,
    Parceriasempresariais?: string,
    Programasdeaceleração?: string,
    Relaçõeshumanas?: string,
    Relaçõespúblicas?: string,
    Startups?: string,
    Venturecapital?: string,
    institutional?: boolean,
}

export type MessageType = {
    id?: string
    authorName: string,
    content: string,
}

export type FirebaseMessageType = Record<string, {
    authorName?: string,
    content?: string,
}>