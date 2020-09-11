import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {select, Store} from "@ngrx/store";
import {CardState} from "../modules/card/store/card/card.reducer";
import {CardDeleteAction} from "../modules/card/store/card/card.actions";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Observable} from "rxjs";
import {Card} from "../modules/card/model/card";
import {cardListSelector} from "../modules/card/store/card/card.selectors";

@Component({
  selector: 'app-card-info',
  templateUrl: './card-info.component.html',
  styleUrls: ['./card-info.component.scss']
})
export class CardInfoComponent implements OnInit {

  idx: number;
  id: string;
  cardList$: Observable<Card[]> = this.store$.pipe(select(cardListSelector));

  constructor(
    private store$: Store<CardState>,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe((p) => {
        this.idx = p.idx;
        this.id = p.id;
      })
  }

  onEdit(): void {
    this.router.navigate(['/edit'], { queryParams: {idx: this.idx}});
  }

  openDialog(): void {
    this.dialog.open(DeleteDialog, {
      data: {
        id: this.id
      }
    });
  }

  onBack() {
    this.router.navigate(['/']);
  }
}



export interface DeleteDialogData {
  id: string
}

@Component({
  selector: 'delete-dialog',
  template: `
      <h2 mat-dialog-title>Do you want to delete card?</h2>
        <div mat-dialog-actions class="button-row">
          <button mat-raised-button color="warn" (click)="onDelete()">Yes</button>
          <button mat-raised-button (click)="onClose()">No</button>
        </div>
  `,
  styles: [`
    h2 {
      text-align: center;
    }
    .button-row {
      justify-content: center;
    }
  `]
})

export class DeleteDialog {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DeleteDialogData,
              public dialogRef: MatDialogRef<DeleteDialog>,
              private store$: Store<CardState>,
              private router: Router) {
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onDelete(): void {
    console.log(this.data.id)
    this.store$.dispatch(new CardDeleteAction({_id: this.data.id}));
    this.router.navigate(['/']);
    this.onClose();
  }

}

