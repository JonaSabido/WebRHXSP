import { DialogService, DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { View } from "./view";
import { DialogData } from "../../src/app/interfaces/dialog-data";
import { ApiCrudService } from "../services/api-crud.service";
import { MessageService } from "primeng/api";
import { ObjectFilter } from "../interfaces/object-filter";

export abstract class Crud<T = null, U = null, V = null> extends View {
    abstract dialogConfig: DynamicDialogConfig;

    public entity: T | undefined;
    public temporal: T | undefined;
    public entities: U[];
    public filters: V | any;
    public filterOptions: ObjectFilter<V>[];
    public selectedOption: keyof V | undefined;
    public showFilters: boolean;

    constructor(
        public dialogService$: DialogService,
        public refDialog$: DynamicDialogRef,
        public service$?: ApiCrudService<T, U, V>,
        private messageService$?: MessageService,
    ) {
        super();
        this.entities = []
        this.filterOptions = []
        this.showFilters = false;
        this.reload();
        this.restore();
        this.restoreFilters();
        this.generateFilterOptions();
    }

    public switchShowFilters() {
        this.showFilters = !this.showFilters
        if (!this.showFilters) {
            this.filterOptions = []
            this.restoreFilters()
            this.generateFilterOptions()
            this.reload()
        }
    }

    public openDialog(
        temporal?: U,
        newHeader?: string
    ) {
        if (newHeader) {
            this.dialogConfig.header = newHeader
        }

        const dialogData: DialogData<T, U> = {
            entity: temporal ? { ...temporal as U } : this.entity,
            type_action: temporal ? 'Update' : 'Create'
        }
        this.dialogConfig.data = dialogData
        this.refDialog$ = this.getRefDialog()
        this.refDialog$.onClose.subscribe((result: T | undefined | FormData) => {
            if (result) {
                if (dialogData.type_action === 'Create') {
                    if (this.service$) {
                        this.service$.store(result).subscribe({
                            next: (response) => {
                                this.messageService$?.add({ key: 'br', severity: 'success', summary: 'Correcto', detail: 'Datos creados correctamente' });
                                this.reload()
                                this.restore()
                            },
                            error: (e) => {
                                this.messageService$?.add({ key: 'br', severity: 'error', summary: 'Error', detail: 'Ocurrió algún error al crear' });
                                console.log(e)
                            }
                        })
                    }
                }
                else if (dialogData.type_action === 'Update') {
                    if (this.service$) {
                        const data = dialogData.entity as any
                        this.service$.update(data['id'], result).subscribe({
                            next: (response) => {
                                this.messageService$?.add({ key: 'br', severity: 'success', summary: 'Correcto', detail: 'Datos actualizados correctamente' });
                                this.reload()
                                this.restore()
                            },
                            error: (e) => {
                                this.messageService$?.add({ key: 'br', severity: 'error', summary: 'Error', detail: 'Ocurrió algún error al actualizar' });
                                console.log(e)
                            }
                        })
                    }
                }
            }
        })
    }

    public reload(): void {
        if (this.service$) {
            this.service$.all(this.filterOptions).subscribe(
                {
                    next: (response) => this.entities = response.data,
                    error: (e) => {
                        if (e.statusCode = 404) {
                            this.entities = []
                        }
                    }
                }
            )
        }
    }

    public delete(id: number) {
        this.service$?.destroy(id).subscribe({
            next: (response) => {
                console.log(response)
                this.messageService$?.add({ key: 'br', severity: 'success', summary: 'Correcto', detail: 'Dato eliminado correctamente' });
                this.reload()
            },
            error: (e) => {
                this.messageService$?.add({ key: 'br', severity: 'error', summary: 'Error', detail: 'Ocurrió algún error al eliminar' });
            }
        })
    }

    protected abstract getRefDialog(): DynamicDialogRef;

    protected abstract restore(): void

    protected abstract restoreFilters(): void

    protected generateFilterOptions(): void {
        for (let key in this.filters) {
            this.filterOptions.push(this.filters[key] as ObjectFilter<V>)
        }
    }
}
