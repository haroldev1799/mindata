import { Component, inject, OnInit } from '@angular/core';
import { ModalErrorComponent } from '@app/shared/components/molecules/modals/modal-error/modal-error.component';
import { ModalErrorService } from '@app/shared/services/modal-error.service';

@Component({
  selector: 'app-heroes-list',
  imports: [],
  templateUrl: './heroes-list.component.html',
  styleUrl: './heroes-list.component.sass'
})
export class HeroesListComponent implements OnInit {

  	private modalMessageService = inject(ModalErrorService);

  ngOnInit(): void {
    this.modalMessageService.setModalMessage(
      { 
        status: true,
        data: {
          title: ' gaa'
        }
      },
      ModalErrorComponent
    );
  }

}
