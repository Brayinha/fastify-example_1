export class ProblemDetails extends Error{
    status: number;
    title: string;
    details: string;

    constructor(status: number, title: string, details: string){
        super(details);
        this.title = title;
        this.status = status;
        this.details = details;
    }

    toJSON(){
        return{
            type: `https://httpstatuses.io/${this.status}`,
            title: this.title,
            status: this.status,
            details: this.details
        };
    }
}