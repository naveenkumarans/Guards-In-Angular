import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tour } from '../models/tour';
import { TourRequest } from '../models/tour-request';
import { RouteService } from '../services/route.service';
import { TourRequestService } from '../services/tour-request.service';
import { TourService } from '../services/tour.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tour-cart',
  templateUrl: './tour-cart.component.html',
  styleUrls: ['./tour-cart.component.css']
})
export class TourCartComponent implements OnInit {

  tour?: Tour;
  stars: Array<number> = [];
  tourRequest: TourRequest = {};


  constructor(private activatedRoute: ActivatedRoute,
    private tourService: TourService,
    private tourRequestService: TourRequestService,
    private routeService: RouteService,
    private snackBar: MatSnackBar) { }


    ngOnInit(): void {
      this.activatedRoute.paramMap.subscribe(param => {
          let id = param.get("id") ?? "";
          this.tourService.getTour(id).subscribe(data => {
              this.tour = data;
              this.stars = new Array(this.tour.rating);
              this.submitStatus = false;
          })
      })
  }

  makeRequest() {
    if (this.tourRequest.customerName && this.tourRequest.customerEmail && this.tourRequest.customerPhone && this.tourRequest.dateOfTravel) {
    this.tourRequestService.saveTourRequest(this.tourRequest).subscribe(data => {
        this.snackBar.open("Request Submitted", "", {
        duration: 3000
        });
        this.submitStatus = true;
        this.routeService.navigateToHomeView();
    })
    }
}

  submitStatus:boolean=false;

  canDeactivate() {
    if (!this.submitStatus)
        this.submitStatus = confirm("You have not made a request to this tour, Are you sure you want to leave?");
    return this.submitStatus;
}

}
