import { Component } from '@angular/core';
import {GamecontrolService} from "../../services/gamecontrol.service";
import {board} from "../../../controler";
import {Boardtemplate} from "../../../models/boardtemplate";
import {writeGameData} from "../../../firebase";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {


  constructor(public gamecontrolService: GamecontrolService) {
  }

  protected readonly board = board;

  changeValue(grid: Boardtemplate) {
    console.log(grid);
    board.mutate(value => (value[grid.id].value = 1))
    writeGameData(board());
    console.log(board());
  }
}
