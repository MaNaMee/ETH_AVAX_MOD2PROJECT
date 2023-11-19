# ETH_AVAX_MOD2PROJECT

This project is a simple fronend interface of a smart contract with metamask integration, atleast two functions, and its values should reflect on the created frontend interface

# Description

This program is written in solidity and in react js. The included smart contract has three functions, namely, withraw, depost, and transfer. These functions are necessary for the frontend elements, written in react.js to work. I then modified the the frontend template given by MetaCrafters and added more functionalities on top of the ones already given. The first of these are the functionality where the user can withdraw or deposit a number of eth that they want. The second of these is that ability to transfer the deposited eth to a given address. The final functionality added is a transaction history where the user can see the transactions they did in that specific session. 


### Executing program

In order to run this program, it is recommended to clone the whole repository and perform the necessary set up in order to avoid errors. After cloning the github, you will want to do the following to get the code running on your computer.

    1. Inside the project directory, in the terminal type: npm i
    2. Open two additional terminals in your VS code
    3. In the second terminal type: npx hardhat node
    4. In the third terminal, type: npx hardhat run --network localhost scripts/deploy.js
    5. Back in the first terminal, type npm run dev to launch the front-end.

After this, the project will be running on your localhost. Typically at http://localhost:3000/

## Authors

Joshua G. Azarcon / MaNaMee
202010074@fit.edu.ph


## License

This project is licensed under the MIT License - see the LICENSE.md file for details