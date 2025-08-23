import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalLoaderComponent } from '../components/molecules/modals/modal-loader/modal-loader.component';

@Injectable({
	providedIn: 'root',
})
export class LoaderService {

	private dialog = inject(MatDialog);
	private dialogRef: MatDialogRef<ModalLoaderComponent> | null = null;

	show(): void {
		if (!this.dialogRef) {
			this.dialogRef = this.dialog.open(ModalLoaderComponent, {
				disableClose: true,
				width: '250px',
				panelClass: 'loader-dialog'
			});
		}
	}

	hide(): void {
		if (this.dialogRef) {
			this.dialogRef.close();
			this.dialogRef = null;
		}
	}

}
