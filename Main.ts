import inquirer from "inquirer";
import { faker } from '@faker-js/faker';

interface User {
  id: number;
  pin: number;
  name: string;
  accountNumber: number;
  balance: number;
}

const createUser = (): User[] => {
  let users: User[] = [];

  for (let i = 0; i < 5; i++) {
    let user: User = {
      id: i,
      pin: 1000 + i,
      name: faker.internet.userName(),
      accountNumber: Math.floor(10000000 * Math.random() * 90000000),
      balance: 10000000 * i,
    };
    users.push(user);
  }

  return users;
};

const atmMachine = async (users: User[]) => {
  let attempts = 3; 

  while (attempts > 0) {
    const resp = await inquirer.prompt({
      type: "number",
      message: "Write PIN Code",
      name: "pin",
    });

    const matchingUser = users.find((user) => user.pin === resp.pin);

    if (matchingUser) {
      console.log("Welcome", matchingUser.name);

   
      while (true) {
        const transaction = await inquirer.prompt({
          type: "list",
          message: "Select Transaction",
          name: "transaction",
          choices: ["Withdraw Cash", "Check Balance", "Exit"],
        });

        switch (transaction.transaction) {
          case "Withdraw Cash":
            
            console.log("Withdraw functionality in progress...");
            break;
          case "Check Balance":
            console.log("Your balance is:", matchingUser.balance);
            break;
          case "Exit":
            console.log("Thank you for using our ATM. Have a nice day!");
            return; 
          default:
            console.log("Invalid option. Please try again.");
        }
      }
    } else {
      attempts--;
      console.log("Incorrect PIN. You have", attempts, "attempts remaining.");
    }
  }

  if (attempts === 0) {
    console.log("Maximum attempts reached. ATM session terminated.");
  }
};

const users = createUser();
console.log(users);
atmMachine(users);
