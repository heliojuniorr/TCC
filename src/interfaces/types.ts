export type UserType = {
    id?: string,
    name?: string,
    location?: string,
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

export type FirebaseUserType = Record<string, {
    name?: string,
    location?: string,
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
}>

export type MessageType = {
    id?: string
    authorName: string,
    content: string,
}

export type FirebaseMessageType = Record<string, {
    authorName?: string,
    content?: string,
}>