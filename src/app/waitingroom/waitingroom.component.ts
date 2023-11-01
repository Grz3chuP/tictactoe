import {Component} from '@angular/core';
import {
  gameIsReady,
  user1isTaken,
  user2isTaken,
  userCredentials,
  userIsLogged,
  userName1,
  userName2, whoseTurn, writeGameTurnData,
  writeTableData
} from "../../firebase";
import {GamecontrolService} from "../services/gamecontrol.service";

@Component({
  selector: 'app-waitingroom',
  templateUrl: './waitingroom.component.html',
  styleUrls: ['./waitingroom.component.css']
})
export class WaitingroomComponent {

  // userName1 = 'Waiting for player';
  // userName2 = 'Waiting for player';
  // user1isTaken = false;
  // user2isTaken = false;

  constructor(){

  }



  seatDown() {
    if (userIsLogged()) {
      console.log('Seat down');
      if (!user1isTaken()) {
        if (userName2() !== userCredentials()) {
          userName1.set(userCredentials());
          user1isTaken.set(true) ;
          writeTableData([userName1(),userName2()], [user1isTaken(),user2isTaken()])
        } else {
          alert('You can not play with yourself')
        }
      } else {
        alert('This seat is taken')
      }
    } else {
      alert('You must be logged in to play')
    }
  }

  seatDown2() {
    if (userIsLogged()) {
      console.log('Seat down');
      if (!user2isTaken()) {
        if (userName1() !== userCredentials()) {
          userName2.set(userCredentials());
          user2isTaken.set(true);
          writeTableData([userName1(),userName2()], [user1isTaken(),user2isTaken()])
        } else {
          alert('You can not play with yourself')
        }
      } else {
        alert('This seat is taken')
      }
    } else {
      alert('You must be logged in to play')
    }
  }

  protected readonly userName1 = userName1;
  protected readonly userName2 = userName2;
  protected readonly writeTableData = writeTableData;
  protected readonly gameIsReady = gameIsReady;

  startGame() {
    if (user1isTaken() && user2isTaken()) {
      gameIsReady.set(true);
      whoseTurn.set(userName1());
      writeGameTurnData(whoseTurn() , gameIsReady());
    }

  }
}
