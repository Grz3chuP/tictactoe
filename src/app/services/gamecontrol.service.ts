import {Injectable, signal} from '@angular/core';
import {board} from "../../controler";
import {Boardtemplate} from "../../models/boardtemplate";
import {writeGameData} from "../../firebase";

@Injectable({
  providedIn: 'root'
})
export class GamecontrolService {

boardCreator: Boardtemplate[]=[];
  constructor() {
    this.boardCreator = Array(9).fill({}, 0, 9)
    this.boardCreator.forEach((value, index) => {
      this.boardCreator[index] = {id: index, value: 0};
    });
    board.set(this.boardCreator);
    writeGameData(board());
  }
}
