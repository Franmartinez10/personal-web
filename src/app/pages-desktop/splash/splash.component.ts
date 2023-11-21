import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
})
export class SplashComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  unicornTurn: boolean = true;
  gameIsOver: boolean = false;
  winningMessageText: string = '';

  board: string[] = Array(9).fill('');

  winningCombinations: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  handleCellClick(index: number): void {
    if (!this.gameIsOver && !this.board[index]) {
      this.board[index] = this.unicornTurn ? 'unicorn' : 'dragon';

      if (this.checkWin()) {
        this.endGame(false);
      } else if (this.isDraw()) {
        this.endGame(true);
      } else {
        this.swapTurns();
      }
    }
  }

  swapTurns(): void {
    this.unicornTurn = !this.unicornTurn;
  }

  checkWin(): boolean {
    return this.winningCombinations.some(combination =>
      combination.every(i => this.board[i] === (this.unicornTurn ? 'unicorn' : 'dragon'))
    );
  }

  isDraw(): boolean {
    return this.board.every(cell => cell !== '');
  }

  endGame(draw: boolean): void {
    this.gameIsOver = true;

    if (draw) {
      this.winningMessageText = `Draw!`;
    } else {
      this.winningMessageText = `${this.unicornTurn ? 'Unicorn' : 'Dragon'} wins!!!`;
    }
  }

  resetGame(): void {
    this.unicornTurn = true;
    this.gameIsOver = false;
    this.winningMessageText = '';
    this.board = Array(9).fill('');
  }

  beastTurn(): string {
    return this.unicornTurn ? 'Unicorn' : 'Dragon';
  }
}
