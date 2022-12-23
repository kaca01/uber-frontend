import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-base-page',
  templateUrl: './base-page.component.html',
  styleUrls: ['./base-page.component.css']
})
export class BasePageComponent {
  constructor(private router : Router) {}

  ngOnInit() : void {
    const home = document.getElementById('home');
    const history = document.getElementById('history');
    const details = document.getElementById('details');
    const ratings = document.getElementById('ride-ratings');

    const navHome = document.getElementById('nav-home');
    const navHistory = document.getElementById('nav-history');

    if (history != null && home != null && details != null && ratings != null && navHistory != null && navHome != null) {
      history.style.display = 'none';
      details.style.display = 'none';
      ratings.style.display = 'none';

      navHome.addEventListener('click', function click(event){
        home.style.display = 'block';
        history.style.display = 'none';
        details.style.display = 'none';
        ratings.style.display = 'none';
      });

      navHistory.addEventListener('click', function click(event){
        home.style.display = 'none';
        history.style.display = 'block';
        details.style.display = 'none';
        ratings.style.display = 'none';
      });

      const histories = document.getElementsByClassName("list-item");
      const arr = Array.from(histories);
      
      arr.forEach (oneHistory =>{
        if (oneHistory != null) {
          oneHistory.addEventListener('click', function click(event){
            home.style.display = 'none';
            history.style.display = 'none';
            details.style.display = 'block';
            ratings.style.display = 'none';
          });
        }
      });

      const viewRatings = document.getElementById('ratings');
      if (viewRatings != null) {
        viewRatings.addEventListener('click', function click(event){
          home.style.display = 'none';
          history.style.display = 'none';
          details.style.display = 'none';
          ratings.style.display = 'block';
        });
      }
      
      const backToHistory = document.getElementById('back-to-history');
      if (backToHistory != null) {
        backToHistory.addEventListener('click', function click(event){
          home.style.display = 'none';
          history.style.display = 'block';
          details.style.display = 'none';
          ratings.style.display = 'none';
        });
      }

      const backToDetails = document.getElementById('back-to-details');
      if (backToDetails != null) {
        backToDetails.addEventListener('click', function click(event){
          home.style.display = 'none';
          history.style.display = 'none';
          details.style.display = 'block';
          ratings.style.display = 'none';
        });
      }
    }

  }

}
