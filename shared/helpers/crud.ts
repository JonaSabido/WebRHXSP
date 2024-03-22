import { DialogService, DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { View } from "./view";
import { DialogData } from "../../src/app/interfaces/dialog-data";
import { ApiCrudService } from "../services/api-crud.service";
import { MessageService } from "primeng/api";

export abstract class Crud<T = null, U = null> extends View {
    abstract dialogConfig: DynamicDialogConfig;

    public entity: T | undefined;
    public temporal: T | undefined;
    public entities: U[];

    constructor(
        public dialogService$: DialogService,
        public refDialog$: DynamicDialogRef,
        public service$?: ApiCrudService<T, U>,
        private messageService$?: MessageService,
    ) {
        super();
        this.entities = []
        this.reload();
        this.restore()
    }

    public openDialog(
        temporal?: U
    ) {
        const dialogData: DialogData<T, U> = {
            entity: temporal ? { ...temporal as U } : this.entity,
            type_action: temporal ? 'Update' : 'Create'
        }
        this.dialogConfig.data = dialogData
        this.refDialog$ = this.getRefDialog()
        this.refDialog$.onClose.subscribe((result: T | undefined) => {
            if (result) {
                if (dialogData.type_action === 'Create') {
                    if (this.service$) {
                        this.service$.store(dialogData.entity as T).subscribe({
                            next: (response) => {
                                this.messageService$?.add({ severity: 'success', summary: 'Correcto', detail: 'Datos creados correctamente' });
                                this.reload()
                                this.restore()
                            },
                            error: (e) => {
                                this.messageService$?.add({ severity: 'error', summary: 'Error', detail: 'Ocurrió algún error al crear' });
                                console.log(e)
                            }
                        })
                    }
                }
                else if (dialogData.type_action === 'Update') {
                    if (this.service$) {
                        const data = dialogData.entity as any
                        this.service$.update(data['id'], dialogData.entity as T).subscribe({
                            next: (response) => {
                                this.messageService$?.add({ severity: 'success', summary: 'Correcto', detail: 'Datos actualizados correctamente' });
                                this.reload()
                                this.restore()
                            },
                            error: (e) => {
                                this.messageService$?.add({ severity: 'error', summary: 'Error', detail: 'Ocurrió algún error al actualizar' });
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
            this.service$.all().subscribe(
                {
                    next: (response) => this.entities = response.data,
                    error: (e) => console.log(e)
                }
            )
        }
    }

    public delete(id: number) {
        this.service$?.destroy(id).subscribe({
            next: (response) => {
                console.log(response)
                this.messageService$?.add({ severity: 'success', summary: 'Correcto', detail: 'Dato eliminado correctamente' });
                this.reload()
            },
            error: (e) => {
                this.messageService$?.add({ severity: 'error', summary: 'Error', detail: 'Ocurrió algún error al eliminar' });
                console.log(e)
            }
        })
    }

    protected abstract getRefDialog(): DynamicDialogRef;

    protected abstract restore(): void



}
