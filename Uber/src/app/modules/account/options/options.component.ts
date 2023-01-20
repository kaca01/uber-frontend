import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/modules/list-of-users/user.service';

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

  url: string | ArrayBuffer | null | undefined;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    if(this.userService.currentUser != undefined) {
      if(this.userService.currentUser.roles.find(x => x.authority === "ROLE_DRIVER")) 
				this.passenger = false;

      this.name = this.userService.currentUser.name;
      this.surname = this.userService.currentUser.surname;
    }
  }

  onSelectFile(event : any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target?.result;
      }
    }
  }
  
  public delete(){
    this.url = null;
  }
  
  userName() {
    if(this.userService.currentUser != null) {
      const user = this.userService.currentUser;
      return user.name + "  " + user.surname;
    } return "";
  }

  loadUpdateData() {
    this.updateData = true;
    this.favoriteLocations = false;
  }

  loadFavoriteLocations() {
    this.updateData = false;
    this.favoriteLocations = true;
  }
}