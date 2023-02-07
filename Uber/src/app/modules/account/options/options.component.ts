import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AllReports, Report } from 'src/app/domains';
import { UserService } from 'src/app/modules/list-of-users/user.service';
import { ReportService } from '../service/report.service';

@Component({
  selector: 'account',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})

export class OptionsComponent implements OnInit {
  name: string = "";
  surname: string = "";
  passenger: boolean = true;

  updateData: boolean = true;
  favoriteLocations: boolean = false;
  reports: boolean = false;

  url: string | ArrayBuffer | null | undefined;

  image: string = '';

  reports1: Report[] = [];
  reports2: Report[] = [];
  reports3: Report[] = [];

  constructor(private userService: UserService, private _snackBar: MatSnackBar, private reportService: ReportService) {}

  ngOnInit(): void {
    if(this.userService.currentUser != undefined) {
      this.reportService.getCrossedKmsReport(this.userService.currentUser?.id).subscribe((res: AllReports) => {
          this.reports1 = res.results;
      })

      this.reportService.getNumOfRidesReport(this.userService.currentUser?.id).subscribe((res: AllReports) => {
        this.reports2 = res.results;
      })

      this.reportService.getSumOfMoneyReport(this.userService.currentUser?.id).subscribe((res: AllReports) => {
        this.reports3 = res.results;
      })
    }

    if(this.userService.currentUser != undefined) {
      this.image = this.userService.currentUser.profilePicture;

      if(this.userService.currentUser.roles.find(x => x.authority === "ROLE_DRIVER")) 
				this.passenger = false;

      this.userService.getImage(this.userService.currentUser?.id).subscribe( {
        next: (res) => {
          console.log(res['byte']);
          this.url = "data:image/png;base64,"+res['byte'];
        },
        error: (e) => {
          console.log(e);
          this.url = "https://www.w3schools.com/howto/img_avatar.png"
        },
      })
    }
  }

  onSelectFile(event : any) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      const file = event.target.files[0];

      if(file['size'] < 1048576) {
        if(this.userService.currentUser != undefined) {
          this.userService.addImage(this.userService.currentUser?.id, file).subscribe();
        }
        reader.onload = (event) => { // called once readAsDataURL is completed
          this.url = event.target?.result;
          console.log(this.url);
        }
      }
      else 
        this.openSnackBar("Image file is too big!");
    }
  }

  delete() {
    if(this.userService.currentUser != undefined)
      this.userService.deleteImage(this.userService.currentUser?.id).subscribe();
    this.url = null;
  }
  
  userName() : string {
    if(this.userService.currentUser != null) {
      const user = this.userService.currentUser;
      return user.name + "  " + user.surname;
    } return "";
  }

  loadUpdateData() {
    this.updateData = true;
    this.favoriteLocations = false;
    this.reports = false;
  }

  loadFavoriteLocations() {
    this.updateData = false;
    this.favoriteLocations = true;
    this.reports = false;
  }

  loadReports() {
    this.updateData = false;
    this.favoriteLocations = false;
    this.reports = true;
  }

  openSnackBar(snackMsg : string) : void {
    this._snackBar.open(snackMsg, "Dismiss", {
      duration: 2000
    });
  }

  getCrossedKmsReport() {
    
  }
}