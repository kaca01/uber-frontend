import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Ride } from 'src/app/domains';
import { UserService } from '../../list-of-users/user.service';
import { MapService } from '../../map/map.service';
import { PanicDialogComponent } from '../dialogs/panic-dialog/panic-dialog.component';
import { RideService } from '../service/ride.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
	@Input() pickup = '';
	@Input() destination = '';
	user!: string;
	hasRide = true;

	constructor(private userService: UserService, private rideService: RideService, private mapService: MapService,
				private dialog: MatDialog){}

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

	checkForActiveRide(){
		const button = document.getElementsByClassName("panic");
		this.mapService.getDriversActiveRide(this.userService.currentUser!.id).subscribe((res: Ride) => {
		  if (res != null) {
			this.hasRide = true;
			}
		  }
		);
	  }
}
