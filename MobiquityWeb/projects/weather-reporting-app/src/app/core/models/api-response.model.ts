export class ApiResponse<T> {
    constructor(
        public data: T,
        public statusCode: number,
        public success: boolean
    ) {}
}
