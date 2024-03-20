import { HttpClient } from "@angular/common/http";
import { environment } from "../../src/environments/environment.development";
import { Observable } from "rxjs";
import { List, RowsDeleted, SingleEntity } from "../../src/app/interfaces/api-response";

export abstract class ApiCrudService<T, U> {

    public abstract root(): string;

    constructor(protected http: HttpClient) { }

    protected get uri(): string {
        return `${environment.urlApiBase}${this.root()}/`;
    }

    public all(): Observable<List<U>> {
        return this.http.get<List<U>>(`${this.uri}`,);
    }

    public single(id: number,): Observable<SingleEntity<U>> {
        return this.http.get<SingleEntity<U>>(`${this.uri}{id}`);
    }

    public store(e: T): Observable<SingleEntity<U>> {
        return this.http.post<SingleEntity<U>>(this.uri, e);
    }

    public update(id: number, e: T): Observable<SingleEntity<T>> {
        return this.http.put<SingleEntity<T>>(`${this.uri}/{id}`, e);
    }

    public destroy(id: number): Observable<RowsDeleted> {
        return this.http.delete<RowsDeleted>(`${this.uri}/{id}`);
    }
}