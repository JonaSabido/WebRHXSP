import { HttpClient } from "@angular/common/http";
import { environment } from "../../src/environments/environment.development";

export abstract class ApiService {
    public abstract root(): string;

    constructor(protected http: HttpClient) { }

    protected get uri(): string {
        return `${environment.urlApiBase}/${this.root()}`;
    }
}