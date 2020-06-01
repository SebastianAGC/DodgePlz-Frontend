import {Component, OnDestroy, OnInit} from '@angular/core';
import { PlayersService} from "../services/players.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {IUpdatePlayersResponse} from "../models/update-players-response";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  players = [];
  newPlayer = "";
  dodgeMessage = "";
  subscription : Subscription;
  constructor(private playersService: PlayersService, private router: Router) { }

  ngOnInit(): void {
    this.dodgeMessage = "";
    this.subscription = this.playersService.getPlayers().subscribe(res => {
      this.players = res.getPlayerResponse.dodgePlayers
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  checkDodge(form){
    var dodge = false;

    //check if user input is single username or chat text SPANISH ONLY
    if(form.value.player.includes(" se unió a la sala")){
      var inputPlayers = form.value.player.split(" se unió a la sala ")
      if(inputPlayers[0].charAt(0) == ' '){
        inputPlayers[0] = inputPlayers[0].substr(1);
      }
      inputPlayers[4] = inputPlayers[4].replace(" se unió a la sala", '')

      inputPlayers.forEach(value => {
        if(this.players.includes(value)){
          dodge = true;
        }
      });
    }else{
      if(this.players.includes(form.value.player)){
        dodge = true;
      }
    }

    let element = document.getElementById('dodgeMessageDiv')
    if(dodge){
      element.className = "dodgeMessageTrue";
      element.innerText = "DEFINITELY DODGE"
    }else{
      element.className = "dodgeMessageFalse";
      element.innerText = "NAH, IT'S OKAY :)"
    }
  }

  updatePlayer(form){
    //check if user input is single username or chat text SPANISH ONLY
    if(form.value.player.includes(" se unió a la sala")){
      var inputPlayers = form.value.player.split(" se unió a la sala ")
      if(inputPlayers[0].charAt(0) == ' '){
        inputPlayers[0] = inputPlayers[0].substr(1);
      }
      inputPlayers[4] = inputPlayers[4].replace(" se unió a la sala", '')

      inputPlayers.forEach(value => {
        if(!this.players.includes(value)){
          this.players.push(value);
          this.playersService.updatePlayers(this.players).subscribe(res => {
          });
        }
      });

    }else{
      if(!this.players.includes(form.value.player)){
        this.players.push(form.value.player);
        this.playersService.updatePlayers(this.players).subscribe(res => {
          alert("Player/s added successfully");
        });
      }else{
        alert("Player already added")
      }
    }
  }

  deletePlayer(player: string){
    if(this.players.includes(player)){
      const playerIndex = this.players.indexOf(player);
      this.players.splice(playerIndex,1);
      this.playersService.updatePlayers(this.players).subscribe(res => {
      });
    }else{
      alert("Can't delete that player")
    }
  }
}
