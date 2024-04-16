import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../src/environments/environment.development";
import { Observable } from "rxjs";
import { List, RowsDeleted, SingleEntity } from "../../src/app/interfaces/api-response";
import { ObjectFilter } from "../interfaces/object-filter";

export abstract class ApiCrudService<T, U, V = null> {

    public abstract root(): string;

    constructor(protected http: HttpClient) { }

    protected get uri(): string {
        return `${environment.urlApiBase}/${this.root()}/`;
    }

    /**
   * Calls the default `GET http://myserver.com/api/<root>` to list all the entities,
   * also depending on the filter params provided.
   * @param {ObjectFilter} params The optional filter params to be sent in the request
   * @return {Observable} an `Observable` of a `ListWCursor<T>` inside, containing the entities and a cursor for pagination
   */

    public all(filters?: ObjectFilter<V>[]): Observable<List<U>> {
        const myFilters: ObjectFilter<V>[] = filters ?? []
        return this.http.get<List<U>>(`${this.uri}`, { params: this.getParams(myFilters) });
    }

    public single(id: number,): Observable<SingleEntity<U>> {
        return this.http.get<SingleEntity<U>>(`${this.uri}${id}`);
    }

    public store(e: T | FormData): Observable<SingleEntity<U>> {
        return this.http.post<SingleEntity<U>>(this.uri, e);
    }

    public update(id: number, e: T | FormData): Observable<SingleEntity<T>> {
        return this.http.put<SingleEntity<T>>(`${this.uri}${id}`, e);
    }

    public destroy(id: number): Observable<RowsDeleted> {
        return this.http.delete<RowsDeleted>(`${this.uri}${id}`);
    }

    private getParams(filters: ObjectFilter<V>[]): HttpParams {
        let httpParams: HttpParams = new HttpParams();
        filters.forEach(element => {
            console.log(element)
            if (element.value !== 0 && element.value !== '' && element.value !== null && element.value !== undefined) {
                httpParams = httpParams.set(element.property as string, element.value)
            }
        });
        return httpParams;
    }
}