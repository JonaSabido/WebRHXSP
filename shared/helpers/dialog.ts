import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

export abstract class DialogCrud {
    constructor(
        public ref$: DynamicDialogRef,
        public config$: DynamicDialogConfig
    ) {

    }

    closeDialog() {
        this.ref$.close()
    }
    
    save(entity: any){
        this.ref$.close(entity)
    }

}