import { DialogService, DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { View } from "./view";
import { DialogData } from "../../src/app/interfaces/dialog-data";
import { ApiCrudService } from "../services/api-crud.service";

export abstract class Crud<T = null, U = null> extends View {
    abstract dialogConfig: DynamicDialogConfig;

    public entity: T | undefined;
    public temporal: T | undefined;
    public entities: U[];

    constructor(
        public dialogService$: DialogService,
        public refDialog$: DynamicDialogRef,
        public service$?: ApiCrudService<T, U>,
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
        console.log(this.dialogConfig.data)
        this.refDialog$ = this.getRefDialog()
        this.refDialog$.onClose.subscribe((result: T | undefined) => {
            if (result) {
                if (dialogData.type_action === 'Create') {
                    if (this.service$) {
                        this.service$.store(dialogData.entity as T).subscribe({
                            next: (response) => {
                                this.reload()
                            },
                            error: (e) => console.log(e)
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

    protected abstract getRefDialog(): DynamicDialogRef;

    protected abstract restore(): void



}
