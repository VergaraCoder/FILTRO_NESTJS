import { Injectable } from '@nestjs/common';
import { CreateTournamentLogicDto } from './dto/create-tournament-logic.dto';
import { UpdateTournamentLogicDto } from './dto/update-tournament-logic.dto';
import { TournamentsPlayersService } from 'src/tournaments-players/tournaments-players.service';

@Injectable()
export class TournamentLogicService {
  constructor(private TournamentPlayer: TournamentsPlayersService) {}

  async createClashes(tournamentId: number) {
    const dataComplete =
      await this.TournamentPlayer.returnPlayersOfTournament(tournamentId);
    let object = [];
    let numbers = [];
    let count = 0;
    /*
    for(const man of dataComplete){
      let index1=Math.floor(Math.random()*dataComplete.length);
      let index2=Math.floor(Math.random()*dataComplete.length);

      numbers.push(index1);
      console.log(numbers);
      
      
      if(numbers.includes(index1) || numbers.includes(index2)){
        while(numbers.includes(index2) && numbers.includes(index2)){
          console.log(index2);
          index1=Math.floor(Math.random()*dataComplete.length);
          
          index2=Math.floor(Math.random()*dataComplete.length);  
        }
      }
      numbers.push(index2);
      const register1=dataComplete[index1];
      const register2=dataComplete[index2];

        count++;
        let man1=`man${count+1}`;
        let man2=`man${count+2}`;
      
        
         object.push({
           [man1]:register1.player,
          [man2]:register2.player
         });
    }
    
 */
    // while(dataComplete.length!==1 ){
    //   const numberRamdom1=Math.floor(Math.random()*dataComplete.length);
    //   const number2= numberRamdom1>dataComplete.length ? numberRamdom1-1 : numberRamdom1;
    //   const elegido1=dataComplete[number2];
    //   dataComplete.splice(numberRamdom1,1);

    //   const numberRamdom2=Math.floor(Math.random()*dataComplete.length);
    //   const number1= numberRamdom1>dataComplete.length ? numberRamdom2-1 : numberRamdom2;
    //   console.log("the number is");

    //   console.log(number1);

    //   const elegido2=dataComplete[number1];
    //   elegido2.player ==undefined ? dataComplete
    //   dataComplete.splice(numberRamdom2,1);

    //   count++;
    //   let man1=`man${count}`;
    //   let man2=`man${count+1}`;

    //   console.log(elegido1);

    //   object.push({
    //     [man1]:elegido1.player,
    //     [man2]:elegido2.player
    //   });
    // }
    return object;
  }

  findAll() {
    return `This action returns all tournamentLogic`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tournamentLogic`;
  }

  update(id: number, updateTournamentLogicDto: UpdateTournamentLogicDto) {
    return `This action updates a #${id} tournamentLogic`;
  }

  remove(id: number) {
    return `This action removes a #${id} tournamentLogic`;
  }
}
