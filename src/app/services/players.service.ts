import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {IPlayersResponse} from "../models/players-response";
import {IUpdatePlayersResponse} from "../models/update-players-response";

@Injectable()

export class PlayersService {
  SERVER: string = 'http://localhost:3000';
  private res: IPlayersResponse;

  constructor(private httpClient: HttpClient) { }

  postid;

  updatePlayers(players: any[]): Observable<IUpdatePlayersResponse>{
    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    return this.httpClient.post<IUpdatePlayersResponse>(`${this.SERVER}/updatePlayers`, { accessToken : accessToken, dodgePlayers: players}).pipe(tap(
      (res:IUpdatePlayersResponse) => {
        if(res) {
        }
      }
    ));
  }

  getPlayers(): Observable<IPlayersResponse>{
    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    return this.httpClient.post<IPlayersResponse>(`${this.SERVER}/getPlayers`,{ accessToken : accessToken }).pipe(tap(
      (res:IPlayersResponse) => {
        if(res){
        }
      }
    ));
  }
}
