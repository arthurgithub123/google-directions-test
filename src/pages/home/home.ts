import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) { }

  ionViewDidLoad(){

    this.initMap();
  }

  @ViewChild('map') mapElement: ElementRef;

  start: string;
  end: string;
  selectedMode: string;
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();

  initMap() {

    let chicago = new google.maps.LatLng(41.850033, -87.6500523);
    let mapOptions = {
      zoom:7,
      center: chicago
    }
    let map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    this.directionsDisplay.setMap(map);
  }

  calcRoute() {

    this.directionsService.route({

      origin: this.start,
      destination: this.end,
      travelMode: google.maps.TravelMode[this.selectedMode]
    }, (response, status) => {

      if (status === 'OK') {

        this.directionsDisplay.setDirections(response);
        console.log(response);

      } else {

        alert('Directions request failed due to ' + status);
      }
    });
  }

}
