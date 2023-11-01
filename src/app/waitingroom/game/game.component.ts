import { Component } from '@angular/core';
import {GamecontrolService} from "../../services/gamecontrol.service";
import {board} from "../../../controler";
import {Boardtemplate} from "../../../models/boardtemplate";
import {
  gameIsReady,
  userCredentials,
  userName1,
  userName2,
  whoseTurn,
  writeGameData,
  writeGameTurnData
} from "../../../firebase";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {


  constructor(private gamecontrolService: GamecontrolService) {
  }

  protected readonly board = board;

  changeValue(grid: Boardtemplate) {
    if (whoseTurn() === userCredentials()) {
      if (grid.value != 0) {
        return;
      }

      if (whoseTurn() === userName1()) {
        whoseTurn.set(userName2());
        writeGameTurnData(userName2(), gameIsReady());
        board.mutate(value => (value[grid.id].value = 1))
        writeGameData(board());
      } else {
        whoseTurn.set(userName1());
        writeGameTurnData(userName1(), gameIsReady());
        board.mutate(value => (value[grid.id].value = 2))
        writeGameData(board());
      }

      this.winnerCheck(1)
      this.winnerCheck(2)

    }
    else {
      if (whoseTurn() === userCredentials()) {
        if (grid.value != 0) {
          return;
        }

        if (whoseTurn() === userName1()) {
        whoseTurn.set(userName2());
        writeGameTurnData(userName2(), gameIsReady());
          board.mutate(value => (value[grid.id].value = 2))
          writeGameData(board());
        } else {
        whoseTurn.set(userName1());
        writeGameTurnData(userName1(), gameIsReady());
          board.mutate(value => (value[grid.id].value = 2))
          writeGameData(board());
        }
        this.winnerCheck(2)

      }
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
        board.set(this.gamecontrolService.boardCreator);
        writeGameData(board());
      }

  }


  protected readonly whoseTurn = whoseTurn;
}
