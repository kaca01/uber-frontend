import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FavoriteRide } from 'src/app/domains';
import { UserService } from '../../list-of-users/user.service';

@Component({
  selector: 'app-favorite-dialog',
  templateUrl: './favorite-dialog.component.html',
  styleUrls: ['./favorite-dialog.component.css']
})
export class FavoriteDialogComponent {

  favoriteRide: FavoriteRide = {} as FavoriteRide;
  departure: string | undefined = "";
  destination: string | undefined = "";

  deleted: boolean = false;

  constructor(private userService: UserService, private dialogRef: MatDialogRef<FavoriteDialogComponent>, 
    private snackbar: MatSnackBar, @Inject(MAT_DIALOG_DATA) data: FavoriteRide) {
      this.favoriteRide = data;
      this.departure = data.locations.at(0)?.departure.address;
      this.destination = data.locations.at(0)?.destination.address;
    }

    close() : void {
      this.dialogRef.close();
    }

    delete(): void {
      this.userService.removeFavorite(this.favoriteRide.id).subscribe();
      console.log("obrisanooooo")
      this.deleted = true;
      // dodaj snek bar da je obrisana
      this.close();
    }
}
