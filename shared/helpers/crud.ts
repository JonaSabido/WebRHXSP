import { DialogService, DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { View } from "./view";

export abstract class Crud extends View {
    abstract dialogConfig: DynamicDialogConfig;

    constructor(
        public dialogService$: DialogService,
        public refDialog$: DynamicDialogRef,
    ) {
        super();
    }

    public openDialog(
        type: 'Create' | 'Edit',
        entity?: any
    ) {
        if(type === 'Edit'){
            this.dialogConfig.header = ''
        }
        this.dialogConfig.data = { ...entity }
        this.refDialog$ = this.getRefDialog()
    }

    protected abstract getRefDialog(): DynamicDialogRef;
}
