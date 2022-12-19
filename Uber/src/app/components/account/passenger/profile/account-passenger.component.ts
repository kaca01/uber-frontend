import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'account-passenger',
  templateUrl: './account-passenger.component.html',
  styleUrls: ['./account-passenger.component.css']
})

export class AccountPassengerComponent implements OnInit{
  ngOnInit(): void {
    let data = document.getElementById("user-data");
    let favorite = document.getElementById("favorite-locations");

    if(data != null && favorite != null) {
      data.style.display = 'block';
      favorite.style.display = 'none';
    }

    const profileBtn = document.getElementById("profile");
    const favoriteBtn = document.getElementById("favorite");

    if(profileBtn != null && favoriteBtn != null) {
      profileBtn.style.setProperty("color", "black", "important");
      favoriteBtn.style.setProperty("color", "#9f9f9f", "important");
    }

    this.changeToProfile(data as HTMLElement, favorite as HTMLElement, 
      profileBtn as HTMLElement, favoriteBtn as HTMLElement);
    this.changeToLocation(data as HTMLElement, favorite as HTMLElement,
       favoriteBtn as HTMLElement, profileBtn as HTMLElement);
  }

  url: string | ArrayBuffer | null | undefined;
  
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

  changeToProfile(profile : HTMLElement, favorite : HTMLElement, 
    profileBtn : HTMLElement, favoriteBtn : HTMLElement) : void {
    profileBtn.addEventListener('click', function open(event) {
      profile.style.display = 'block';
      favorite.style.display = 'none';

      profileBtn.style.setProperty("color", "black", "important");
      favoriteBtn.style.setProperty("color", "#9f9f9f", "important");
    });
  }

  changeToLocation(profile : HTMLElement, favorite : HTMLElement, 
    favoriteBtn : HTMLElement, profileBtn : HTMLElement) : void {
    favoriteBtn.addEventListener('click', function open(event) {
      profile.style.display = 'none';
      favorite.style.display = 'block';

      profileBtn.style.setProperty("color", "#9f9f9f", "important");
      favoriteBtn.style.setProperty("color", "black", "important");
    });
  }
  
}