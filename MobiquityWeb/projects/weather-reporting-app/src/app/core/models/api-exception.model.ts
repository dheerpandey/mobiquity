export class ApiException extends Error {
    message: string
    status: number
    response: string
    headers: { [key: string]: any }
    result: any

    constructor(
        message: string,
        status: number,
        response: string,
        headers: { [key: string]: any },
        result: any
    ) {
        super()

        this.message = message
        this.status = status
        this.response = response
        this.headers = headers
        this.result = result
    }
}
