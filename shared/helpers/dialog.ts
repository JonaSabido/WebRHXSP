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

    save(entity: any, callback?: any) {
        this.ref$.close(entity)
        if (callback) {
            callback()
        }
    }


    setDialogHeight(value: string) {
        this.config$.height = value
    }

}