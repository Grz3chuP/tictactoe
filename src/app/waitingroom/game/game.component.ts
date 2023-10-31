import { Component } from '@angular/core';
import {GamecontrolService} from "../../services/gamecontrol.service";
import {board} from "../../../controler";
import {Boardtemplate} from "../../../models/boardtemplate";
import {whoseTurn, writeGameData} from "../../../firebase";

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
    if (!whoseTurn()) {
      if (grid.value != 0) {
        return;
      }
      board.mutate(value => (value[grid.id].value = 1))
      writeGameData(board());
      whoseTurn.set(true);
      this.winnerCheck(1)

    }
    else {
      if (grid.value != 0) {
        return;
      }
      board.mutate(value => (value[grid.id].value = 2))
      writeGameData(board());

      whoseTurn.set(false);
      this.winnerCheck(2)

    }

  }


  winnerCheck(player: number) {
     if(board()[0].value === player && board()[1].value === player && board()[2].value === player) {
        alert('Player ' + player + ' wins!');
      }
       else if(board()[3].value === player && board()[4].value === player && board()[5].value === player) {
       alert('Player ' + player + ' wins!');
     }
        else if(board()[6].value === player && board()[7].value === player && board()[8].value === player) {
        alert('Player ' + player + ' wins!');
     }
        else if(board()[0].value === player && board()[3].value === player && board()[6].value === player) {
        alert('Player ' + player + ' wins!');
     }
        else if(board()[1].value === player && board()[4].value === player && board()[7].value === player) {
        alert('Player ' + player + ' wins!');

     }
        else if(board()[2].value === player && board()[5].value === player && board()[8].value === player) {
        alert('Player ' + player + ' wins!');
     }
        else if(board()[0].value === player && board()[4].value === player && board()[8].value === player) {
        alert('Player ' + player + ' wins!');
             }
        else if(board()[2].value === player && board()[4].value === player && board()[6].value === player) {
        alert('Player ' + player + ' wins!');
     }
      else if (board().every(value => value.value !== 0)) {
        alert('Draw');
      }

  }



}
