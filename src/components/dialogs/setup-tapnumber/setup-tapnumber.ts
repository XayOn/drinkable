import { DialogController } from 'aurelia-dialog';
import { autoinject, observable } from 'aurelia-framework';

@autoinject
export class SetupTapnumber {
    @observable public selectedTap: number = 0;
    static inject = [DialogController];
    public controller: DialogController;

    constructor(dialogController: DialogController) {
        this.controller = dialogController;
    }

    public colors = [
        { name: 'red', value: 1 },
        { name: 'yellow', value: 2 },
        { name: 'green', value: 3 },
        { name: 'black', value: 4 },
        { name: 'blue', value: 5 },
        { name: 'white', value: 6 }
    ];

    selectTap(tap: number) {
        this.selectedTap = tap;
        this.controller.ok(this.selectedTap);
    }

    cancel() {
        this.controller.cancel();
    }
}
