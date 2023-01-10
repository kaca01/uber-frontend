import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../list-of-users/user.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
	@Input() pickup = '';
	@Input() destination = '';
	user!: string;

	constructor(private userService: UserService){}

	ngOnInit() : void {
		const Menu = document.getElementById("menu-container");
		const Close = document.getElementById("close-dialog");

		if (Menu != null) {
			Menu.style.display = 'none';
	  
			Menu.addEventListener('click', function open(event){
			  const Form = document.getElementById("form");
			  if (Form != null) Form.style.display = 'block';
			  Menu.style.display = 'none';
			});
		  }

		if (Close != null) {
			Close.addEventListener('click', function close(event){
			  const Form = document.getElementById("form");
			  if (Form != null) {
				Form.style.display = 'none';
				if (Menu != null) Menu.style.display = 'block';
				
			  }
			});
		}
		this.whoIsUser();
	}

	getPickup(pickup: string) {
		this.pickup = pickup;
		
	}

	getDestination(destination: string) {
		this.destination = destination;
	}

	isLoggedIn(): boolean {
		if(this.userService.currentUser?.name != undefined) 
			return true;
		return false;
	}

	whoIsUser(): string {
		if(this.userService.currentUser?.roles != undefined) {
			if(this.userService.currentUser?.roles.find(x => x.authority === "ROLE_PASSENGER")) 
				return this.user = "passenger";
			else if(this.userService.currentUser?.roles.find(x => x.authority === "ROLE_DRIVER")) 
				return this.user = "driver";
			else if(this.userService.currentUser?.roles.find(x => x.authority === "ROLE_ADMIN")) 
			return this.user = "admin";
		}
		return this.user = "none";
	}
}
